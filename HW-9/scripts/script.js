$(document).ready(function () {
  i = 1;
  item = "none";
  $("body").colorfy();
  $("button").click(function () {
    $("#berryInfo").load("https://pokeapi.co/api/v2/berry/" + i + "/", function (responseText) {
      var berry = JSON.parse(responseText);
      item = berry.item.url;
      $("#berryInfo").colorfy().html("Berry Name: " + berry.name + "<br>This berry grows to full size after " + berry.growth_time + " days." + "<br>This berry's maximum harvest amount is: " + berry.max_harvest + "<br>It has a smoothness of " + berry.smoothness + " and is " + berry.firmness.name + " to the touch.");
      console.log(item);

      console.log(item);
      // Second API call
      $("#image").load(item, function (responseText) { // The "item" portion in this is me trying to call the item variable which should have the url from the api for the last berry's "item" field.
        var image = JSON.parse(responseText);
        console.log(image);
        $("#image").attr("src",image.sprites.default);
      });

    });

    $("button").html("Click here to see the next berry's info!");

    if (i <= 63) {
      i++;
    } else if (i > 63) {
      i = 1;
    }


  });
});

$.fn.colorfy = function () {
  var r = (Math.floor(Math.random() * 100) + 155);
  var g = (Math.floor(Math.random() * 100) + 155);
  var b = (Math.floor(Math.random() * 100) + 155);
  var itsColor = r + ", " + g + ", " + b;
  console.log(itsColor);
  this.css("color", "rgb(" + itsColor + ")");
  var r = Math.floor(Math.random() * 155);
  var g = Math.floor(Math.random() * 155);
  var b = Math.floor(Math.random() * 155);
  var itsColor = r + ", " + g + ", " + b;
  this.css("background-color", "rgb(" + itsColor + ")");
  return this;
};
