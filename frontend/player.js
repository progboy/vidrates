let urllist = ['c2M-rlkkT5o','btdLnB9PXuY','-dUiRtJ8ot0','K1a2Bk8NrYQ','lCBnO60kBGc',
    'oqSYljRYDEM','-bt_y4Loofg','SMQc4umq3gg','vWq-pbBRPUg','v-rxiEEM7BY','K3m-VeDSoUo',
    'I7muKz0hVKQ','eN9XX-dd0LQ','4iNqAhCtbmQ','O3XUQ1xKZb0','d7jbfeL-em8','14Rd_h9V4tQ'
];
let ind = Math.floor(Math.random()*urllist.length);

// console.log(urllist[ind]);

let playerelem = document.getElementById('vidplayer');
playerelem.src = "https://www.youtube.com/embed/" + urllist[ind];