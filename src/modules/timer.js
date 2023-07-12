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

export default time

