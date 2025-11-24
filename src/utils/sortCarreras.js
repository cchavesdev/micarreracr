export const sortCarreras = (carreras, sortBy) => {
    const sorted = [...carreras];

    switch (sortBy) {
        case 'corte-asc':
            return sorted.sort((a, b) => (a.corte2025 || a.corte) - (b.corte2025 || b.corte));
        case 'corte-desc':
            return sorted.sort((a, b) => (b.corte2025 || b.corte) - (a.corte2025 || a.corte));
        case 'nombre-asc':
            return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case 'nombre-desc':
            return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));
        default:
            return sorted;
    }
};
