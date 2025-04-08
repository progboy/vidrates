let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let star4 = document.getElementById("star4");
let star5 = document.getElementById("star5");

let rating = 0;
let loginStatus;

function setStar(star){
    star.src = "./images/star_shaded.png";
}
function unsetStar(star){
    star.src = "./images/star_unshaded.png";
}
star1.onclick = function(){
    rating = 1;
    console.log(rating);
    setStar(star1);
    unsetStar(star2);
    unsetStar(star3);
    unsetStar(star4);
    unsetStar(star5);
};
star2.onclick = function(){
    rating = 2;
    console.log(rating);
    setStar(star1);
    setStar(star2);
    unsetStar(star3);
    unsetStar(star4);
    unsetStar(star5);
};
star3.onclick = function(){
    rating = 3;
    console.log(rating);
    setStar(star1);
    setStar(star2);
    setStar(star3);
    unsetStar(star4);
    unsetStar(star5);
};
star4.onclick = function(){
    rating = 4;
    console.log(rating);
    setStar(star1);
    setStar(star2);
    setStar(star3);
    setStar(star4);
    unsetStar(star5);
};
star5.onclick = function(){
    rating = 5;
    console.log(rating);
    setStar(star1);
    setStar(star2);
    setStar(star3);
    setStar(star4);
    setStar(star5);
};

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const loginButton = document.querySelector('.login-btn');
    loginStatus = params.get('login');
  
    const inputSection = document.getElementById('post-login-input');
    if (loginStatus === 'success') {
      alert('Login successful!');
    const textarea = document.getElementById('user-input');

    loginButton.disabled = true;
    loginButton.style.pointerEvents = 'none';
    loginButton.style.opacity = '0.5';
    
    inputSection.style.display = 'block';

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // prevent newline
        const userText = textarea.value.trim();
        if (userText) {
          console.log("User submitted:", userText); // Or send to server
          textarea.value = '';
          alert("Submitted: " + userText);
        }
      }
    });
    } else if (loginStatus === 'failed') {
      alert('Login failed. Please try again.');
      inputSection.style.display = 'none';
    }else{
        //hide the text for writing comment
        inputSection.style.display = 'none';
    }
});
