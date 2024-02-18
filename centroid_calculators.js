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
