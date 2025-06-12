function addEvents(burgerElement, navigationElement, processButtonElements, processCardElements, processDescriptionElements) {
  burgerElement.addEventListener('click', () => {
    burgerElement.classList.toggle("burger_open")
    navigationElement.classList.toggle("open")
  })

  const lengthOfButtonPmElements = processButtonElements.length
  for (let i = 0; i < lengthOfButtonPmElements; i++) {
    processButtonElements[i].addEventListener('click', () => {
      processCardElements[i].classList.toggle("active")
      processDescriptionElements[i].classList.toggle("process__description_hidden")
      processButtonElements[i].classList.toggle("btn-pm_active")
    })
  }
}

function addSwiper(element) {
  element.addEventListener("mousedown", (event) => {
    event.preventDefault()

    let shiftX = event.clientX + element.scrollLeft
  
    element.addEventListener("mousemove", mouseMove)
    element.addEventListener("mouseup", removeListeners)

    function mouseMove(e) {
      moveAt(e, shiftX)
    }

    function removeListeners() {
      element.removeEventListener("mousemove", mouseMove)
      element.removeEventListener("mouseup", removeListeners)
    }

    function moveAt(e, shiftX) {
      let movement = e.clientX - shiftX
      element.scrollLeft = -1* movement
    }
  })
}

function addSlider(sliderElement, sliderReviewsElement, sliderReviewElements, leftButtonElement, rightButtonElement) {
  leftButtonElement.addEventListener("click", prevSlide)
  rightButtonElement.addEventListener("click", nextSlide)

  let slideIndex = 1
  let movement = 0

  initializeSlider()

  function initializeSlider() {
    const sliderCur = "slider__reviews_current"
    sliderReviewElements[slideIndex].classList.add(sliderCur)

  }

  function moveSlider(prevIndex) {
    const sliderCur = "slider__reviews_current"
    sliderReviewElements[prevIndex].classList.remove(sliderCur)
    sliderReviewElements[slideIndex].classList.add(sliderCur)

    movement = (prevIndex - slideIndex) * (sliderReviewElements[slideIndex].offsetWidth + 50) + movement

    sliderReviewsElement.style.transform = 'translateX(' + movement + 'px)';
  }

  function prevSlide() {
    let prevIndex = slideIndex
    slideIndex--
    if (!checkAcceptable()) {
      slideIndex++
      return
    }
    moveSlider(prevIndex)
    
  }

  function nextSlide() {
    let prevIndex = slideIndex
    slideIndex++
    if (!checkAcceptable()) {
      slideIndex--
      return
    }
    moveSlider(prevIndex)
  }

  function checkAcceptable() {
    if (slideIndex > sliderReviewElements.length - 1 || slideIndex < 0) {
      return false;
    }
    return true;
  }
}

const widthWindow = document.documentElement.clientWidth
const heightWindow = document.documentElement.clientHeight

const burgerElement = document.querySelector(".burger")
const navigationElements = document.getElementsByClassName("header__navigation")

const processButtonElements = document.getElementsByClassName("process__button")
const processCardElements = document.getElementsByClassName("process__card")
const processDescriptionElements = document.getElementsByClassName("process__description")

const caseAboutElement = document.querySelector(".case__about")

const sliderReviewsElement = document.querySelector(".slider__reviews")
const sliderElement = document.querySelector(".slider")
const sliderReviewElements = document.getElementsByClassName("slider__review")
const leftButtonElement = document.querySelector(".slider__arrow-left")
const rightButtonElement = document.querySelector(".slider__arrow-right")

addSwiper(caseAboutElement)
addSlider(sliderElement, sliderReviewsElement, sliderReviewElements, leftButtonElement, rightButtonElement)
addEvents(burgerElement, navigationElements[0], processButtonElements, processCardElements, processDescriptionElements)

