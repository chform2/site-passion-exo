window.onload = function(e){

    /* data-links */
    var allLinks=document.querySelectorAll("[data-href]");
    for(i=0;i<allLinks.length;i++){
        allLinks[i].addEventListener("click",function(e){
            window.open(this.getAttribute("data-href"),'_blank');
        });
    }

    /* darkmode btn  */
    document.querySelector("input[type=checkbox].darkMod").addEventListener("click", function(e){
        document.querySelector("body").classList.remove("custom");
        document.querySelector("body").classList.toggle("dark"); // toggle class
        // animation: sun on
        if(!this.checked){
            document.querySelector(".fa-sun").animate([
                { transform: 'rotate(360deg)' }

            ], {
                duration: 1000

            });
        }
        // animation: moon on
        if(this.checked){
            document.querySelector(".fa-moon").animate([
                { transform: 'translate(3px, 3px)'},
                { transform: 'rotate(5deg)' }


            ], {
                duration: 1000
            });
        }
    });
}

/* navbar position on scroll */
window.addEventListener("scroll", function(e){
    var rectHeader = document.querySelector("header").getBoundingClientRect(); // geometric coordinates o the header
    var nav = document.querySelector("nav");  // def ovject navbar
    // change navbar style about header position in the DOM 
    if(rectHeader.top<0){ 
        nav.style.position="fixed";
        nav.style.top="0px";
    }else{
        nav.style.position="relative";
        nav.style.top="";   
    }
});


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16);
}

function invertColor(hex,add=0){
    var rgb = hexToRgb(hex);
    var arr_rgb = rgb.split(",");
    var r = parseInt(arr_rgb[0])+127+add;
    var g = parseInt(arr_rgb[1])+127+add;
    var b = parseInt(arr_rgb[2])+127+add;

    var r = (r>255) ? parseInt(r%255) : r; // if r > 255
    var g = (g>255) ? parseInt(g%255) : g; // if r > 255
    var b = (b>255) ? parseInt(g%255) : b; // if b > 255
    return r + "," + g + "," + b;
}

document.querySelector(".input-color").addEventListener("change", function(e){
   //console.log(hexToRgb(this.value));
   document.querySelector("body").classList.remove("dark");
   document.querySelector("body").classList.add("custom");
   document.querySelector("style#custom").innerHTML = `
   body.custom{
        --police-color: rgb(${hexToRgb(this.value)}) !important;
        --bg-color: rgb(${invertColor(this.value)}) !important;
        --contrast: rgb(${invertColor(this.value)}) !important;
        --contrast-reverse: rgb(${hexToRgb(this.value)}) !important;
        --bg-contact:rgb(${invertColor(this.value,20)}) !important;
        --text-muted:rgb(${invertColor(this.value,45)}) !important;
        --bg-nav: rgb(${invertColor(this.value),50}) !important;
        --navlinks: rgb(${hexToRgb(this.value)}) !important;
    }
    body.custom nav{
        filter: contrast(1.75);
    }
    `;
});
