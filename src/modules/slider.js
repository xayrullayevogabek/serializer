function slider() {
    const slides = document.querySelectorAll(".offer__slide"),
    next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev"),
    current = document.querySelector("#current"),
    total = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-field"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  //--------------------------------**********************************************************-----------------------------------
  //                                                    CAROUSEL SLIDER
  //--------------------------------**********************************************************-----------------------------------

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = ".5s ease all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  function deleteText(str) {
    return str.parseInt(str.replace(/\D/g, ""));
  }

  next.addEventListener("click", () => {
    if (offset == deleteText(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteText(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteText(width) * (slides.length - 1);
    } else {
      offset -= deleteText(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  // -------------------------------***********************************************************----------------------------------
  //                                                      EASY SLIDER
  // ------------------------------************************************************************----------------------------------

  // if(slides.length < 10){
  //   total.textContent = `0${slides.length}`
  // }else{
  //   total.textContent = slides.length
  // }

  // showSlides(slideIndex)

  // function showSlides(indx){
  //   if(indx > slides.length){
  //     slideIndex = 1
  //   }
  //   if(indx < 1){
  //     slideIndex = slides.length
  //   }
  //   slides.forEach(item => { item.style.display = 'none'})
  //   slides[slideIndex -1].style.display = 'block'

  //   if(slides.length < 10){
  //     current.textContent = `0${slideIndex}`
  //   }else{
  //     current.textContent = slideIndex
  //   }

  // }

  // function plusIndex(idx){
  //   showSlides(slideIndex += idx)
  // }
  // next.addEventListener('click',() => {
  //   plusIndex(1)
  // })
  // prev.addEventListener('click', () => {
  //   plusIndex(-1)
  // })
}

export default slider
