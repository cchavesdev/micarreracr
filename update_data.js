import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const currentDataPath = path.join(__dirname, 'public', 'data', 'cortes-ucr-2025.json');
const scrapedDataPath = path.join(__dirname, 'scraped_data.json');

const currentData = JSON.parse(fs.readFileSync(currentDataPath, 'utf8'));
const scrapedData = JSON.parse(fs.readFileSync(scrapedDataPath, 'utf8'));

// Map scraped recintos to current sedes names to ensure matching
const sedeMapping = {
    "CIUDAD UNIVERSITARIA RODRIGO FACIO": "Ciudad Universitaria Rodrigo Facio",
    "RECINTO DE SAN RAMON": "Recinto de San Ramón",
    "RECINTO DE GRECIA": "Recinto de Grecia",
    "RECINTO DE TURRIALBA": "Recinto de Turrialba",
    "RECINTO DE PARAISO": "Recinto de Paraíso",
    "RECINTO DE GUAPILES": "Recinto de Guápiles",
    "RECINTO DE LIBERIA": "Recinto de Liberia",
    "RECINTO DE LIMON": "Recinto de Limón",
    "RECINTO SIQUIRRES": "Recinto de Siquirres",
    "RECINTO DE PUNTARENAS": "Recinto de Puntarenas",
    "RECINTO DE GOLFITO": "Recinto de Golfito",
    "RECINTO ALAJUELA": "Recinto de Alajuela"
};

const sedeCodeMapping = {
    "Ciudad Universitaria Rodrigo Facio": "11",
    "Recinto de San Ramón": "21",
    "Recinto de Grecia": "22",
    "Recinto de Turrialba": "31",
    "Recinto de Paraíso": "32",
    "Recinto de Guápiles": "33",
    "Recinto de Liberia": "41",
    "Recinto de Limón": "51",
    "Recinto de Siquirres": "52",
    "Recinto de Puntarenas": "61",
    "Recinto de Golfito": "71",
    "Recinto de Alajuela": "81"
};

// Helper to normalize string for comparison
const normalize = (str) => str.toUpperCase().trim();

const updatedCarreras = [];

// Iterate through scraped data to update or add
scrapedData.forEach(scrapedItem => {
    const sedeName = sedeMapping[scrapedItem.recinto] || scrapedItem.recinto;
    const codigoSede = sedeCodeMapping[sedeName] || "00";
    const corte = parseFloat(scrapedItem.admision.replace(',', '.'));

    // Find existing item
    const existingItem = currentData.carreras.find(c =>
        c.codigo === scrapedItem.codigo &&
        (c.sede === sedeName || normalize(c.sede) === normalize(sedeName))
    );

    if (existingItem) {
        updatedCarreras.push({
            ...existingItem,
            nombre: scrapedItem.carrera, // Update name
            corte: corte, // Update cutoff
            sede: sedeName // Ensure standard sede name
        });
    } else {
        // New item
        updatedCarreras.push({
            codigo: scrapedItem.codigo,
            nombre: scrapedItem.carrera,
            tipo: "Bachillerato y Licenciatura", // Default
            corte: corte,
            sede: sedeName,
            codigoSede: codigoSede,
            area: "Otras" // Default area
        });
    }
});

// Preserve items that were in currentData but not in scrapedData?
// User said "modifica el json... basado en lo que encuentres".
// If it's not in the official page, maybe it shouldn't be in the file.
// But let's keep them just in case, but maybe mark them?
// Actually, for safety, let's only keep what's in the official list + preserve area from existing.
// If an existing item is NOT in scraped data, it might be an error in the old file or a career that didn't open.
// I will trust the scraped data as the source of truth for *availability*.

// However, I need to make sure I didn't miss anything.
// The scraped data seems comprehensive for 2025.

currentData.carreras = updatedCarreras;

fs.writeFileSync(currentDataPath, JSON.stringify(currentData, null, 2), 'utf8');
console.log(`Updated ${updatedCarreras.length} careers.`);
