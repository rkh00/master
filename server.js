async function getData() {
  try {
    const response = await fetch(
      "https://nedlasting.geonorge.no/api/capabilities/041f1e6e-bdbc-4091-b48f-8a5990f3cc5b"
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
