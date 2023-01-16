const menuBtn = document.querySelector('.menu-icon')
const navlinks = document.querySelector('.nav-link')

menuBtn.addEventListener('click',()=>{
    navlinks.classList.toggle('mobile-menu')
})





const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);


const caro_usel = document.querySelector(".caro_usel"),
first_Img = caro_usel.querySelectorAll("img")[0],
arrow_Icons = document.querySelectorAll(".wrapper i");
let isDrag_Start = false, is_Dragging = false, prevPage_X, prevScroll_Left, position_Diff;
const showHide_Icons = () => {
    // showing and hiding prev/next icon according to caro_usel scroll left value
    let scrollWidth = caro_usel.scrollWidth - caro_usel.clientWidth; // getting max scrollable width
    arrow_Icons[0].style.display = caro_usel.scrollLeft == 0 ? "none" : "block";
    arrow_Icons[1].style.display = caro_usel.scrollLeft == scrollWidth ? "none" : "block";
}
arrow_Icons.forEach(icon => {
    icon.addEventListener("click", () => {
        let first_ImgWidth = first_Img.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the caro_usel scroll left else add to it
        caro_usel.scrollLeft += icon.id == "left" ? -first_ImgWidth : first_ImgWidth;
        setTimeout(() => showHide_Icons(), 60); // calling showHide_Icons after 60ms
    });
});
const auto_Slide = () => {
    // if there is no image left to scroll then return from here
    if(caro_usel.scrollLeft - (caro_usel.scrollWidth - caro_usel.clientWidth) > -1 || caro_usel.scrollLeft <= 0) return;
    position_Diff = Math.abs(position_Diff); // making position_Diff value to positive
    let first_ImgWidth = first_Img.clientWidth + 14;
    // getting difference value that needs to add or reduce from caro_usel left to take middle img center
    let valDifference = first_ImgWidth - position_Diff;
    if(caro_usel.scrollLeft > prevScroll_Left) { // if user is scrolling to the right
        return caro_usel.scrollLeft += position_Diff > first_ImgWidth / 3 ? valDifference : -position_Diff;
    }
    // if user is scrolling to the left
    caro_usel.scrollLeft -= position_Diff > first_ImgWidth / 3 ? valDifference : -position_Diff;
}
const drag_Start = (e) => {
    // updatating global variables value on mouse down event
    isDrag_Start = true;
    prevPage_X = e.pageX || e.touches[0].pageX;
    prevScroll_Left = caro_usel.scrollLeft;
}
const drag_ging = (e) => {
    // scrolling images/caro_usel to left according to mouse pointer
    if(!isDrag_Start) return;
    e.preventDefault();
    is_drag_ging = true;
    caro_usel.classList.add("drag_ging");
    position_Diff = (e.pageX || e.touches[0].pageX) - prevPage_X;
    caro_usel.scrollLeft = prevScroll_Left - position_Diff;
    showHide_Icons();
}
const drag_Stop = () => {
    isDrag_Start = false;
    caro_usel.classList.remove("drag_ging");
    if(!is_drag_ging) return;
    is_drag_ging = false;
    auto_Slide();
}
caro_usel.addEventListener("mousedown", drag_Start);
caro_usel.addEventListener("touchstart", drag_Start);
document.addEventListener("mousemove", drag_ging);
caro_usel.addEventListener("touchmove", drag_ging);
document.addEventListener("mouseup", drag_Stop);
caro_usel.addEventListener("touchend", drag_Stop);




