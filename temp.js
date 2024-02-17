function findAreaCentroid(coordinateArray) {
  // Calculate the area of the MultiPolygon
  const totalArea = turf.area(geojsonData);

  var longs = [];
  var lats = [];

  coordinateArray.forEach((polygon) => {
    polygon[0].forEach((coordinate) => {
      longs.push(coordinate[0]);
      lats.push(coordinate[1]);
    });
  });

  longs.sort();
  lats.sort();

  // Get the coordinates of the MultiPolygon
  //   const coordinates = geojsonData.coordinates[0][0]; // Assuming exterior ring is first

  // Initialize variables to store the best longitude divider and the minimum difference in areas
  var bestLongDivider;
  var bestLatDivider;
  var minAreaDiff = Infinity;
  var westernArea = 0;
  var southernArea = 0;
  const tol = 10 ^ -6;

  // Iterate through each point of the MultiPolygon
  for (let i = 0; i < longs.length; i++) {
    const point = longs[i];
    const prevPoint = longs[i - 1];

    // Create a LineString at the calculated longitude
    const line = turf.lineString([
      [point[0], -90],
      [point[0], 90],
    ]);

    // Split the MultiPolygon using the LineString
    const split = turf.lineSplit(geojsonData, line);

    // Calculate the areas of the resulting polygons
    const area1 = turf.area(split.features[0]);
    const area2 = turf.area(split.features[1]);

    // Calculate the difference in areas
    const areaDiff = Math.abs(area1 - area2);

    // Update the best divider if the difference is smaller
    if (areaDiff < minAreaDiff) {
      minAreaDiff = areaDiff;
      bestLongDivider = line;
      westernArea = area1;
    }

    // If the western area exceeds the eastern area, perform binary search
    if (westernArea > totalArea / 2) {
      let low = point[0];
      let high = prevPoint[0];
      while (Math.abs(high - low) > tol) {
        // tolerance level for longitude
        const mid = (low + high) / 2;
        const midLine = turf.lineString([
          [mid, -90],
          [mid, 90],
        ]);
        const split = turf.lineSplit(geojsonData, midLine);
        const area1 = turf.area(split.features[0]);
        const area2 = turf.area(split.features[1]);
        if (Math.abs(area1 - area2) < minAreaDiff) {
          minAreaDiff = Math.abs(area1 - area2);
          bestLongDivider = midLine;
          westernArea = area1;
        }
        if (area1 < area2) {
          low = mid;
        } else {
          high = mid;
        }
      }
      break;
    }
  }

  for (let i = 0; i < lats.length; i++) {
    const point = lats[i];
    const prevPoint = lats[i - 1];

    // Create a LineString at the calculated longitude
    const line = turf.lineString([
      [point[0], -180],
      [point[0], 180],
    ]);

    // Split the MultiPolygon using the LineString
    const split = turf.lineSplit(geojsonData, line);

    // Calculate the areas of the resulting polygons
    const area1 = turf.area(split.features[0]);
    const area2 = turf.area(split.features[1]);

    // Calculate the difference in areas
    const areaDiff = Math.abs(area1 - area2);

    // Update the best divider if the difference is smaller
    if (areaDiff < minAreaDiff) {
      minAreaDiff = areaDiff;
      bestLongDivider = line;
      westernArea = area1;
    }

    // If the western area exceeds the eastern area, perform binary search
    if (southernArea > totalArea / 2) {
      let low = point[0];
      let high = prevPoint[0];
      while (Math.abs(high - low) > tol) {
        // tolerance level for longitude
        const mid = (low + high) / 2;
        const midLine = turf.lineString([
          [mid, -180],
          [mid, 180],
        ]);
        const split = turf.lineSplit(geojsonData, midLine);
        const area1 = turf.area(split.features[0]);
        const area2 = turf.area(split.features[1]);
        if (Math.abs(area1 - area2) < minAreaDiff) {
          minAreaDiff = Math.abs(area1 - area2);
          bestLongDivider = midLine;
          southernArea = area1;
        }
        if (area1 < area2) {
          low = mid;
        } else {
          high = mid;
        }
      }
      break;
    }
  }

  return [bestLongDivider, bestLatDivider];
}
