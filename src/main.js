let slider = document.querySelector(".slider");
let slide = document.querySelectorAll(".slide");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let pagination = document.querySelector(".pagination");
let counter = 0;
let startX = 0;
let endX = 0;
let isDragging = false;

next.innerText = ">";
prev.innerText = "<";

// #region functions
const counterSlider = function (counter) {
  slide.forEach((item, index) => {
    item.innerText = index + 1;
    item.style.transform = `translateX(${(index - counter) * 100}%)`;
    if (index % 2 === 0) {
      item.style.backgroundColor = "aqua";
    } else {
      item.style.backgroundColor = "pink";
    }
  });
  disabled();
  bulletColor();
};
const disabled = function () {
  if (counter === 0) {
    prev.style.opacity = "0.2";
    prev.style.cursor = "auto";
  } else {
    prev.style.opacity = "1";
    prev.style.cursor = "pointer";
  }
  if (counter === slide.length - 1) {
    next.style.opacity = "0.2";
    next.style.cursor = "auto";
  } else {
    next.style.opacity = "1";
    next.style.cursor = "pointer";
  }
};
const createPagination = function () {
  slide.forEach((_, index) => {
    pagination.insertAdjacentHTML(
      "beforeend",
      `<div class='bullet ${
        index === 0 ? "active-bullet" : null
      }' data-id=${index}></div>`
    );
  });
};
const bulletColor = () => {
  allBullet = document.querySelectorAll(".bullet");
  allBullet.forEach((item) => {
    if (item.dataset.id == counter) {
      item.classList.add("active-bullet");
    } else {
      item.classList.remove("active-bullet");
    }
  });
};
const nextEvent = () => {
  if (counter < slide.length - 1) {
    counter++;
    counterSlider(counter);
  }
};
const prevEvent = () => {
  if (counter > 0) {
    counter--;
    counterSlider(counter);
  }
};
const paginationEvent = (e) => {
  if (e.target.classList.contains("bullet")) {
    counter = +e.target.dataset.id;
    counterSlider(counter);
  }
};
const windowEvent = (e) => {
  if (e.key == "ArrowLeft") {
    prevEvent();
  } else if (e.key == "ArrowRight") {
    nextEvent();
  }
};
const dragHandler = function () {
  let distance = startX - endX;

  if (Math.abs(distance) > 50) {
    if (distance > 0) {
      nextEvent();
    } else {
      prevEvent();
    }
  }
};
const startD = (e) => {
  startX = e.clientX;
  isDragging = true;
};
const endD = (e) => {
  if (!isDragging) return;
  isDragging = false;
  endX = e.clientX;
  dragHandler();
};
const startH = (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
};
const endH = (e) => {
  if (!isDragging) return;
  isDragging = false;
  endX = e.changedTouches[0].clientX;
  dragHandler();
};
// #endregion


counterSlider(counter);
createPagination();

// #region EventListeners
next.addEventListener("click", nextEvent);
prev.addEventListener("click", prevEvent);
pagination.addEventListener("click", paginationEvent);
window.addEventListener("keydown", windowEvent);

slider.addEventListener("mousedown", startD);
slider.addEventListener("mouseup", endD);
slider.addEventListener("mouseleave", endD);

slider.addEventListener("touchstart", startH);
slider.addEventListener("touchend", endH);
// #endregion
