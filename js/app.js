'use strict';
/**********
 Modal Js
 **********/
const modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.btn--close-modal'),
    btnOpenModal = document.querySelectorAll('.btn--show-modal'),
    btnScrollTop = document.querySelector(".btn--scroll-to"),
    sectionScroll = document.querySelector("#section--1"),
    nav = document.querySelector(".nav")

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};


btnOpenModal.forEach(btnModal => btnModal.addEventListener("click", openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

/*********************************************************
 Insert Cookies Before, After, Append, Preappend, Remove
 *********************************************************/

const header = document.querySelector('.header')
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Go it !</button>"

// setTimeout(()=>{
header.prepend(message)
// header.prepend(message)
// header.after(message)
// header.before(message)
// }, 2000)

// close the cookies
document.querySelector(".btn--close-cookie").addEventListener("click", () => message.remove())


/**********************************************
 Styles, Attributes, Classes, getComputedStyle
 **********************************************/

message.style.backgroundColor = "#37383d"
message.style.width = "100%"
// document.documentElement.style.setProperty("--color-primary", "orangered")

// Increased the Height of the Message in Js
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"
// console.log(getComputedStyle(message))

// get relative url and absolute url

const url = document.querySelector('.twitter-link');
console.log(url.href) // they also give the absolute link
console.log(url.getAttribute("href")) // they also give the absolute link

const logo = document.querySelector('.nav__logo')
console.log(logo.src) // they give the absolute link
console.log(logo.getAttribute("src")) // they give the exact path where image located which is relative link

// Data Attributes
console.log(logo.dataset.versionNumber);
console.log(logo.dataset.tabSetVersionsHero);


//Classes
logo.classList.add("c")
logo.classList.remove("c")
logo.classList.toggle("c")
logo.classList.contains("c")


/********************************
 Smooth Scrolling
 ********************************/

btnScrollTop.addEventListener("click", function () {
    // const sec1Cords = sectionScroll.getBoundingClientRect();
    // old way
    // window.scrollTo(sec1Cords.left + window.pageXOffset, sec1Cords.top + window.pageYOffset)

    // Old way with scroll behaviour smooth
    // window.scrollTo({
    //     left: sec1Cords.left + window.pageXOffset,
    //     top: sec1Cords.top + window.pageYOffset,
    //     behavior: "smooth"
    // });
    // Modern Way with scroll behaviour smooth
    sectionScroll.scrollIntoView({behavior: "smooth"});
});


/************************************************************
 Page Navigations Using Event Delegation & Event Propagation
 ************************************************************/

// Method 1: Simple Event to Trigger All Element's
// document.querySelectorAll(".nav_link").forEach(function(el){
//     el.addEventListener("click", function(e){
//         e.preventDefault();
//         const id = this.getAttribute("href");
//         document.querySelector(id).scrollIntoView({
//             behavior: "smooth"
//         })
//     })
// })


// Method 2: Event Delegation
// 1) Add event listeners to common parent element
// 2) Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault()
    console.log(e.target)
    // Matching the click event strategies
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute("href")
        document.querySelector(id).scrollIntoView({behavior: "smooth"})
    }
});

/******************
 Tabbed Components
 ******************/

const tabsContainer = document.querySelector(".operations__tab-container");
const tabbedButtons = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");


tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");

    if (!clicked) return
    // Remove active Classes
    tabbedButtons.forEach(tabs => tabs.classList.remove("operations__tab--active"))
    tabsContent.forEach(content => content.classList.remove("operations__content--active"))

    // Active the clicked Tabs Button
    clicked.classList.add("operations__tab--active")

    // Active the clicked Button
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active")

});


/******************
 Nav Hover Effect
 ******************/

const handlerHover = function (e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll('.nav__link')
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        })
        logo.style.opacity = this
    }
}

// Method 1 to passed Arguments

// nav.addEventListener("mouseover", (e)=>handlerHover(e, 0.5));
// nav.addEventListener("mouseout", (e)=>handlerHover(e, 1));

// Method 2 to passed Arguments Using bind

nav.addEventListener("mouseover", handlerHover.bind(0.5));
nav.addEventListener("mouseout", handlerHover.bind(1));


/******************
 Make Nav Bar Sticky
 ******************/

// My Code
// window.addEventListener("scroll", function (e){
//     if(window.scrollY >= 50 || document.documentElement.scrollY >=50){
//         nav.classList.add("sticky")
//     }
//     else {
//         nav.classList.remove("sticky")
//
//     }
// })
//
// const initialCoordinates = sectionScroll.getBoundingClientRect()
// window.addEventListener("scroll", ()=>{
//     window.scrollY > initialCoordinates.top ? nav.classList.add("sticky") : nav.classList.remove("sticky")
// })


/***************************************************************
 Make Nav Bar Sticky Using Intersection Observer Api Moder Way
 ***************************************************************/
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
    const [entry] = entries
    if (!entry.isIntersecting) nav.classList.add("sticky")
    else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(
    stickyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`
    }
);
headerObserver.observe(header)

/*********************************************************
 Reveal Section Using Intersection Observer Api Moder Way
 *********************************************************/
const allSections = document.querySelectorAll(".section")
const revealSectionCallback = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden")
    observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSectionCallback, {
    root: null, threshold: 0.15
});
allSections.forEach((section) => {
    // section.classList.add("section--hidden");
    sectionObserver.observe(section)
})


/*******************************************************
 Reveal Images Using Intersection Observer Api Moder Way
 *******************************************************/
const blurImages = document.querySelectorAll("img[data-src]")

const imageObserverCallback = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    // console.log(entry.target.classList.remove("lazy-img"))
    // entry.target.classList.remove("lazy-img")
    entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img")
    });
    observer.unobserve(entry.target);

}
const imageObserver = new IntersectionObserver(imageObserverCallback, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
})
blurImages.forEach((img) => imageObserver.observe(img))


/*****************
 Slider Animations
 *****************/

const slider = document.querySelector(".slider")
const slides = document.querySelectorAll(".slide")
const backBtn = document.querySelector(".slider__btn--left")
const nextBtn = document.querySelector(".slider__btn--right")

//First Time to Show Slider
const animateSlide = function (slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
}
animateSlide(0)

//Show Next Slide
const nextSlide = function () {
    counterSlide === (slides.length - 1) ? counterSlide = 0 : counterSlide++;
    animateSlide(counterSlide)
}

//Show Previous Slide
const backSlide = function () {
    counterSlide === 0 ? counterSlide = (slides.length - 1) : counterSlide--;
    animateSlide(counterSlide)
}


let counterSlide = 0;
nextBtn.addEventListener("click", nextSlide);
backBtn.addEventListener("click", backSlide);

// Key Left Arrow & Right Arrow Move slide
document.addEventListener("keydown",function (e){
    e.key === 'ArrowLeft' && backSlide();
    e.key === 'ArrowRight' && nextSlide();
})

// Add Dots to Move Slide
const dotsContainer = document.querySelector('.dots');
const createDots = function (){
    slides.forEach(function(_,i){
        dotsContainer.insertAdjacentHTML(`beforeend`,
            `<button class="dots__dot" data-slide=`${i}`></button>`
            )
    })
}
createDots()






/********************************
 Responsive Media Query Functions
 ********************************/
let w = window.innerWidth;
let xl = 1440;
let md = 768;
let ws = (w / 1440) * 10;

if (w >= md) {
    document.querySelector("html").style.fontSize = ws + "px";
}

window.addEventListener("resize", function () {
    w = window.innerWidth;
    xl = 1440;
    md = 768;
    ws = (w / 1440) * 10;

    if (w >= md) {
        document.querySelector("html").style.fontSize = ws + "px";
    }
});