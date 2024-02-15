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

async function fetchGeoJSON(nummer) {
  if (nummer.length == 4) {
    apiLink = `https://api.kartverket.no/kommuneinfo/v1/kommuner/${nummer}/omrade`;
  } else if (nummer.length == 2) {
    apiLink = `https://api.kartverket.no/kommuneinfo/v1/fylker/${nummer}/omrade`;
  } else {
    console.error("Unknown error.");
    return;
  }
  try {
    const response = await fetch(apiLink);
    if (!response.ok) {
      throw new Error("Failed to fetch GeoJSON data");
    }
    geojsonData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return;
}

async function addGeoJSONToMap(kommunenummer) {
  await fetchGeoJSON(kommunenummer);
  var coordinates = geojsonData.omrade.coordinates;
  delete geojsonData.crs;
  delete geojsonData.omrade;
  geojsonData.coordinates = coordinates;
  geojsonData.type = "MultiPolygon";

  geojsonLayer.clearLayers();
  geojsonLayer.addData(geojsonData);
  map.fitBounds(geojsonLayer.getBounds());

  // TODO Ping to new GeoJSON
}

// function panToGeojson(polygon) {

// }

// geojsonLayer.on("add", () => {
//   console.log("hello");
//   map.fitBounds(geojsonLayer.getBounds());
// });

// Function to perform search
function search(query) {
  if (query === "") return []; // Return an empty array if query is empty
  const results1 = kommuneList
    .filter((item) => {
      return item.navn.toLowerCase().includes(query.toLowerCase());
    })
    .map((item) => item); // Convert each item to string

  const results2 = fylkeList
    .filter((item) => {
      return item.navn.toLowerCase().includes(query.toLowerCase());
    })
    .map((item) => item); // Convert each item to string
  return [results1, results2];
}

// Function to display search results
function displayResults(results1, results2) {
  const resultsContainer = document.getElementById("searchResults");
  if (
    !results1 & !results2 ||
    (results1.length === 0 && results2.length === 0) ||
    document.getElementById("searchInput").value === ""
  ) {
    resultsContainer.style.display = "none"; // Hide results box
    return;
  }
  resultsContainer.style.display = "block"; // Show results box
  resultsContainer.innerHTML = "";

  if (results1.length > 0) {
    const categoryTitle1 = document.createElement("div");
    categoryTitle1.innerHTML = "<b>Kommuner:</b>";
    resultsContainer.appendChild(categoryTitle1);

    results1.sort((a, b) => a.navn.localeCompare(b.navn));
    results1.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.textContent = result.navn;
      resultElement.addEventListener("click", () => {
        addGeoJSONToMap(result.nummer);
        document.getElementById("searchInput").value = "";
        resultsContainer.style.display = "none";
      });
      resultsContainer.appendChild(resultElement);
    });
  }

  if (results2.length > 0) {
    const categoryTitle2 = document.createElement("div");
    categoryTitle2.innerHTML = "<b>Fylker:</b>";
    resultsContainer.appendChild(categoryTitle2);

    results2.sort((a, b) => a.navn.localeCompare(b.navn));
    results2.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.textContent = result.navn;
      resultElement.addEventListener("click", () => {
        addGeoJSONToMap(result.nummer);
        document.getElementById("searchInput").value = "";
        resultsContainer.style.display = "none";
      });
      resultsContainer.appendChild(resultElement);
    });
  }

  resultsContainer.addEventListener("wheel", function (event) {
    event.stopPropagation();
  });
}

// Event listener for input change
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.trim();
  const searchResults = search(query);
  displayResults(searchResults[0], searchResults[1]);
});

document
  .getElementById("searchInput")
  .addEventListener("dblclick", function (event) {
    event.stopPropagation();
  });
