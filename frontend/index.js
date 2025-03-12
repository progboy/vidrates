let star1 = document.getElementById("star1");
star1.onclick = function(){
    console.log(star1.src);
    if(star1.src.includes("unshaded")){
        star1.src="./images/star_shaded.png";
    }else{
        star1.src="./images/star_unshaded.png";
    }
};