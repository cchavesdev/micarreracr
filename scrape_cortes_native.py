import urllib.request
import urllib.parse
import json
import time
import re
from html.parser import HTMLParser

BASE_URL = "https://consultasori.ucr.ac.cr/frmCortesHistoricosUniversitario.aspx"

SEDES = [
    {"codigo": "11", "nombre": "Ciudad Universitaria Rodrigo Facio"},
    {"codigo": "21", "nombre": "Recinto de San Ramón"},
    {"codigo": "22", "nombre": "Recinto de Grecia"},
    {"codigo": "31", "nombre": "Recinto de Turrialba"},
    {"codigo": "32", "nombre": "Recinto de Paraíso"},
    {"codigo": "33", "nombre": "Recinto de Guápiles"},
    {"codigo": "41", "nombre": "Recinto de Liberia"},
    {"codigo": "51", "nombre": "Recinto de Limón"},
    {"codigo": "52", "nombre": "Recinto de Siquirres"},
    {"codigo": "61", "nombre": "Recinto de Puntarenas"},
    {"codigo": "71", "nombre": "Recinto de Golfito"},
    {"codigo": "81", "nombre": "Recinto de Alajuela"}
]

YEARS = ["2021", "2022", "2023", "2024", "2025"]

class ViewStateParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.viewstate = ""
        self.viewstategenerator = ""
        self.eventvalidation = ""

    def handle_starttag(self, tag, attrs):
        if tag == "input":
            attrs_dict = dict(attrs)
            id_attr = attrs_dict.get("id", "")
            if id_attr == "__VIEWSTATE":
                self.viewstate = attrs_dict.get("value", "")
            elif id_attr == "__VIEWSTATEGENERATOR":
                self.viewstategenerator = attrs_dict.get("value", "")
            elif id_attr == "__EVENTVALIDATION":
                self.eventvalidation = attrs_dict.get("value", "")

class TableParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_table = False
        self.in_row = False
        self.in_cell = False
        self.current_row = []
        self.rows = []
        self.is_header = True

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "table":
            if "gdvCortes" in attrs_dict.get("id", ""):
                self.in_table = True
        elif tag == "tr" and self.in_table:
            self.in_row = True
            self.current_row = []
        elif tag == "td" and self.in_row:
            self.in_cell = True

    def handle_endtag(self, tag):
        if tag == "table" and self.in_table:
            self.in_table = False
        elif tag == "tr" and self.in_row:
            self.in_row = False
            if not self.is_header:
                self.rows.append(self.current_row)
            self.is_header = False # First row is header
        elif tag == "td" and self.in_cell:
            self.in_cell = False

    def handle_data(self, data):
        if self.in_cell:
            self.current_row.append(data.strip())

def get_initial_state():
    with urllib.request.urlopen(BASE_URL) as response:
        html = response.read().decode('utf-8')
    parser = ViewStateParser()
    parser.feed(html)
    return parser.viewstate, parser.viewstategenerator, parser.eventvalidation

def scrape_data():
    try:
        viewstate, viewstategenerator, eventvalidation = get_initial_state()
    except Exception as e:
        print(f"Error getting initial state: {e}")
        return []

    all_data = {}
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor())
    urllib.request.install_opener(opener)

    # Initial GET to set cookies
    opener.open(BASE_URL)

    for sede in SEDES:
        sede_code = sede['codigo']
        sede_name = sede['nombre']
        print(f"Scraping Sede: {sede_name} ({sede_code})")

        for year in YEARS:
            print(f"  Year: {year}")
            
            data = urllib.parse.urlencode({
                '__EVENTTARGET': '',
                '__EVENTARGUMENT': '',
                '__VIEWSTATE': viewstate,
                '__VIEWSTATEGENERATOR': viewstategenerator,
                '__EVENTVALIDATION': eventvalidation,
                'cboRecinto': sede_code,
                'cboAnio': year,
                'btnConsultar': 'Consultar'
            }).encode('utf-8')

            req = urllib.request.Request(BASE_URL, data=data, headers={'User-Agent': 'Mozilla/5.0'})
            
            try:
                with opener.open(req) as response:
                    html = response.read().decode('utf-8')
                
                # Parse ViewState for next request
                vs_parser = ViewStateParser()
                vs_parser.feed(html)
                if vs_parser.viewstate:
                    viewstate = vs_parser.viewstate
                    viewstategenerator = vs_parser.viewstategenerator
                    eventvalidation = vs_parser.eventvalidation

                # Parse Table
                table_parser = TableParser()
                table_parser.feed(html)
                
                if not table_parser.rows:
                    print(f"    No data found for {sede_name} - {year}")
                    continue

                for row in table_parser.rows:
                    if len(row) < 3:
                        continue
                    
                    # Handle cases where data might be split across tags
                    # Standard row: [Code, Name, Score, ...]
                    # Sometimes empty strings appear due to whitespace
                    clean_row = [x for x in row if x]
                    if len(clean_row) < 3:
                        continue

                    carrera_code = clean_row[0]
                    carrera_name = clean_row[1]
                    corte_str = clean_row[2].replace(',', '.')
                    
                    try:
                        corte = float(corte_str)
                    except ValueError:
                        corte = 0.0

                    key = f"{sede_code}-{carrera_code}"
                    
                    if key not in all_data:
                        all_data[key] = {
                            "codigo": carrera_code,
                            "nombre": carrera_name,
                            "sede": sede_name,
                            "codigoSede": sede_code,
                            "historial": []
                        }
                    
                    if not any(h['anio'] == int(year) for h in all_data[key]['historial']):
                        all_data[key]['historial'].append({
                            "anio": int(year),
                            "corte": corte
                        })

            except Exception as e:
                print(f"    Error scraping {sede_name} - {year}: {e}")
                # Try to reset state
                try:
                    viewstate, viewstategenerator, eventvalidation = get_initial_state()
                except:
                    break
            
            time.sleep(0.5)

    return list(all_data.values())

if __name__ == "__main__":
    data = scrape_data()
    data.sort(key=lambda x: (x['sede'], x['nombre']))

    output = {
        "fechaGeneracion": time.strftime("%Y-%m-%d"),
        "fuente": "https://consultasori.ucr.ac.cr/frmCortesHistoricosUniversitario.aspx",
        "carreras": data
    }

    with open("public/data/cortes-ucr-historico.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"Scraping complete. Saved to public/data/cortes-ucr-historico.json")
