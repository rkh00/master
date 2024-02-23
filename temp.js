fetch(
  "https://nedlasting.geonorge.no/api/capabilities/041f1e6e-bdbc-4091-b48f-8a5990f3cc5b"
)
  .then((response) => response.json())
  .then((json) => console.log(json));
