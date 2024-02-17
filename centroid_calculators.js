function findMomentCentroid(coordinateArray, leafletPolygonCenter) {
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

  const centroidX = xSum / (6 * area); // Calculate centroid's x-coordinate
  const centroidY = ySum / (6 * area); // Calculate centroid's y-coordinate

  return [centroidX, centroidY];
}

function findAreaCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
  // // Calculate the area of the MultiPolygon
  // const totalArea = turf.area(geojsonData);

  // var longs = [];
  // var lats = [];

  // coordinateArray.forEach((polygon) => {
  //   polygon[0].forEach((coordinate) => {
  //     longs.push(coordinate[0]);
  //     lats.push(coordinate[1]);
  //   });
  // });

  // longs.sort();
  // lats.sort();

  // // Get the coordinates of the MultiPolygon
  // //   const coordinates = geojsonData.coordinates[0][0]; // Assuming exterior ring is first

  // // Initialize variables to store the best longitude divider and the minimum difference in areas
  // var bestLongDivider;
  // var bestLatDivider;
  // var minAreaDiff = Infinity;
  // var westernArea = 0;
  // var southernArea = 0;
  // const tol = 10 ^ -6;

  // // Iterate through each point of the MultiPolygon
  // for (let i = 0; i < longs.length; i++) {
  //   const point = longs[i];
  //   const prevPoint = longs[i - 1];

  //   // prettier-ignore
  //   const line = {
  //     "type": "LineString",
  //     "coordinates": [
  //       [point[0], -90],
  //       [point[0], 90]
  //     ]
  //   }

  //   console.log(line);

  //   // Split the MultiPolygon using the LineString
  //   const split = turf.lineSplit(geojsonData, line);

  //   // Calculate the areas of the resulting polygons
  //   const area1 = turf.area(split.features[0]);
  //   const area2 = turf.area(split.features[1]);

  //   // Calculate the difference in areas
  //   const areaDiff = Math.abs(area1 - area2);

  //   // Update the best divider if the difference is smaller
  //   if (areaDiff < minAreaDiff) {
  //     minAreaDiff = areaDiff;
  //     bestLongDivider = line;
  //     westernArea = area1;
  //   }

  //   // If the western area exceeds the eastern area, perform binary search
  //   if (westernArea > totalArea / 2) {
  //     let low = point[0];
  //     let high = prevPoint[0];
  //     while (Math.abs(high - low) > tol) {
  //       // tolerance level for longitude
  //       const mid = (low + high) / 2;
  //       // prettier-ignore
  //       const midLine = {
  //         "type": "LineString",
  //         "coordinates": [
  //           [mid, -90],
  //           [mid, 90]
  //         ]};
  //       const split = turf.lineSplit(geojsonData, midLine);
  //       const area1 = turf.area(split.features[0]);
  //       const area2 = turf.area(split.features[1]);
  //       if (Math.abs(area1 - area2) < minAreaDiff) {
  //         minAreaDiff = Math.abs(area1 - area2);
  //         bestLongDivider = midLine;
  //         westernArea = area1;
  //       }
  //       if (area1 < area2) {
  //         low = mid;
  //       } else {
  //         high = mid;
  //       }
  //     }
  //     break;
  //   }
  // }

  // for (let i = 0; i < lats.length; i++) {
  //   const point = lats[i];
  //   const prevPoint = lats[i - 1];

  //   // prettier-ignore
  //   const line = {
  //     "type": "LineString",
  //     "coordinates": [
  //       [point[0], -180],
  //       [point[0], 180]
  //     ]
  //   }

  //   // Split the MultiPolygon using the LineString
  //   const split = turf.lineSplit(geojsonData, line);

  //   // Calculate the areas of the resulting polygons
  //   const area1 = turf.area(split.features[0]);
  //   const area2 = turf.area(split.features[1]);

  //   // Calculate the difference in areas
  //   const areaDiff = Math.abs(area1 - area2);

  //   // Update the best divider if the difference is smaller
  //   if (areaDiff < minAreaDiff) {
  //     minAreaDiff = areaDiff;
  //     bestLongDivider = line;
  //     westernArea = area1;
  //   }

  //   // If the western area exceeds the eastern area, perform binary search
  //   if (southernArea > totalArea / 2) {
  //     let low = point[0];
  //     let high = prevPoint[0];
  //     while (Math.abs(high - low) > tol) {
  //       // tolerance level for longitude
  //       const mid = (low + high) / 2;
  //       // prettier-ignore
  //       const midLine = {
  //         "type": "LineString",
  //         "coordinates": [
  //           [mid, -180],
  //           [mid, 180]
  //         ]};
  //       const split = turf.lineSplit(geojsonData, midLine);
  //       const area1 = turf.area(split.features[0]);
  //       const area2 = turf.area(split.features[1]);
  //       if (Math.abs(area1 - area2) < minAreaDiff) {
  //         minAreaDiff = Math.abs(area1 - area2);
  //         bestLongDivider = midLine;
  //         southernArea = area1;
  //       }
  //       if (area1 < area2) {
  //         low = mid;
  //       } else {
  //         high = mid;
  //       }
  //     }
  //     break;
  //   }
  // }

  // return [bestLongDivider, bestLatDivider];
}

// function findAreaCentroid(coordinateArray) {
//   const tol = 10 ^ -3;

//   console.log("Not implemented yet!");
//   var longs = [];
//   var lats = [];

//   coordinateArray.forEach((polygon) => {
//     polygon[0].forEach((coordinate) => {
//       longs.push(coordinate[0]);
//       lats.push(coordinate[1]);
//     });
//   });

//   longs.sort();
//   lats.sort();

//   var longDividingLine;
//   var latDividingLine;

//   for (let i = 0; i < longs.length; i++) {
//     const lineString = {
//       "type": "LineString",
//       "coordinates": [[long, 90], [long, -90]]
//     };

//     const intersection = turf.lineIntersect(geojsonData, lineString);

//     const splitMultiPolygons = turf.split(geojsonData, intersection);

//     const firstMultiPolygon = splitMultiPolygons.features[0];
//     const secondMultiPolygon = splitMultiPolygons.features[1];

//     const firstMultiPolygonArea = 0;
//     const secondMultiPolygonArea = 0;

//     firstMultiPolygon.coordinates.forEach((polygonCoords) => {
//       const polygon = turf.polygon(polygonCoords);
//       const area = turf.area(polygon);
//       firstMultiPolygonArea += area;
//     });

//     secondMultiPolygon.coordinates.forEach((polygonCoords) => {
//       const polygon = turf.polygon(polygonCoords);
//       const area = turf.area(polygon);
//       secondMultiPolygonArea += area;
//     });

//     if (Math.abs(firstMultiPolygonArea - secondMultiPolygonArea) < tol) {
//       longDividingLine = lineString;
//       break;
//     } else if () {

//     }
//   }

//   longs.forEach((long) => {
//     //prettier-ignore
//     const lineString = {
//       "type": "LineString",
//       "coordinates": [[long, 90], [long, -90]]
//     };

//     const intersection = turf.lineIntersect(geojsonData, lineString);

//     const splitMultiPolygons = turf.split(geojsonData, intersection);

//     const firstMultiPolygon = splitMultiPolygons.features[0];
//     const secondMultiPolygon = splitMultiPolygons.features[1];

//     const firstMultiPolygonArea = 0;
//     const secondMultiPolygonArea = 0;

//     firstMultiPolygon.coordinates.forEach((polygonCoords) => {
//       const polygon = turf.polygon(polygonCoords);
//       const area = turf.area(polygon);
//       firstMultiPolygonArea += area;
//     });

//     secondMultiPolygon.coordinates.forEach((polygonCoords) => {
//       const polygon = turf.polygon(polygonCoords);
//       const area = turf.area(polygon);
//       secondMultiPolygonArea += area;
//     });

//     if (Math.abs(firstMultiPolygonArea - secondMultiPolygonArea) < tol) {
//       longDividingLine = lineString;
//       break;
//     }

//     // firstMultiPolygon.forEach((polygon) => {
//     //   for (let i = 0; i < numPoints - 1; i++) {
//     //     const xi = polygon[0][i][0];
//     //     const yi = polygon[0][i][1];
//     //     const xiPlus1 = polygon[0][i + 1][0];
//     //     const yiPlus1 = polygon[0][i + 1][1];

//     //     const ai = xi * yiPlus1 - xiPlus1 * yi; // Cross-product to calculate the area of the triangle
//     //     FirstMultiPolygonArea += ai;
//     //   }
//     // });
//   });

//   return;
// }

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

  centroidX = totLong / n;
  centroidY = totLat / n;

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

  centroidX = Math.sqrt(totLong / n);
  centroidY = Math.sqrt(totLat / n);

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

  centroidX = 1 / (totLong / n);
  centroidY = 1 / (totLat / n);

  return [centroidX, centroidY];
}

function findGeometricMeanCentroid(coordinateArray) {
  var n = 0;
  var totLong = 0;
  var totLat = 0;

  coordinateArray.forEach((polygon) => {
    n += polygon[0].length;
    polygon[0].forEach((coordinate) => {
      totLong += Math.log(coordinate[0]);
      totLat += Math.log(coordinate[1]);
    });
  });

  centroidX = Math.exp(totLong / n);
  centroidY = Math.exp(totLat / n);

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
    centroidX = (longs[n / 2] + longs[n / 2 + 1]) / 2;
    centroidY = (lats[n / 2] + lats[n / 2 + 1]) / 2;
  } else {
    centroidX = longs[(n + 1) / 2];
    centroidY = lats[(n + 1) / 2];
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
