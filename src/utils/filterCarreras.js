export const filterCarrerasUCR = (carreras, filters) => {
    return carreras.filter(carrera => {
        // Filter by Sede
        if (filters.sede && filters.sede !== 'Todas' && carrera.sede !== filters.sede) {
            return false;
        }

        // Filter by Area
        if (filters.area && filters.area !== 'Todas' && carrera.area !== filters.area) {
            return false;
        }

        // Filter by Search Term
        if (filters.search) {
            const term = filters.search.toLowerCase();
            return (
                carrera.nombre.toLowerCase().includes(term) ||
                carrera.codigo.includes(term)
            );
        }

        return true;
    });
};
