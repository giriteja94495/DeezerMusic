// Initialize butotn with users's prefered color
let searchText = document.getElementById("searchTxt");
let searchButton = document.getElementById("searchButton");
let para = document.getElementById("para");
let album = document.getElementById("album");
let singerName = document.getElementById("singerName");
let songName = document.getElementById("songName");
let songImage = document.getElementById("songImage");
let songLink = document.getElementById("songLink");
let songPreview = document.getElementById("songPreview");
var audio = document.getElementById('audio');
var songCardDiv = document.getElementById("songCard");
const container = document.getElementById('accordion');



// when user clicks on button , read the value of input 
searchButton.addEventListener("click", async () => {
  let text = searchText.value;
  console.log(text);
  para.innerHTML = "Loading...."
  searchSong(text);
  para.innerHTML = "";
}
);

// The body of this function will be executed as a content script inside the current page
async function searchSong(text) {
// call this APi with query params https://deezerdevs-deezer.p.rapidapi.com/search
 await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${text}`, {
  "method": "GET",
  "headers": 
    {
      'X-RapidAPI-Key': 'ba9d13f8a0msha430246fdc2cc99p1273d3jsndc0aa51b4742',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
})
.then(response => {
 response.json().then(okay => {


  okay.data.forEach(element => {
  const card = document.createElement('div');
  card.classList = 'card-body';
  const content = `
  <div class="card">
  <div class="card-header" id="heading-${element}">
    <h5 class="mb-0">
      <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${element}" aria-expanded="true" aria-controls="collapse-${element}">
    </button>
    </h5>
  </div>
  <div id="collapse-${element}" class="collapse show" aria-labelledby="heading-${element}" data-parent="#accordion">
    <div class="card-body">
     <div style="display:flex">
        <div style="width:45%">
          Album Name : <h4>${element.album.title}</h4>
          Song Name : <h5>${element.title}</h5>
          <img src="${element.album.cover_medium}" alt="">
        </div>
        <div style="margin-left:3%">
        Artist Name: <h5>${element.artist.name}</h5>
        <img src="${element.artist.picture_medium}" alt="">
        </div>
     </div>    

     <h5>
     <a href="${element.link}">
     Go to Song Link
     </a>
     </h5>
     <audio id="audio" controls>
     <source id="songPreview" src="${element.preview}" type="audio/mpeg">
    </audio>
      ...
    </div>
  </div>
</div>
`;
container.innerHTML += content;
});


  // data.array.forEach(element => {

    // var song = data.data[0];
    // console.log(song);
    // album.innerHTML = song.album.title;
    // singerName.innerHTML = song.artist.name;
    // songName.innerHTML = song.title;
    // songImage.src = song.album.cover_medium;
    // songLink.href = song.link;
    // songLink.innerHTML = song.link;
    // songPreview.src = song.preview;
  // });

  // audio.load();
  // audio.play(); //call this to play the song right away
  });
  // audio.load(); //call this to just preload the audio without playing
}
)
.catch(err => {
  console.error(err);
}
);


}






