// script.js

// Inicializar el mapa
const map = L.map('map').setView([20, 0], 2);  // Coordenadas iniciales y zoom

// Añadir una capa de mapa (usamos OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Función para obtener los datos de terremotos desde la API del USGS
async function getEarthquakeData() {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
    const data = await response.json();

    // Agregar los terremotos al mapa
    data.features.forEach(earthquake => {
        const [long, lat] = earthquake.geometry.coordinates;
        const magnitude = earthquake.properties.mag;
        const place = earthquake.properties.place;

        // Crear un marcador en el mapa
        const marker = L.marker([lat, long]).addTo(map);

        // Añadir un pop-up con la información del terremoto
        marker.bindPopup(`<strong>Lugar:</strong> ${place}<br><strong>Magnitud:</strong> ${magnitude}`);
    });
}

// Llamar a la función para cargar los datos de terremotos
getEarthquakeData();