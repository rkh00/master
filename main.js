// JavaScript code to create your map goes here
var map = L.map("map").setView([63.990556, 12.307778], 8);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([63.990556, 12.307778]).addTo(map);

marker
  .bindPopup("<b>Norges geografiske midtpunkt</b><br>Ifølge Kartverket.")
  .openPopup();

var geojsonLayer = L.geoJSON().addTo(map);

var baseMaps = {
  osm: osm,
};

var overlayMaps = {
  geojsonLayer: geojsonLayer,
};

var layerControlOptions = { collapsed: false };
var layerControl = L.control
  .layers(null, overlayMaps, layerControlOptions)
  .addTo(map);

var geojsonData;

async function fetchGeoJSON() {
  try {
    const response = await fetch(
      "https://api.kartverket.no/kommuneinfo/v1/kommuner/5006/omrade"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch GeoJSON data");
    }
    geojsonData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function addGeoJSONToMap() {
  await fetchGeoJSON();
  var coordinates = geojsonData.omrade.coordinates;
  delete geojsonData.crs;
  delete geojsonData.omrade;
  geojsonData.coordinates = coordinates;
  geojsonData.type = "MultiPolygon";

  geojsonLayer.addData(geojsonData);
}

addGeoJSONToMap();

var predefinedList = [
  { name: "Item 1", latlng: [51.5, -0.1] },
  { name: "Item 2", latlng: [51.51, -0.11] },
  { name: "Item 3", latlng: [51.49, -0.09] },
];

// Function to perform search
function search(query) {
  if (query === "") return []; // Return an empty array if query is empty
  const results = predefinedList
    .filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    })
    .map((item) => item.name); // Convert each item to string
  return results;
}

// Function to display search results
function displayResults(results) {
  const resultsContainer = document.getElementById("searchResults");
  if (
    results.length === 0 ||
    document.getElementById("searchInput").value === ""
  ) {
    resultsContainer.style.display = "none"; // Hide results box
    return;
  }
  resultsContainer.style.display = "block"; // Show results box
  resultsContainer.innerHTML = "";
  results.forEach((result) => {
    const resultElement = document.createElement("div");
    resultElement.textContent = result;
    resultsContainer.appendChild(resultElement);
  });
}

// Event listener for input change
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.trim();
  const searchResults = search(query);
  displayResults(searchResults);
});
