(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });


  

  

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()




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







new Swiper('.recent-photos-slider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 20
    }
  }
});





