import { create } from "domain";
import fs from "fs";

function findMomentCentroid(coordinateArray) {
  var xSum = 0;
  var ySum = 0;
  var area = 0;

  coordinateArray.forEach((polygon) => {
    const numPoints = polygon[0].length;
    for (let i = 0; i < numPoints - 1; i++) {
      const xi = polygon[0][i][0];
      const yi = polygon[0][i][1];
      const xiPlus1 = polygon[0][i + 1][0];
      const yiPlus1 = polygon[0][i + 1][1];

      const ai = xi * yiPlus1 - xiPlus1 * yi; // Cross-product to calculate the area of the triangle
      area += ai;
      xSum += (xi + xiPlus1) * ai; // Accumulate sum of moments along x-axis
      ySum += (yi + yiPlus1) * ai; // Accumulate sum of moments along y-axis
    }
  });

  area /= 2; // The area calculated will be twice the actual area, so we divide by 2

  var centroidX = xSum / (6 * area); // Calculate centroid's x-coordinate
  var centroidY = ySum / (6 * area); // Calculate centroid's y-coordinate

  return [centroidX, centroidY];
}

function findArithmeticMeanCentroid(coordinateArray) {
  var n = 0;
  var totLong = 0;
  var totLat = 0;

  coordinateArray.forEach((polygon) => {
    n += polygon[0].length;
    polygon[0].forEach((coordinate) => {
      totLong += coordinate[0];
      totLat += coordinate[1];
    });
  });

  var centroidX = totLong / n;
  var centroidY = totLat / n;

  return [centroidX, centroidY];
}

function findRootMeanSquareCentroid(coordinateArray) {
  var n = 0;
  var totLong = 0;
  var totLat = 0;

  coordinateArray.forEach((polygon) => {
    n += polygon[0].length;
    polygon[0].forEach((coordinate) => {
      totLong += coordinate[0] ** 2;
      totLat += coordinate[1] ** 2;
    });
  });

  var centroidX = Math.sqrt(totLong / n);
  var centroidY = Math.sqrt(totLat / n);

  return [centroidX, centroidY];
}

function findHarmonicMeanCentroid(coordinateArray) {
  var n = 0;
  var totLong = 0;
  var totLat = 0;

  coordinateArray.forEach((polygon) => {
    n += polygon[0].length;
    polygon[0].forEach((coordinate) => {
      totLong += 1 / coordinate[0];
      totLat += 1 / coordinate[1];
    });
  });

  var centroidX = 1 / (totLong / n);
  var centroidY = 1 / (totLat / n);

  return [centroidX, centroidY];
}

function findGeometricMeanCentroid(coordinateArray) {
  var n = 0;
  var totLong = 0;
  var totLat = 0;
  var n_neg_longs = 0;
  var n_neg_lats = 0;

  coordinateArray.forEach((polygon) => {
    n += polygon[0].length;
    polygon[0].forEach((coordinate) => {
      if (coordinate[0] < 0) {
        n_neg_longs++;
      }
      totLong += Math.log(Math.abs(coordinate[0]));
      if (coordinate[1] < 0) {
        n_neg_lats++;
      }
      totLat += Math.log(Math.abs(coordinate[1]));
    });
  });

  var centroidX =
    Math.exp(totLong / n) * Math.pow(Math.pow(-1, n_neg_longs), 1 / n);
  var centroidY =
    Math.exp(totLat / n) * Math.pow(Math.pow(-1, n_neg_lats), 1 / n);

  return [centroidX, centroidY];
}

function findMedianCentroid(coordinateArray) {
  var n = 0;
  var longs = [];
  var lats = [];

  coordinateArray.forEach((polygon) => {
    n += polygon[0].length;
    polygon[0].forEach((coordinate) => {
      longs.push(coordinate[0]);
      lats.push(coordinate[1]);
    });
  });

  longs.sort();
  lats.sort();

  if (n % 2 == 0) {
    var centroidX = (longs[n / 2] + longs[n / 2 + 1]) / 2;
    var centroidY = (lats[n / 2] + lats[n / 2 + 1]) / 2;
  } else {
    var centroidX = longs[(n + 1) / 2];
    var centroidY = lats[(n + 1) / 2];
  }

  return [centroidX, centroidY];
}

function findMinRectangleCentroid(coordinateArray) {
  var minLong = coordinateArray[0][0][0][0];
  var maxLong = coordinateArray[0][0][0][0];
  var minLat = coordinateArray[0][0][0][1];
  var maxLat = coordinateArray[0][0][0][1];

  // Find the minimum and maximum values for each column
  coordinateArray.forEach((polygon) => {
    polygon[0].forEach((coordinate) => {
      minLong = Math.min(minLong, coordinate[0]);
      maxLong = Math.max(maxLong, coordinate[0]);
      minLat = Math.min(minLat, coordinate[1]);
      maxLat = Math.max(maxLat, coordinate[1]);
    });
  });

  // Calculate the averages of the minimum and maximum values
  const avgLong = (minLong + maxLong) / 2;
  const avgLat = (minLat + maxLat) / 2;

  return [avgLong, avgLat];
}

var kommuneList = [
  { nummer: "1124", navn: "Sola" },
  { nummer: "1151", navn: "Utsira" },
  { nummer: "1514", navn: "Sande" },
  { nummer: "1547", navn: "Aukra" },
  { nummer: "1826", navn: "Hattfjelldal" },
  { nummer: "1832", navn: "Hemnes" },
  { nummer: "1835", navn: "Træna" },
  { nummer: "1859", navn: "Flakstad" },
  { nummer: "1875", navn: "Hamarøy" },
  { nummer: "3110", navn: "Hvaler" },
  { nummer: "3116", navn: "Skiptvet" },
  { nummer: "3203", navn: "Asker" },
  { nummer: "3218", navn: "Ås" },
  { nummer: "3220", navn: "Enebakk" },
  { nummer: "3222", navn: "Lørenskog" },
  { nummer: "3224", navn: "Rælingen" },
  { nummer: "3328", navn: "Ål" },
  { nummer: "3338", navn: "Nore og Uvdal" },
  { nummer: "3421", navn: "Trysil" },
  { nummer: "3423", navn: "Stor-Elvdal" },
  { nummer: "3432", navn: "Lesja" },
  { nummer: "3448", navn: "Nordre Land" },
  { nummer: "3453", navn: "Øystre Slidre" },
  { nummer: "3911", navn: "Færder" },
  { nummer: "4036", navn: "Vinje" },
  { nummer: "4204", navn: "Kristiansand" },
  { nummer: "4219", navn: "Evje og Hornnes" },
  { nummer: "4220", navn: "Bygland" },
  { nummer: "4624", navn: "Bjørnafjorden" },
  { nummer: "4627", navn: "Askøy" },
  { nummer: "5028", navn: "Melhus" },
  { nummer: "5041", navn: "Snåase - Snåsa" },
  { nummer: "5520", navn: "Bardu" },
  { nummer: "5532", navn: "Balsfjord" },
  { nummer: "5542", navn: "Skjervøy" },
  { nummer: "5544", navn: "Nordreisa" },
  { nummer: "5603", navn: "Hammerfest" },
  { nummer: "5610", navn: "Kárásjohka - Karasjok" },
  { nummer: "5624", navn: "Lebesby" },
  { nummer: "5626", navn: "Gamvik" },
];

var fylkeList = [
  { nummer: "34", navn: "Innlandet" },
  { nummer: "39", navn: "Vestfold" },
  { nummer: "46", navn: "Vestland" },
  { nummer: "56", navn: "Finnmark – Finnmárku – Finmarkku" },
];

var kommuneFeatureIds = [
  { nummer: "1124", featureId: "5bf20af1-5430-45a8-b4df-6c50bc30ebb1" },
  { nummer: "1151", featureId: "6f5440e1-0690-4c54-82b5-568b397dd87b" },
  { nummer: "1514", featureId: "617485c7-dd5e-42b7-9888-e94513444835" },
  { nummer: "1547", featureId: "75bac93e-de89-4bc1-a0d4-775cdcf8f423" },
  { nummer: "1826", featureId: "81fcfb11-829c-4676-93e6-69d4ba3b4fe1" },
  { nummer: "1832", featureId: "e15ec547-2b87-4765-8301-13230485dfa6" },
  { nummer: "1835", featureId: "ac286f86-e44c-40d1-b26f-fc83a2501dc1" },
  { nummer: "1859", featureId: "a458efe0-b6bf-420c-9c13-5200e0a93adb" },
  { nummer: "1875", featureId: "32b7a1d8-b69c-4fe9-b2e1-faef314947cd" },
  { nummer: "3110", featureId: "0d7b8902-b8a3-4e1e-a9fc-df5b2733c617" },
  { nummer: "3116", featureId: "9948d9bd-c661-41d0-b47e-cb077fe231b9" },
  { nummer: "3203", featureId: "ca889b1d-f767-4afc-afed-be95e29ae4fa" },
  { nummer: "3218", featureId: "74273193-b926-40e1-959e-e02c3942dc81" },
  { nummer: "3220", featureId: "afb7764a-6c5a-4a0a-94fe-e02d3390d5a4" },
  { nummer: "3222", featureId: "62099986-00d2-40d1-91d2-27c4403a1889" },
  { nummer: "3224", featureId: "16d03e0c-78cc-4dbc-aedb-03962284d27e" },
  { nummer: "3328", featureId: "e4f877ca-9330-4830-85d8-d116a738be2a" },
  { nummer: "3338", featureId: "d4000778-bb1d-4f8c-a0d2-7788d5dda5c3" },
  { nummer: "3421", featureId: "ff289cbb-14c8-4c74-8a31-896b2c175667" },
  { nummer: "3423", featureId: "95d47c84-7d5c-4ad6-b05c-3f2e3ec80f82" },
  { nummer: "3432", featureId: "cbc345bd-70cc-4131-85b5-534428553212" },
  { nummer: "3448", featureId: "75c667c6-5e04-48ed-9bfe-1da57bf18390" },
  { nummer: "3453", featureId: "18a50d4c-a5ab-47ae-bf7d-54391c67637d" },
  { nummer: "3911", featureId: "926f576c-0db6-4b98-805f-2932ba914baf" },
  { nummer: "4036", featureId: "a2b4ac1b-74a5-4477-bc99-16fc386e8a5c" },
  { nummer: "4204", featureId: "9f3d9ee1-a622-4515-ac6c-b5b10ebde6f3" },
  { nummer: "4219", featureId: "8b023c74-4db4-48f9-8a5c-a3124c75da14" },
  { nummer: "4220", featureId: "58e7c80f-b9c2-43f6-99b7-4a0ac3eb923b" },
  { nummer: "4624", featureId: "543ac82b-d449-4fbe-bd93-8eaf7e16ef8c" },
  { nummer: "4627", featureId: "2bdfc1fd-8d82-4680-8230-6deed0161941" },
  { nummer: "5028", featureId: "778af2cb-3c48-4c6c-9841-6a35f2288fb9" },
  { nummer: "5041", featureId: "92291601-dbeb-432a-b640-eb31d0ac6ff0" },
  { nummer: "5520", featureId: "3a7a9b3e-a6a9-4ef7-bc4e-0f1083a8de1a" },
  { nummer: "5532", featureId: "9e24b188-830d-4fb1-8c27-f3428af8a6b4" },
  { nummer: "5542", featureId: "728b21bc-5980-4fbd-bf23-86d22b0f8b68" },
  { nummer: "5544", featureId: "59dd3930-9f65-49b2-9a3a-3d6c4c03a83b" },
  { nummer: "5603", featureId: "778bf04f-6b8c-4c43-8c9d-de7f6777635b" },
  { nummer: "5610", featureId: "acbef55a-a616-4845-ab4f-a5a9ea6b0e98" },
  { nummer: "5624", featureId: "148308fc-f444-442d-8617-b4f3b7d51892" },
  { nummer: "5626", featureId: "29818c5a-4baa-4ca9-98a5-8b78ab00877a" },
];

var fylkeFeatureIds = [
  { nummer: "34", featureId: "f96e22cd-cd45-48a3-99b8-a3d5b78c76b4" },
  {
    nummer: "39",
    featureId:
      "22642144-2de8-4e9d-bea0-0520fb44e85a3727684b2f77b1c2723e9c2b0557eb052581ea5f433a08dfc45767bd6f8ffc22",
  },
  { nummer: "46", featureId: "33b5940c-93c4-40cc-8931-64086e7d49e7" },
  {
    nummer: "56",
    featureId:
      "545cbfe3-2f34-4792-a9e9-135375accefdebb65dc07a6aac7e6fbba753102529da11054da16b8fbd950aef94cc9b657aa3",
  },
];

const small_municipalities = [
  "Aukra",
  "Færder",
  "Hvaler",
  "Lørenskog",
  "Rælingen",
  "Sande",
  "Sola",
  "Træna",
  "Utsira",
  "Ås",
];
const large_municipalities = [
  "Hammerfest",
  "Kárásjohka - Karasjok",
  "Lebesby",
  "Lesja",
  "Nordreisa",
  "Nore og Uvdal",
  "Stor-Elvdal",
  "Trysil",
  "Vinje",
  "Hattfjelldal",
];
const coastal_municipalities = [
  "Asker",
  "Askøy",
  "Balsfjord",
  "Bjørnafjorden",
  "Flakstad",
  "Gamvik",
  "Hamarøy",
  "Hemnes",
  "Kristiansand",
  "Skjervøy",
];
const inland_municipalities = [
  "Bardu",
  "Bygland",
  "Enebakk",
  "Evje og Hornnes",
  "Melhus",
  "Nordre Land",
  "Snåase - Snåsa",
  "Skiptvet",
  "Øystre Slidre",
  "Ål",
];

const small_county = ["Vestfold"];
const large_county = ["Finnmark – Finnmárku – Finmarkku"];
const coastal_county = ["Vestland"];
const inland_county = ["Innlandet"];

const all_subdivs = [
  small_municipalities,
  large_municipalities,
  coastal_municipalities,
  inland_municipalities,
  small_county,
  large_county,
  coastal_county,
  inland_county,
];

const water_coordsys = ["4258", "32632", "32633", "32635"];
const no_water_coordsys = ["4258", "25832", "25833", "25835"];

const water_statuses = [true, false];

var selectedCoordsys = "25835";
var water = false;

function getNameFromNumber(nummer) {
  if (nummer.length == 4) {
    for (var i = 0; i < kommuneList.length; i++) {
      if (kommuneList[i].nummer == nummer) {
        return kommuneList[i].navn;
      }
    }
  } else if (nummer.length == 2) {
    for (var i = 0; i < fylkeList.length; i++) {
      if (fylkeList[i].nummer == nummer) {
        return fylkeList[i].navn;
      }
    }
  }
}

// This is an incredibly inefficient way of doing this
// But since we're only dealing with <400 subdivisions it's fine
function getNumberFromName(navn) {
  for (var i = 0; i < kommuneList.length; i++) {
    if (kommuneList[i].navn == navn) {
      return kommuneList[i].nummer;
    }
  }
  for (var i = 0; i < fylkeList.length; i++) {
    if (fylkeList[i].navn == navn) {
      return fylkeList[i].nummer;
    }
  }
}

function swapLatLong(input_geojson) {
  var parsed_geojson = input_geojson;

  parsed_geojson.coordinates.forEach((polygon) => {
    const numPoints = polygon[0].length;
    for (let i = 0; i < numPoints; i++) {
      const temp = polygon[0][i][0];
      polygon[0][i][0] = polygon[0][i][1];
      polygon[0][i][1] = temp;
    }
  });

  return parsed_geojson;
}

async function fetchGeoJSON(nummer) {
  //   var apiLink;
  const switchValue = `${nummer.length}_${water}`;
  console.log(switchValue);
  console.log(selectedCoordsys);
  switch (switchValue) {
    case "4_true":
      var apiLink = `https://api.kartverket.no/kommuneinfo/v1/kommuner/${nummer}/omrade?utkoordsys=${selectedCoordsys}`;
      break;
    case "2_true":
      var apiLink = `https://api.kartverket.no/kommuneinfo/v1/fylker/${nummer}/omrade?utkoordsys=${selectedCoordsys}`;
      break;
    case "4_false":
      for (var i = 0; i < kommuneFeatureIds.length; i++) {
        if (kommuneFeatureIds[i].nummer === nummer) {
          var featureId = kommuneFeatureIds[i].featureId;
          break;
        }
      }
      var apiLink = `https://ogcapi-stemmekretser.kartverket.no/collections/kommuner/items/${featureId}?crs=http%3A%2F%2Fwww.opengis.net%2Fdef%2Fcrs%2FEPSG%2F0%2F${selectedCoordsys}&f=json&lang=nb-NO`;
      break;
    case "2_false":
      for (var i = 0; i < fylkeFeatureIds.length; i++) {
        if (fylkeFeatureIds[i].nummer === nummer) {
          var featureId = fylkeFeatureIds[i].featureId;
          break;
        }
      }
      var apiLink = `https://ogcapi-stemmekretser.kartverket.no/collections/fylker/items/${featureId}?crs=http%3A%2F%2Fwww.opengis.net%2Fdef%2Fcrs%2FEPSG%2F0%2F${selectedCoordsys}&f=json&lang=nb-NO`;
      break;
    default:
      console.error("Unknown error.");
  }
  try {
    const response = await fetch(apiLink);
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to fetch GeoJSON data");
    }
    var geojsonData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  if (water == true) {
    var coordinates = geojsonData.omrade.coordinates;
    geojsonData.type = "MultiPolygon";
  } else {
    if (geojsonData.geometry.type == "MultiPolygon") {
      var coordinates = geojsonData.geometry.coordinates;
    } else {
      var coordinates = [geojsonData.geometry.coordinates];
      geojsonData.type = "MultiPolygon";
    }
  }
  geojsonData.coordinates = coordinates;
  if (selectedCoordsys == "4258" && !water) {
    geojsonData = swapLatLong(geojsonData);
  }
  return geojsonData;
}

// Code needs to:
// 1. Retrieve a subdiv polygon
// 2. Calculate all seven centroids for said polygon
// 3. Do the same for all four coordinate systems
// 4. Do the same for non-water polygons

var data = [
  [
    "number",
    "water",
    "coordsys",
    "momentX",
    "momentY",
    "arithX",
    "arithY",
    "rmsX",
    "rmsY",
    "harmonicX",
    "harmonicY",
    "geomeanX",
    "geomeanY",
    "medianX",
    "medianY",
    "minboundX",
    "minboundY",
  ],
];

async function create_datapoint(subdiv) {
  var nummer = getNumberFromName(subdiv);
  // console.log(nummer);
  var geojsonData = await fetchGeoJSON(nummer);
  //   console.log(geojsonData);
  var momentCentroid = findMomentCentroid(geojsonData.coordinates);
  var arithmeticMeanCentroid = findArithmeticMeanCentroid(
    geojsonData.coordinates
  );
  var rootMeanSquareCentroid = findRootMeanSquareCentroid(
    geojsonData.coordinates
  );
  var harmonicMeanCentroid = findHarmonicMeanCentroid(geojsonData.coordinates);
  // console.log(subdiv);
  var geometricMeanCentroid = findGeometricMeanCentroid(
    geojsonData.coordinates
  );
  var medianCentroid = findMedianCentroid(geojsonData.coordinates);
  var minimumBoundingCentroid = findMinRectangleCentroid(
    geojsonData.coordinates
  );
  var datapoint = [
    nummer,
    water,
    selectedCoordsys,
    momentCentroid[0],
    momentCentroid[1],
    arithmeticMeanCentroid[0],
    arithmeticMeanCentroid[1],
    rootMeanSquareCentroid[0],
    rootMeanSquareCentroid[1],
    harmonicMeanCentroid[0],
    harmonicMeanCentroid[1],
    geometricMeanCentroid[0],
    geometricMeanCentroid[1],
    medianCentroid[0],
    medianCentroid[1],
    minimumBoundingCentroid[0],
    minimumBoundingCentroid[1],
  ];
  return datapoint;
}

function arrayToCSV(data) {
  return data.map((row) => row.join(",")).join("\n");
}

async function processData() {
  for (var subdiv_type of all_subdivs) {
    for (var water_status of water_statuses) {
      if (water_status == true) {
        for (var coordsys of water_coordsys) {
          selectedCoordsys = coordsys;
          water = water_status;
          for (const subdiv of subdiv_type) {
            var datapoint = await create_datapoint(subdiv);
            data.push(datapoint);
          }
        }
      } else if (water_status == false) {
        for (var coordsys of no_water_coordsys) {
          selectedCoordsys = coordsys;
          water = water_status;
          for (const subdiv of subdiv_type) {
            var datapoint = await create_datapoint(subdiv);
            data.push(datapoint);
          }
        }
      }
    }
  }
  const csv = arrayToCSV(data);

  return new Promise((resolve, reject) => {
    fs.writeFile(`all_test_data_v6.csv`, csv, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

processData()
  .then(() => {
    console.log("CSV file saved successfully.");
  })
  .catch((err) => {
    console.error("Error writing CSV file:", err);
  });
