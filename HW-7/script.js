// ====================
// Define Array & Count
// ====================

var photoArray = new Array();
var count = 0;
var last = 0;


// ======================
// Create the Photo Class
// ======================

class Photo {
  constructor (image, title, author, date, description) {
    this.image = image;
    this.title = title;
    this.author = author;
    this.date = date;
    this.description = description;
  }

// ============================
// Set up the toString function
// ============================

  toString() {
    let str;
    str = `This image is authored by ${this.author}, published on ${this.date}, and is aptly titled: "${this.title}". ${this.description}`;
    return str;
  }

  get theLink() {
    return this.image;
  }

  get theTitle() {
    return this.title;
  }

  get theAuthor() {
    return this.author;
  }

  get theDescription() {
    return this.name;
  }
}

function createPhotos() {
    var myPhoto = new Photo('images/alpinepath.jpg', 'Mountain Digital Wallpaper','Eberhard Grossgasteiger','7/3/2017',"A calming image of a beautiful alpine path. Aren't the colors fantastic?");
    var myPhoto1 = new Photo('images/brownpath.jpg', 'Brown Path Surrounded by Green Pine Trees','Pixabay','12/24/2016',"A beautiful mountain path surrounded by green pine trees. They really could have been more creative with the title.");
    var myPhoto2 = new Photo('images/greenlake.jpg', 'Brown Wooden Dock Near Brown Wooden Kayak in Water','Krivec Ales','8/5/2017',"A lush scene of a mountaintop lake and dockhouse. The colors make you pine for a dip in the water.");
    var myPhoto3 = new Photo('images/mountainpeak.jpg', 'Aerial View of Mountain With Snow','Trixiella Lichtenberg','11/1/2017',"A high mountaintop photograph, capturing the beauty of the heights. Breathtaking composition and feel.");
    var myPhoto4 = new Photo('images/personmountain.jpg', 'Person on Top of Snow Covered Mountain Under Clear Blue Sky','Flo Maderebner','12/19/2017',"A person standing triumphantly atop a mountain, looking out over the range. It's almost like you can feel the cold.");

    photoArray.push(myPhoto);
    photoArray.push(myPhoto1);
    photoArray.push(myPhoto2);
    photoArray.push(myPhoto3);
    photoArray.push(myPhoto4);
}

function showNew() {
  var photo = photoArray[count];
  if (last == photo.title) {
    count = Math.floor(Math.random()*photoArray.length);
    photo = photoArray[count];
  }
  else {
    console.log(photo.toString());
    document.getElementById("imgLink").src = photo.image;
    document.getElementById("imgTitle").innerHTML = "Title: " + photo.title;
    document.getElementById("imgAuthor").innerHTML = "Author: " + photo.author;
    document.getElementById("imgDate").innerHTML = "Publish Date: " + photo.date;
    document.getElementById("imgDescription").innerHTML = photo.description;
    last = photo.title;
    count = Math.floor(Math.random()*photoArray.length);
  }
}
