// ==========================
// MENU MOBILE
// ==========================

const toggle = document.getElementById("menu-toggle")
const menu = document.querySelector("nav ul")

toggle.addEventListener("click", () => {
menu.classList.toggle("active")
})


// ==========================
// SCROLL SUAVE
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault()

const target = document.querySelector(this.getAttribute("href"))

target.scrollIntoView({
behavior:"smooth"
})

})

})


// ==========================
// SLIDER PORTFÓLIO
// ==========================

let slides = document.querySelectorAll(".slide")
let index = 0

function showSlide(i){

slides.forEach(slide => slide.classList.remove("active"))

slides[i].classList.add("active")

}

document.querySelector(".next").onclick = () => {

index++

if(index >= slides.length){
index = 0
}

showSlide(index)

}

document.querySelector(".prev").onclick = () => {

index--

if(index < 0){
index = slides.length - 1
}

showSlide(index)

}


// autoplay opcional

setInterval(() => {

index++

if(index >= slides.length){
index = 0
}

showSlide(index)

},5000)