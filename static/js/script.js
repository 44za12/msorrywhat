let names = [];
let namesElement = document.getElementById("names");
let name = document.getElementById("name");
const ctrl = new anycontrol();
var baseurl =
  "https://cors-anywhere.herokuapp.com/https://maker.ifttt.com/trigger/query_mentioned/with/key/";
function stop() {
  ctrl.stop();
}
function start() {
  if (!ctrl.recognizing) {
    ctrl.start();
  }
}
function sendRequest(value) {
  let iftttkey = document.getElementById("iftttkey").value.trim();
  let url = baseurl + iftttkey;
  console.log(url);
  let data = `{"value1": "${value}" }`;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  };

  xhr.send(data);
}
function addToController() {
  var newName = name.value.trim();
  if (newName) {
    names.push(newName);
    for (var i = 0, n; (n = names[i]); i++) {
      var liElement = document.createElement("li");
      liElement.innerText = n;
      liElement.className = "list-group-item";
    }
    namesElement.appendChild(liElement);
    ctrl.addCommand(newName.toLowerCase(), function () {
      sendRequest(newName);
      alert(newName);
    });
  }
  name.value = "";
}
