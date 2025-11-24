# Mi Carrera CR

Aplicación web para consultar opciones de carreras universitarias en Costa Rica (UCR y UNA) basada en el promedio de admisión.

## Características

- **Cálculo de opciones UCR**: Filtra carreras donde el promedio del usuario supera el corte histórico.
- **Información UNA**: Verifica elegibilidad general y muestra la oferta académica completa.
- **Filtros avanzados**: Por sede, área académica y búsqueda por nombre.
- **Diseño Responsive**: Optimizado para dispositivos móviles.
- **Sin Backend**: Funciona con datos estáticos (JSON) para fácil mantenimiento.

## Tecnologías

- React + Vite
- TailwindCSS
- React Router DOM
- Lucide React

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Correr en desarrollo:
   ```bash
   npm run dev
   ```

## Datos

Los datos de cortes y carreras se encuentran en `/public/data/`.
- `cortes-ucr-2025.json`: Cortes de admisión UCR.
- `info-una-2025.json`: Información general y carreras UNA.

## Créditos

Desarrollado como herramienta de ayuda vocacional. Los datos son referenciales y deben ser verificados con las instituciones oficiales.
