// Initiate the wowjs
new WOW().init();


const menuBtn = document.querySelector('.menu-icon')
const navlinks = document.querySelector('.nav-link')

menuBtn.addEventListener('click',()=>{
    navlinks.classList.toggle('mobile-menu')
})