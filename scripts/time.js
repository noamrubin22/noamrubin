// Update the time box in the start bar every 10 seconds
function updateTime() {
  let today = new Date();
  let hours24 = today.getHours();
  let hours12;
  let minutes = today.getMinutes();
  let suffix = "";

  // define AM/PM
  if (hours24 >= 12) {
    suffix = " PM";
    hours12 = hours24 % 12;
  } else {
    suffix = " AM";
    hours12 = hours24;
  }

  if (minutes % 10 == 0) {
    //minutes = minutes + "0";
  } else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours12 + ":" + minutes + suffix;

  const timeBox = document.querySelector(".start__time-text");

  timeBox.innerHTML = time;
}
