// JavaScript code to create your map goes here
var map = L.map("map").setView([63.990556, 12.307778], 8);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([63.990556, 12.307778]).addTo(map);

marker
  .bindPopup("<b>Norway's geographic centroid</b><br>According to Kartverket.")
  .openPopup();

var polygonLayer = L.geoJSON().addTo(map);
var pointLayer = L.layerGroup().addTo(map);

var baseMaps = {
  osm: osm,
};

var overlayMaps = {
  "Show polygon": polygonLayer,
  "Show centroid": pointLayer,
};

var layerControlOptions = { collapsed: false };
var layerControl = L.control
  .layers(null, overlayMaps, layerControlOptions)
  .addTo(map);

var geojsonData;
var selectedCentroid = "moment";
var selectedOption = "yes";
var selectedCoordsys = "4258";
var polygonNumber;
var polygonName;
var leafletPolygonCenter;
var selectedMode;

// prettier-ignore
var centroidTypes = {
  "moment": "Moment",
  "area": "Area",
  "arith_mean": "Arithmetic Mean",
  "rms": "Root Mean Square",
  "harmonic": "Harmonic",
  "geo_mean": "Geometric Mean",
  "median": "Median",
  "min_bound": "Minimum Bounding",
};

async function fetchGeoJSON(nummer) {
  if (nummer.length == 4) {
    apiLink = `https://api.kartverket.no/kommuneinfo/v1/kommuner/${nummer}/omrade?utkoordsys=${selectedCoordsys}`;
  } else if (nummer.length == 2) {
    apiLink = `https://api.kartverket.no/kommuneinfo/v1/fylker/${nummer}/omrade?utkoordsys=${selectedCoordsys}`;
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

async function addGeoJSONToMap(nummer) {
  await fetchGeoJSON(nummer);
  if (geojsonData.kommunenavn) {
    polygonName = geojsonData.kommunenavn;
  } else if (geojsonData.fylkesnavn) {
    polygonName = geojsonData.fylkesnavn;
  }
  var coordinates = geojsonData.omrade.coordinates;
  delete geojsonData.crs;
  delete geojsonData.omrade;
  geojsonData.coordinates = coordinates;
  geojsonData.type = "MultiPolygon";

  polygonLayer.clearLayers();
  polygonLayer.addData(geojsonData);

  map.fitBounds(polygonLayer.getBounds());
  leafletPolygonCenter = polygonLayer.getBounds().getCenter();

  addCentroidToMap();
}

function addCentroidToMap() {
  var centroid = findCentroid(geojsonData.coordinates);
  pointLayer.clearLayers();
  var marker = L.marker([centroid[1], centroid[0]])
    .bindPopup(
      `<b>${centroidTypes[selectedCentroid]} Centroid of ${polygonName}:</b><br>${centroid[1]}, ${centroid[0]}`
    )
    .openPopup()
    .addTo(pointLayer);
  marker.openPopup();
}

function findCentroid(coordinateArray) {
  switch (selectedCentroid) {
    case "moment":
      return findMomentCentroid(coordinateArray, leafletPolygonCenter);
    case "area":
      return findAreaCentroid(coordinateArray);
    case "arith_mean":
      return findArithmeticMeanCentroid(coordinateArray);
    case "rms":
      return findRootMeanSquareCentroid(coordinateArray);
    case "harmonic":
      return findHarmonicMeanCentroid(coordinateArray);
    case "geo_mean":
      return findGeometricMeanCentroid(coordinateArray);
    case "median":
      return findMedianCentroid(coordinateArray);
    case "min_bound":
      return findMinRectangleCentroid(coordinateArray);
    default:
      console.log("An unknown error occurred.");
  }
}

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
    categoryTitle1.innerHTML = `<b>Municipalities (${results1.length}):</b>`;
    categoryTitle1.classList.add("category-title");
    resultsContainer.appendChild(categoryTitle1);

    results1.sort((a, b) => a.navn.localeCompare(b.navn));
    results1.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.textContent = result.navn;
      resultElement.addEventListener("click", () => {
        addGeoJSONToMap(result.nummer, result.navn);
        polygonNumber = result.nummer;
        document.getElementById("searchInput").value = "";
        resultsContainer.style.display = "none";
      });
      resultElement.classList.add("searchResult");
      resultsContainer.appendChild(resultElement);
    });
  }

  if (results2.length > 0) {
    const categoryTitle2 = document.createElement("div");
    categoryTitle2.innerHTML = `<b>Counties (${results2.length}):</b>`;
    categoryTitle2.classList.add("category-title");
    resultsContainer.appendChild(categoryTitle2);

    results2.sort((a, b) => a.navn.localeCompare(b.navn));
    results2.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.textContent = result.navn;
      resultElement.addEventListener("click", () => {
        addGeoJSONToMap(result.nummer, result.navn);
        polygonNumber = result.nummer;
        document.getElementById("searchInput").value = "";
        resultsContainer.style.display = "none";
      });
      resultElement.classList.add("searchResult");
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

// TODO: Enter key press when only one result brings user straight to only result
// document.getElementById("searchInput").addEventListener("keydown", (event) => {
//   if (event.keyCode !== 13) return;
//   handleEnterKeyPress();
// });

// Define a custom control class by extending L.Control
var CentroidControl = L.Control.extend({
  options: {
    position: "bottomleft", // Position of the control on the map
    collapsed: true,
  },

  onAdd: function (map) {
    // Create a container element for the control
    var centroidSelectorContainer = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control custom-control"
    );

    // Add content to the container
    centroidSelectorContainer.innerHTML = `
        <b>Select centroid:</b>
        <div>
            <input type="radio" id="centroid_option1" name="centroidOptions" value="moment" checked>
            <label for="centroid_option1">Moment Centroid</label>
        </div>
        <div>
            <input type="radio" id="centroid_option2" name="centroidOptions" value="area">
            <label for="centroid_option2">Area Centroid (Not yet implemented)</label>
        </div>
        <div>
            <input type="radio" id="centroid_option3" name="centroidOptions" value="arith_mean">
            <label for="centroid_option3">Arithmetic Mean Centroid</label>
        </div>
        <div>
            <input type="radio" id="centroid_option4" name="centroidOptions" value="rms">
            <label for="centroid_option4">Root Mean Square Centroid</label>
        </div>
        <div>
            <input type="radio" id="centroid_option5" name="centroidOptions" value="harmonic">
            <label for="centroid_option5">Harmonic Mean Centroid</label>
        </div>
        <div>
            <input type="radio" id="centroid_option6" name="centroidOptions" value="geo_mean">
            <label for="centroid_option6">Geometric Mean Centroid</label>
        </div>
        <div>
            <input type="radio" id="centroid_option7" name="centroidOptions" value="median">
            <label for="centroid_option7">Median Centroid</label>
        </div>
        <div>
            <input type="radio" id="centroid_option8" name="centroidOptions" value="min_bound">
            <label for="centroid_option8">Minimum Bounding Centroid</label>
        </div>
    `;

    // Function to handle radio button change
    function handleCentroidRadioChange(event) {
      // console.log("Selected option:", event.target.value);
      selectedCentroid = event.target.value;
      if (geojsonData != null) {
        addCentroidToMap();
      }
      // Call your custom function here based on the selected option
    }

    // Attach event listeners to radio buttons
    var centroidRadios = centroidSelectorContainer.querySelectorAll(
      'input[type="radio"]'
    );
    centroidRadios.forEach(function (radio) {
      radio.addEventListener("change", handleCentroidRadioChange);
    });

    // Stop propagation of click events to prevent map interaction
    L.DomEvent.disableClickPropagation(centroidSelectorContainer);

    // Return the container
    return centroidSelectorContainer;
  },
});

var ModeControl = L.Control.extend({
  options: {
    position: "bottomleft", // Position of the control on the map
    collapsed: true,
  },
  onAdd: function (map) {
    // Create a container element for the control
    var modeControlContainer = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control custom-control"
    );

    // Add content to the container
    modeControlContainer.innerHTML = `
    <b>Select mode (Not yet implemented)</b>
    <div>
        <input type="radio" id="mode_option1" name="modeOptions" value="terrainless" checked>
        <label for="mode_option1">Terrainless (2D)</label>
    </div>
    <div>
        <input type="radio" id="mode_option2" name="modeOptions" value="terrain">
        <label for="mode_option2">Terrain (3D)</label>
    </div>
    <div>
        <input type="radio" id="mode_option3" name="modeOptions" value="population">
        <label for="mode_option3">Population</label>
    </div>
    `;

    // Function to handle radio button change
    function handleModeChange(event) {
      selectedMode = event.target.value;
      updateAreaToggleVisibility();
    }

    // Attach event listeners to radio buttons
    var modeController = modeControlContainer.querySelectorAll(
      'input[type="radio"]'
    );
    modeController.forEach(function (radio) {
      radio.addEventListener("change", handleModeChange);
    });

    // Stop propagation of click events to prevent map interaction
    L.DomEvent.disableClickPropagation(modeControlContainer);

    // Return the container
    return modeControlContainer;
  },
});

var AreaToggle = L.Control.extend({
  options: {
    position: "bottomleft", // Position of the control on the map
    collapsed: true,
  },
  onAdd: function (map) {
    // Create a container element for the control
    var areaToggleContainer = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control custom-control"
    );

    // Add content to the container
    areaToggleContainer.innerHTML = `
    <b>Include water area? (Not yet implemented)</b>
    <div>
        <input type="radio" id="water_option1" name="waterOptions" value="water_yes" checked>
        <label for="water_option1">Yes</label>
    </div>
    <div>
        <input type="radio" id="water_option2" name="waterOptions" value="water_no">
        <label for="water_option2">No</label>
    </div>
    `;

    // Function to handle radio button change
    function handleAreaRadioChange(event) {
      selectedOption = event.target.value;
    }

    // Attach event listeners to radio buttons
    var areaRadios = areaToggleContainer.querySelectorAll(
      'input[type="radio"]'
    );
    areaRadios.forEach(function (radio) {
      radio.addEventListener("change", handleAreaRadioChange);
    });

    // Stop propagation of click events to prevent map interaction
    L.DomEvent.disableClickPropagation(areaToggleContainer);

    // Return the container
    return areaToggleContainer;
  },
});

function handleFormSubmit(event) {
  event.preventDefault();
  var coordsysPicker = document.getElementById("coordsys_picker");
  selectedCoordsys = coordsysPicker.value;
  coordsysPicker.value = "";
  addGeoJSONToMap(polygonNumber);
}

var CoordsysSelector = L.Control.extend({
  options: {
    position: "bottomright", // Position of the control on the map
    collapsed: true,
  },
  onAdd: function (map) {
    // Create a container element for the control
    var coordsysSelectorContainer = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control custom-control"
    );

    // Add content to the container
    coordsysSelectorContainer.innerHTML = `
    <form id="coordsysForm">
    <b>Choose coordinate system (default EPSG:4258)</b><br>(Only if you know what you're doing)
    <br>
        <label for="coordsys_picker">EPSG:</label>
        <input type="text" id="coordsys_picker" name="coordsysPicker">
        <input type="button" value="Submit" onclick="handleFormSubmit(event)">
    </form>
    `;

    coordsysSelectorContainer.onclick = function (event) {
      L.DomEvent.stopPropagation(event);
    };

    // function handleFormSubmit(event) {
    //   event.preventDefault();
    //   selectedCoordsys = document.getElementById("coordsys_picker").value;
    //   handleCoordsysChange(selectedCoordsys);
    // }

    // var form = document.querySelector("#coordsysForm");
    // form.addEventListener("submit", handleFormSubmit);

    // Function to handle radio button change
    // function handleCoordsysChange(event) {
    //   event.preventDefault();
    //   // selectedCoordsys = event.target.value;
    //   console.log("hello");
    // }

    // var coordsysForm = coordsysSelectorContainer.querySelectorAll(
    //   'input[type="submit"]'
    // );
    // coordsysForm.forEach(function (submit) {
    //   submit.addEventListener("submit", handleCoordsysChange);
    // });

    // var coordsysForm = document.getElementById("coordsysForm");
    // coordsysForm.addEventListener("submit", handleCoordsysChange);

    // // Attach event listeners to radio buttons
    // var coordsysSubmit = coordsysSelectorContainer.querySelectorAll(
    //   'input[type="submit"]'
    // );
    // coordsysSubmit.forEach(function (submit) {
    //   submit.addEventListener("submit", handleCoordsysChange);
    // });

    // Stop propagation of click events to prevent map interaction
    L.DomEvent.disableClickPropagation(coordsysSelectorContainer);

    // Return the container
    return coordsysSelectorContainer;
  },
});

// Add the custom control to the map
var centroidControl = new CentroidControl();
centroidControl.addTo(map);

var modeControl = new ModeControl();
modeControl.addTo(map);

// Add the custom control to the map
var areaToggle = new AreaToggle();
areaToggle.addTo(map);

var coordsysSelector = new CoordsysSelector();
coordsysSelector.addTo(map);

function updateAreaToggleVisibility() {
  if (selectedMode == "terrainless") {
    map.addControl(areaToggle);
  } else {
    map.removeControl(areaToggle);
  }
}

async function getData() {
  try {
    const response = await fetch(
      "https://nedlasting.geonorge.no/api/capabilities/73f863ba-628f-48af-b7fa-30d3ab331b8d",
      { mode: "no-cors" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch GeoJSON data");
    }
    var testData = await response.json();
    console.log(testData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return;
}
