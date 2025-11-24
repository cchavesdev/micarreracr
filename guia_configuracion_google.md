# Guía de Configuración: Google Analytics y AdSense

Esta guía te ayudará a obtener los identificadores necesarios para activar el rastreo de visitas y la publicidad en tu aplicación "Mi Carrera CR".

## 1. Google Analytics 4 (GA4)

Para rastrear cuántas personas visitan tu sitio:

1.  Ve a [analytics.google.com](https://analytics.google.com/).
2.  Haz clic en **Empezar a medir** (o inicia sesión si ya tienes cuenta).
3.  **Crear Cuenta**: Ponle un nombre (ej: "Mi Carrera CR").
4.  **Crear Propiedad**:
    *   Nombre: "Mi Carrera CR Web".
    *   Zona horaria: Costa Rica.
    *   Moneda: CRC o USD.
5.  **Detalles del Negocio**: Selecciona "Educación" y el tamaño de tu empresa (Pequeña).
6.  **Objetivos**: Selecciona "Generar reconocimiento de marca" o "Examinar el comportamiento del usuario".
7.  **Recogida de Datos**:
    *   Selecciona la plataforma **Web**.
    *   URL del sitio web: Si aún no tienes dominio, puedes poner `micarreracr.com` (lo podrás cambiar luego).
    *   Nombre del flujo: "Mi Carrera CR Web".
8.  **Obtener ID**:
    *   Al crear el flujo, verás una pantalla con "Detalles del flujo web".
    *   Copia el **ID DE MEDICIÓN**. Empieza por `G-` (ej: `G-A1B2C3D4E5`).

## 2. Google AdSense

Para monetizar tu sitio con anuncios:

1.  Ve a [adsense.google.com](https://adsense.google.com/).
2.  Haz clic en **Empezar**.
3.  Ingresa la URL de tu sitio (si aún no está publicado, puedes seleccionar "Aún no tengo un sitio").
4.  Sigue los pasos para activar tu cuenta.
5.  **Obtener ID de Editor**:
    *   En el menú lateral, ve a **Cuenta** > **Configuración** > **Información de la cuenta**.
    *   Copia el **ID de editor**. Empieza por `pub-` (ej: `pub-1234567890123456`).
    *   *Nota*: En el código, usaremos el formato `ca-pub-1234567890123456`.

## 3. Configuración en la App

Una vez tengas ambos IDs:

1.  Abre el archivo `.env` en la carpeta de tu proyecto.
2.  Reemplaza los valores `XXXXXXXXXX` con tus IDs reales:

```env
# Tu ID de Google Analytics (Empieza con G-)
VITE_GA_MEASUREMENT_ID=G-TU_ID_AQUI

# Tu ID de AdSense (Empieza con ca-pub-)
VITE_ADSENSE_CLIENT_ID=ca-pub-TU_ID_AQUI
```

3.  Guarda el archivo y reinicia la aplicación (`npm run dev`) para ver los cambios.

> **Importante**: Para que los anuncios reales se muestren, Google AdSense deberá aprobar tu sitio web una vez que lo hayas publicado en internet (Deploy). Mientras estés en `localhost`, seguirás viendo los recuadros de "Modo Desarrollo".
