let backgroundoption = true;
//variable to control the interval
let backgroundInterval;
// Check if there,s local storage random background image
let backgroundLocalitem = localStorage.getItem('background-option');
// Check if random background storage empty
if(backgroundLocalitem !== null){
    if(backgroundLocalitem === 'true'){
        backgroundoption = true
    }else{ backgroundoption = false}
    // Remove active class fro all spans
    document.querySelectorAll('.random-backgrounds span').forEach(element =>{
        element.classList.remove('active');
    });
    if(backgroundLocalitem === 'true'){
        document.querySelector('.random-backgrounds .yes').classList.add("active");}
        else{document.querySelector('.random-backgrounds .no').classList.add("active");}
// Selecting landingpage element
// Check local color option
let maincolor = localStorage.getItem('color-option');
if(maincolor !== null){
    document.documentElement.style.setProperty('--main-color',  maincolor)
    // Remove active color from data
    document.querySelectorAll('.color-list li').forEach(Element => {
        Element.classList.remove('active');
        if(Element.dataset.color === maincolor){
            Element.classList.add('active');
        }
    })
}
}
// Selecting landingpage element
let landpage = document.querySelector('.landingpage');
// Get array of images
let imgarray = ["img1.jpg","img2.jpg","img4.jpg","img5.jpg"];
// Function to randomize background
function randomizeimg(){
    if(backgroundoption === true){
        backgroundInterval = setInterval(() => {
            // Get random number
      let randomnumber = Math.floor(Math.random() * imgarray.length);
          // Change background image URL
landpage.style.backgroundImage = 'url("img/'+ imgarray[randomnumber] + '")' ;
},4000)
    }
}
// Toggle spin on icon
document.querySelector('.toggle-settings .fa-cogs ').onclick = function(){
    this.classList.toggle('fa-spin');
    document.querySelector('.setting-box').classList.toggle('open')}
// Switch colors
const colorli = document.querySelectorAll('.color-list li');
colorli.forEach(li => {
    li.addEventListener('click', (e)=>{

        console.log(e.target.dataset.color)
        // Set color to root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        // Set color to local storage
        localStorage.setItem('color-option', e.target.dataset.color)
        // Remove active class from all siblingd

        handleactive(e);
    });

});    

// Switch background options
const randombackEl = document.querySelectorAll('.random-backgrounds span');
randombackEl.forEach(span => {
    span.addEventListener('click', (e)=>{

        // Remove active class from all spans

        handleactive(e);
        if(e.target.dataset.background === 'yes'){
            backgroundoption = true;
            randomizeimg();
            localStorage.setItem('background-option',true)
        }else{
            backgroundoption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background-option',false)
        }
    });
});    
// Skills selector
let ourskills = document.querySelector('.skills');
window.onscroll = function(){
    // Skills offset top
    let skillsoffsetTop = ourskills.offsetTop;
    // Skills outer height
    let skillsouterheight = ourskills.offsetHeight;;
    // Window height
    let windowheight = this.innerHeight;
    // Window scroll top
    let windowscrolltop = this.pageYOffset;
    if( windowscrolltop >= 870 ){
            let allskills = document.querySelectorAll('.skill-box .skill-progress span')
            allskills.forEach(skill => {
        skill.style.width = skill.dataset.progress;
        });
    }
};
// Create popup image
let ourgallary = document.querySelectorAll('.gallary img')
ourgallary.forEach(img => {
    img.addEventListener('click',(e) =>{
        //create overlay element
        let overlay = document.createElement('div');
        //Add class to overlay
        overlay.className = 'popup-overlay';
        // Append overlay 
        document.body.appendChild(overlay);
        // Create popup
        let popupbox = document.createElement('div');
        // Add class to popupbox
        popupbox.className = 'popup-box';
        // Heading
        if(img.alt !== null){
            // Create heading
            let imgheading = document.createElement('h3');
            // Create text for heading
            let imgtext = document.createTextNode(img.alt);
            // Append the text to heading
            imgheading.appendChild(imgtext);
            // Append heading to popup box 
            popupbox.appendChild(imgheading);
        }
        // Create the image
        let popupimage = document.createElement('img');
        // Set image source 
        popupimage.src = img.src;
        // Add image to popup box
        popupbox.appendChild(popupimage);
        // Append popup box to body
        document.body.appendChild(popupbox);
        // Create the close span
        let closebttn = document.createElement('span');
        // Create the close bttn text
        let closebttntext = document.createTextNode('X');
        // Append text to close bttn
        closebttn.appendChild(closebttntext);
        // Add calls to alose bttn
        closebttn.className = 'close-button';
        // Add close bttn to popup-box
        popupbox.appendChild(closebttn);
    });
});
// Close popup
document.addEventListener('click',function(e){
    if(e.target.className == 'close-button'){
        // Remove the currnet popup
        e.target.parentNode.remove();
        // Remove Overlay
        document.querySelector('.popup-overlay').remove();
    }
})
// Select all bullets
const allbullets = document.querySelectorAll('.nav-bullets .bullet')

// Select all links
const alllinks = document.querySelectorAll('.links a')

function scrollsomewhere(elements){
    elements.forEach(ele => {
        ele.addEventListener('click',(e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            })
        })
    })
}
scrollsomewhere(allbullets)
scrollsomewhere(alllinks) 
// Handle active status
function handleactive(e){
    e.target.parentElement.querySelectorAll('.active').forEach(Element => {

        Element.classList.remove('active');
    })
    e.target.classList.add('active');
}
// Bullets options
let bulletsspan = document.querySelectorAll('.bullets-options span');
let bulletscontainer = document.querySelector('.nav-bullets');
let bulletslocalitem = localStorage.getItem('bullets-options');
if (bulletslocalitem !== null){
    bulletsspan.forEach(span => {
        span.classList.remove('active');
    })
    if (bulletslocalitem === "block"){
        bulletscontainer.style.display = 'block';
        document.querySelector('.bullets-options .yes').classList.add('active');
    }else{
        bulletscontainer.style.display = 'none';
        document.querySelector('.bullets-options .no').classList.add('active');
    }
}
bulletsspan.forEach(span =>{
    span.addEventListener('click',(e) =>{
        if(span.dataset.display === 'show'){
            bulletscontainer.style.display = 'block';
            localStorage.setItem('bullets-options', "block");
        } else {
            bulletscontainer.style.display = 'none';
            localStorage.setItem('bullets-options', "none");
        }
        handleactive(e);
    })
})
// Reset button
document.querySelector('.reset-option').onclick = function(){
    localStorage.removeItem('bullets-options')
    localStorage.removeItem('color-option')
    localStorage.removeItem('background-option')
    // Reload window
    window.location.reload();
}
// Toggle menu
let togglebttn = document.querySelector('.toggle-menu');
let tlinks = document.querySelector('.links');
let overbb = document.querySelector('.over-lay')
togglebttn.onclick = function(){
    this.classList.toggle('menu-active');
    tlinks.classList.toggle('open'); 
}
overbb.onclick = function() {
    togglebttn.classList.remove('menu-active');
    tlinks.classList.remove('open'); 
}
// Click anywhere outside to remove menu
//document.addEventListener('click',(e)=>{
    // if(e.target !== togglebttn && e.target !== tlinks){
    //     // Check if menu open
    //     if(tlinks.classList.contains('open')){
    //         togglebttn.classList.toggle('menu-active');
    //         tlinks.classList.toggle('open'); 
    //     }
    //} 
//})
// To stop propagation on menu
// tlinks.onclick = function(e){
//     e.stoppropagation();
// }