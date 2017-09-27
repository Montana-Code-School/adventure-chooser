document.getElementById("button").addEventListener("click", sendData);

function createObject() {
  var sentObject = {};
  sentObject.title = document.getElementById("title").value;
  sentObject.key = document.getElementById("key").value;
  sentObject.text = document.getElementById("text").value;
  console.log(sentObject);
  return sentObject;
}

function sendData() {
  $.ajax({
    url: "/cya",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(createObject()),
    dataType: "json"
  });
}
