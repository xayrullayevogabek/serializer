/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/class.js":
/*!******************************!*\
  !*** ./src/modules/class.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function clas () {
    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector) {
          this.src = src;
          this.alt = alt;
          this.title = title;
          this.desc = desc;
          this.price = price;
          this.parent = document.querySelector(parentSelector);
          this.transfer = 11000;
          this.changeToUZS();
        }
    
        changeToUZS() {
          this.price = this.price * this.transfer;
        }
    
        render() {
          const element = document.createElement("div");
    
          element.innerHTML = `
          <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.desc}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span>so'm/month</div>
            </div>
         </div>
          `;
          this.parent.append(element);
        }
      }
    
      const getResource = async (url) => {
        const res = await fetch(url);
    
        return await res.json();
      };
    
      getResource("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, alt, title, desc, price }) => {
          new MenuCard(img, alt, title, desc, price, ".menu .container").render();
        });
      });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clas);

/***/ }),

/***/ "./src/modules/form.js":
/*!*****************************!*\
  !*** ./src/modules/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function form() {
  const forms = document.querySelectorAll("form");

  forms.forEach((item) => {
    bindpostData(item);
  });

  const msg = {
    loading: "img/spinner.svg",
    success: "Thank's for submitting our form",
    failure: "Something went wrong",
  };

  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    return await res.json();
  }

  function bindpostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");
      request.setRequestHeader("Content-Type", "applicaation/json");

      const statusMessage = document.createElement("img");
      statusMessage.src = msg.loading;
      statusMessage.style = `
          display:block;
          margin:0 auto;
        `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThanksModal(msg.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
      `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);



/***/ }),

/***/ "./src/modules/loader.js":
/*!*******************************!*\
  !*** ./src/modules/loader.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader() {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  },2000);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);



/***/ }),

/***/ "./src/modules/modal.js":
/*!******************************!*\
  !*** ./src/modules/modal.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {
  // Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalInterval);
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }
  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (event) => {
    if (
      modal == event.target ||
      event.target.getAttribute("data-close") === ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalInterval = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./src/modules/tab.js":
/*!****************************!*\
  !*** ./src/modules/tab.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tab() {
  const tabBtns = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    tabParent = document.querySelector(".tabheader__items");

  function hideTabs() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabBtns.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabs(i = 0) {
    tabBtns[i].classList.add("tabheader__item_active");
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
  }

  hideTabs();
  showTabs();
  
  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabBtns.forEach((item, indx) => {
        if (target == item) {
          hideTabs();
          showTabs(indx);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tab);


/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function time() {
  const deadline = "2023-07-27";

  function getTimeRemaining(endTime) {
    let days, hours, minuts, seconds;
    const timer = Date.parse(endTime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minuts = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (100 * 60 * 60)) % 24);
      minuts = Math.floor((timer / 1000 / 64) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minuts, seconds };
  }

  function getZero(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minuts = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minuts.innerHTML = getZero(t.minuts);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (time);



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_class_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/class.js */ "./src/modules/class.js");
/* harmony import */ var _modules_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/form.js */ "./src/modules/form.js");
/* harmony import */ var _modules_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/loader.js */ "./src/modules/loader.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/modal.js */ "./src/modules/modal.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../modules/slider.js */ "./src/modules/slider.js");
/* harmony import */ var _modules_tab_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modules/tab.js */ "./src/modules/tab.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../modules/timer.js */ "./src/modules/timer.js");









window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_class_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_form_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_loader_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_tab_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map