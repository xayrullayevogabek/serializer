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

export default tab;
