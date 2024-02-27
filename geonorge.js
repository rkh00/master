// function httpGet(theUrl) {
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open("GET", theUrl, false); // false for synchronous request
//   xmlHttp.send(null);
//   return xmlHttp.responseText;
// }

function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://nedlasting.geonorge.no/api/capabilities/041f1e6e-bdbc-4091-b48f-8a5990f3cc5b"
  );
  xhr.responseType = "json";
  xhr.onload = () => {
    data = xhr.response;
    console.log(data);
    // resolve(xhr.response);
  };
  xhr.send();
}
