import requests
from bs4 import BeautifulSoup
import json
import time
import re

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

def get_initial_state(session):
    response = session.get(BASE_URL)
    soup = BeautifulSoup(response.content, 'html.parser')
    viewstate = soup.find(id="__VIEWSTATE")['value']
    viewstategenerator = soup.find(id="__VIEWSTATEGENERATOR")['value']
    eventvalidation = soup.find(id="__EVENTVALIDATION")['value']
    return viewstate, viewstategenerator, eventvalidation

def scrape_data():
    session = requests.Session()
    # Add headers to mimic a browser
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    })

    try:
        viewstate, viewstategenerator, eventvalidation = get_initial_state(session)
    except Exception as e:
        print(f"Error getting initial state: {e}")
        return {}

    all_data = {}

    for sede in SEDES:
        sede_code = sede['codigo']
        sede_name = sede['nombre']
        print(f"Scraping Sede: {sede_name} ({sede_code})")

        for year in YEARS:
            print(f"  Year: {year}")
            
            payload = {
                '__EVENTTARGET': '',
                '__EVENTARGUMENT': '',
                '__VIEWSTATE': viewstate,
                '__VIEWSTATEGENERATOR': viewstategenerator,
                '__EVENTVALIDATION': eventvalidation,
                'cboRecinto': sede_code,
                'cboAnio': year,
                'btnConsultar': 'Consultar'
            }

            try:
                response = session.post(BASE_URL, data=payload)
                soup = BeautifulSoup(response.content, 'html.parser')

                # Update state for next request
                viewstate = soup.find(id="__VIEWSTATE")['value']
                viewstategenerator = soup.find(id="__VIEWSTATEGENERATOR")['value']
                eventvalidation = soup.find(id="__EVENTVALIDATION")['value']

                # Find the grid
                grid = soup.find(id="gdvCortes")
                if not grid:
                    print(f"    No data found for {sede_name} - {year}")
                    continue

                rows = grid.find_all('tr')[1:] # Skip header
                for row in rows:
                    cols = row.find_all('td')
                    if len(cols) < 3:
                        continue
                    
                    carrera_code = cols[0].text.strip()
                    carrera_name = cols[1].text.strip()
                    # Clean admission score (replace comma with dot)
                    corte_str = cols[2].text.strip().replace(',', '.')
                    
                    try:
                        corte = float(corte_str)
                    except ValueError:
                        corte = 0.0 # Or handle as None

                    # Key for aggregation: Sede + Carrera Code
                    key = f"{sede_code}-{carrera_code}"
                    
                    if key not in all_data:
                        all_data[key] = {
                            "codigo": carrera_code,
                            "nombre": carrera_name,
                            "sede": sede_name,
                            "codigoSede": sede_code,
                            "historial": []
                        }
                    
                    # Check if year already exists to avoid dupes (though unlikely with this logic)
                    if not any(h['anio'] == int(year) for h in all_data[key]['historial']):
                        all_data[key]['historial'].append({
                            "anio": int(year),
                            "corte": corte
                        })

            except Exception as e:
                print(f"    Error scraping {sede_name} - {year}: {e}")
                # Try to reset state if something breaks
                try:
                    viewstate, viewstategenerator, eventvalidation = get_initial_state(session)
                except:
                    print("    Could not recover state.")
                    break
            
            time.sleep(0.5) # Be nice to the server

    return list(all_data.values())

if __name__ == "__main__":
    data = scrape_data()
    
    # Sort by Sede then Name
    data.sort(key=lambda x: (x['sede'], x['nombre']))

    output = {
        "fechaGeneracion": time.strftime("%Y-%m-%d"),
        "fuente": "https://consultasori.ucr.ac.cr/frmCortesHistoricosUniversitario.aspx",
        "carreras": data
    }

    with open("cortes_scraped.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"Scraping complete. Found {len(data)} unique career-sede combinations.")
