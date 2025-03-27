//static list for testing
let urllist = ['c2M-rlkkT5o','btdLnB9PXuY','-dUiRtJ8ot0','K1a2Bk8NrYQ','lCBnO60kBGc',
    'oqSYljRYDEM','-bt_y4Loofg','SMQc4umq3gg','vWq-pbBRPUg','v-rxiEEM7BY','K3m-VeDSoUo',
    'I7muKz0hVKQ','eN9XX-dd0LQ','4iNqAhCtbmQ','O3XUQ1xKZb0','d7jbfeL-em8','14Rd_h9V4tQ'
];

// let ind = Math.floor(Math.random()*urllist.length);
let submit = document.getElementById("submit");
let vidData;

fetch('http://localhost:8080/api/geturl')
    .then(response => response.json())
    .then(data => {
        vidData = data;
        let playerelem = document.getElementById('vidplayer');
        playerelem.src = "https://www.youtube.com/embed/" + data.url;
    })
  .catch(error => console.error("Error fetching data:", error));
// console.log(urllist[ind]);

submit.onclick = () => {
    console.log(rating);
    vidData.rating = (vidData.rating*vidData.ratings+rating)/(vidData.ratings+1);
    vidData.ratings++;
    //patch method used here
    fetch("http://localhost:8080/api/submitrating", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vidData)
    })
    .then(data => console.log("Updated data:", data))
    .catch(error => console.error("Error:", error));

    setTimeout(() => {
        location.reload();
    }, 1500);
    

}

let reloadButton = document.getElementById("reload");

reloadButton.onclick = () => {
    location.reload();
}

let searchButton = document.getElementById("search");
searchButton.onclick = () => {
    let query = document.getElementById("searchbar").value;
    console.log(query);
    let furl = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyBKlKixXFiFUO3RkzUuK-abJZNU6jkhBMQ&part=id&type=video&q=${query}&maxResults=5&type=video`;
    fetch(furl)
    .then(response => response.json())
    .then(data => {
        //console.log(data.items[0].id.videoId);
        let playerelem = document.getElementById('vidplayer');
        for(let i =0;i<5;i++){
            if(data.items[i].id.kind=="youtube#video"){
                playerelem.src = "https://www.youtube.com/embed/" + data.items[i].id.videoId;
                //to do - show rating if it exists, otherwise show it as unrated
                break;
            }
        }
        console.log(data);
    })
  .catch(error => console.error("Error fetching data:", error));
}

//to do - implement feature so that avg rating and no of reviews can be seen by user, also insert searched video if user rates it
