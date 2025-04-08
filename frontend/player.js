//static list for testing
let urllist = ['c2M-rlkkT5o','btdLnB9PXuY','-dUiRtJ8ot0','K1a2Bk8NrYQ','lCBnO60kBGc',
    'oqSYljRYDEM','-bt_y4Loofg','SMQc4umq3gg','vWq-pbBRPUg','v-rxiEEM7BY','K3m-VeDSoUo',
    'I7muKz0hVKQ','eN9XX-dd0LQ','4iNqAhCtbmQ','O3XUQ1xKZb0','d7jbfeL-em8','14Rd_h9V4tQ'
];

// let ind = Math.floor(Math.random()*urllist.length);
let submit = document.getElementById("submit");
let comment = document.getElementById("post-login-input")
let vidData;

function setVidData(vidrating,reviews,vidurl){
    vidData.rating= vidrating;
    vidData.url=vidurl;
    vidData.ratings = reviews;
    return vidData;
}

fetch('/api/geturl')
    .then(response => response.json())
    .then(data => {
        vidData = data;
        let playerelem = document.getElementById('vidplayer');
        let ratingDisp = document.getElementById('avg-rating');
        let reviewDisp = document.getElementById('reviews-count');
        playerelem.src = "https://www.youtube.com/embed/" + data.url;
        ratingDisp.innerText = data.rating.toFixed(2);
        reviewDisp.innerText = data.ratings;
    })
  .catch(error => console.error("Error fetching data:", error));
// console.log(urllist[ind]);

submit.onclick = () => {
    //console.log(rating);

    //check if user has logged in and attempted to post comment on youtube or not
    vidData.url = document.getElementById('vidplayer').src.slice(30);
    if(comment.display!=='none' && comment.firstElementChild.value.trim() !== ''){
        fetch('./token.json') // Relative to the site root
        .then(response => response.json())
        .then(data => {
            //console.log("Token:", data);
            fetch("https://www.googleapis.com/youtube/v3/commentThreads?part=snippet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${data}`
                },
                body: JSON.stringify({
                    snippet: {
                      videoId: vidData.url,
                      topLevelComment: {
                        snippet: {
                          textOriginal: comment.firstElementChild.value.trim()
                        }
                      }
                    }
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("comment posted")
            })
            .catch(error => {
                console.error("Error posting comment:", error);
                alert("An error occurred while posting the comment.",error);
            });
        }).catch(err => console.error('Error loading JSON:', err));
        
    }

    vidData.rating = parseFloat(document.getElementById('avg-rating').innerText);
    vidData.ratings = parseInt(document.getElementById('reviews-count').innerText);

    vidData.rating = (vidData.rating*vidData.ratings+rating)/(vidData.ratings+1);
    vidData.ratings++;
    //console.log("vidData after clicking submit" , vidData);
    //patch method used here
    fetch("/api/submitrating", {
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
    //console.log(query);
    fetch('/api/getkey').then(response => response.json())
    .then(data => {
        let furl = `https://www.googleapis.com/youtube/v3/search?key=${data.key}&part=id&type=video&q=${query}&maxResults=5&type=video`;
    fetch(furl)
    .then(response => response.json())
    .then(data => {
        //console.log(data.items[0].id.videoId);
        let playerelem = document.getElementById('vidplayer');
        for(let i =0;i<5;i++){
            if(data.items[i].id.kind=="youtube#video"){
                playerelem.src = "https://www.youtube.com/embed/" + data.items[i].id.videoId;
                //to do - show rating if it exists, otherwise show it as unrated
                fetch(`/api/findvid/:${data.items[i].id.videoId}`).then(response => response.json()).then(data => {
                    let ratingDisp = document.getElementById('avg-rating');
                    let reviewDisp = document.getElementById('reviews-count');
                    //console.log(data, {});
                    if(Object.keys(data).length>0){
                        vidData = data;
                        ratingDisp.innerText = data.rating.toFixed(2);
                        reviewDisp.innerText = data.ratings;
                    }else{
                        ratingDisp.innerText = 0;
                        reviewDisp.innerText = 0;
                    }
                })
                .catch((err) => {
                    //console.error(err)
                });
                break;
            }
        }
        //console.log(data);
    })
  .catch(error => console.error("Error fetching data:", error));
    })
    .catch(error => console.error("error fetching api key =>", error))
}
