$mainContainer = document.getElementsByClassName("main")[0];
$iframeContainer = document.getElementsByClassName("iframe")[0];
const $menu = document.getElementsByClassName("menu")[0];
const $header = document.getElementsByClassName("header")[0];
const $time = document.getElementById("time");
const $day = document.getElementById("day");
var IntervalId = setInterval(UpdateDateTime, 1000);

const paths = {
  sms: "SMS/sms.html",
  music: "Music/music.html",
  timer: "Timer/timer.html",
};

$menu.onclick = (e) => {
  // IF USER CLICK ON ANY MENU OPTION AND HE IS ALREDY IN
  // THAT SCREEN THEN SHOW THE HOME SCREEN
  if ($iframeContainer.children[0] !== undefined) {
    let preSelectedSrc = $iframeContainer.children[0].src;
    if (preSelectedSrc.includes(paths[e.target.parentNode.id])) {
      $mainContainer.style.display = "flex";
      $iframeContainer.style.display = "none";
      $iframeContainer.innerHTML = ``;
    } else {
      createIframe(e.target);
    }
  } else {
    createIframe(e.target);
  }

  // Start of code for adding and remove effects when user clicked on menu div
  if (e.target.parentNode.matches("[data-menuOptions]")) {
    let selected = e.target;
    $menuDivs = document.querySelectorAll(".menu > div > img");
    $menuDivs.forEach((element) => {
      if (selected !== element) {
        element.classList.remove("filter");
        element.parentNode.classList.add("hover");
      }
    });
    e.target.classList.toggle("filter");
    e.target.parentNode.classList.toggle("hover");
  }
  // End of code for adding and remove effects when user clicked on menu div
};

function createIframe(selectedDiv) {
  $iframeContainer.innerHTML = ``;
  var ifrm = document.createElement("iframe");
  ifrm.setAttribute("src", `${paths[selectedDiv.parentNode.id]}`);
  $mainContainer.style.display = "none";
  $iframeContainer.style.display = "flex";
  $iframeContainer.appendChild(ifrm);
}

// To update the Date and Time
const Days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thrusday",
  5: "Friday",
  6: "Saturday",
};

function UpdateDateTime() {
  var time = new Date();
  if (time.getMinutes() < 10) {
    $header.textContent =  (time.getHours()<10? '0' + time.getHours() : time.getHours()) + ":" + "0" + time.getMinutes();
    $time.textContent = (time.getHours()<10? '0' + time.getHours() : time.getHours()) + ":" + "0" + time.getMinutes();
  } 
  else {
    $header.textContent = (time.getHours()<10? '0' + time.getHours() : time.getHours()) + ":" + time.getMinutes();
    $time.textContent = (time.getHours()<10? '0' + time.getHours() : time.getHours()) + ":" + time.getMinutes();
  }
  $day.textContent = Days[time.getDay()];
}

window.onload = () => {
  UpdateDateTime();
};
