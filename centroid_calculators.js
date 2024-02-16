function findMomentCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
}

function findAreaCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
}

function findArithmeticMeanCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
}

function findRootMeanSquareCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
}

function findHarmonicMeanCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
}

function findGeometricMeanCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
}

function findMedianCentroid(coordinateArray) {
  console.log("Not implemented yet!");
  return;
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
