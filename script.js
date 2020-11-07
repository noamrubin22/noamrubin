window.onload = function () {
  // set clock
  setInterval(updateTime, 1000);

  // store needed objects
  let startButton = document.querySelector(".start__button");
  let startMenu = document.querySelector(".start__menu-main");
  let body = document.querySelector("body");
  let programsItem = document.querySelector(".programs");
  let programsMenu = document.querySelector(".sub__programs");
  let screenSaver = document.getElementById("screensaver");
  let shutDown = document.querySelector(".shutdown");
  let item;

  /* SCREENSAVER */
  // show screensaver after no mousemove
  var timeout;
  document.onmousemove = function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      screenSaver.hidden = false;
    }, 180000);
  };

  // hide screensaver on mouse move
  screenSaver.addEventListener("mousemove", function () {
    screenSaver.hidden = true;
  });

  // show screensaver on when "shutting down" pc
  shutDown.addEventListener("click", function () {
    screenSaver.hidden = false;
  });

  /* START MENU */
  // start menu appears on click, dissapears on click somewhere else
  body.onclick = function (e) {
    for (let i = 0, l = e.target.classList.length; i < l; ++i) {
      if ((/start__.*/.test(e.target.classList[i])) || ((/start__menu-sub-items.sub-items.*/.test(e.target.classList[i])))) {
        break;
        // } else if ((/start__menu-sub-items.sub-items.*/.test(e.target.classList[i]))) {
        //   startMenu.classList.remove("menu-open");
      } else {
        startMenu.classList.remove("menu-open");
      }
    }
  };

  // show/hide menu on click
  function menuDisplay(menu) {
    if (menu.classList.contains("menu-open")) {
      menu.classList.remove("menu-open");
    } else {
      menu.classList.add("menu-open");
    }
  }

  startButton.addEventListener("click", function () {
    menuDisplay(startMenu);
  });

  programsItem.addEventListener("click", function () {
    menuDisplay(programsMenu);
  });

  /* OPENS WINDOW AND ADD TASK TO TASKBAR */
  // menu buttons
  const clickAboutMenu = document.querySelector(".about");
  const clickContactMenu = document.querySelector(".contact");
  const clickMariposaMenu = document.querySelector(".mariposa-menu");
  const clickGerritMenu = document.querySelector(".gerrit-menu");
  const clickMusicMenu = document.querySelector(".music-menu");
  const clickSpotavibeMenu = document.querySelector(".spotavibe-menu");
  const clickSettingsMenu = document.querySelector(".settings");

  // windows
  const gerritWindow = document.querySelector(".gerrit-window");
  const spotavibeWindow = document.querySelector(".spotavibe-window");
  const musicWindow = document.querySelector(".music-window");
  const mariposaWindow = document.querySelector(".mariposa-window");
  const contactWindow = document.querySelector(".contact-window");
  const aboutWindow = document.querySelector(".about-window");
  // const settingsWindow = document.querySelector(".settings-window");

  // desktop items
  const spotavibeDesktop = document.querySelector(".spotavibe");
  const gerritDesktop = document.querySelector(".gerrit");
  const musicDesktop = document.querySelector(".music-vis");
  const mariposaDesktop = document.querySelector(".mariposa");

  const aboutProps = {
    menuButton: clickAboutMenu,
    windowElement: aboutWindow,
    iconClassName: "about-icon",
    taskText: "about.txt",
  };

  const contactProps = {
    menuButton: clickContactMenu,
    windowElement: contactWindow,
    iconClassName: "contact-icon",
    taskText: "contact.txtx",
  };

  const gerritProps = {
    desktopButton: gerritDesktop,
    menuButton: clickGerritMenu,
    windowElement: gerritWindow,
    iconClassName: "gerrit-icon",
    taskText: "gerrit.txt",
  };

  const musicProps = {
    desktopButton: musicDesktop,
    menuButton: clickMusicMenu,
    windowElement: musicWindow,
    iconClassName: "music-icon",
    taskText: "music-visualization.txt",
  };

  const spotavibeProps = {
    desktopButton: spotavibeDesktop,
    menuButton: clickSpotavibeMenu,
    windowElement: spotavibeWindow,
    iconClassName: "spotavibe-icon",
    taskText: "spotavibe.txt",
  };

  const mariposaProps = {
    desktopButton: mariposaDesktop,
    menuButton: clickMariposaMenu,
    windowElement: mariposaWindow,
    iconClassName: "mariposa-icon",
    taskText: "mariposa.txt",
  };

  class Window {
    constructor(props) {
      this.props = props;
      this.isOpen = false;
      this.getWindowButtons();
      this.createEventHandler();
    }

    createTask() {
      const task = document.createElement("div");
      const icon = document.createElement("div");
      const tasksList = document.getElementById("tasks");
      const content = document.createTextNode(this.props.taskText);
      icon.classList.add(this.props.iconClassName);
      task.appendChild(icon);
      task.appendChild(content);
      task.classList.add("task");
      tasksList.append(task);
      this.task = task;
      task.addEventListener("click", () => {
        this.toggleWindow();
      });
    }

    createEventHandler() {
      this.props.menuButton.addEventListener("click", () => {
        if (this.task) {
          if (!this.isOpen) {
            this.toggleWindow();
          }
          return;
        }
        this.createTask();
        this.toggleWindow();
        starField();
      });

      // make desktop items are "selected" by clicking ones
      if (this.props.desktopButton) {
        this.props.desktopButton.addEventListener("click", () => {
          console.log("clickedonce");
          this.props.desktopButton.style.backgroundColor = "var(--color-accent)"
          item = this.props.desktopButton;

          setTimeout(function () {
            setToPurple(item);
            setColorToNone(item);
          }, 500);
        });

        function setColorToNone(desktopButton) {
          desktopButton.style.cssText = "background-color: none";
        }
        function setToPurple(desktopButton) {
          desktopButton.style.cssText = `background-color: var(--color-secondary)`;
        }
      }

      if (this.props.desktopButton) {
        this.props.desktopButton.addEventListener("dblclick", () => {
          if (this.task) {
            if (!this.isOpen) {
              this.toggleWindow();
            }
            return;
          }
          this.createTask();
          this.toggleWindow();
        });
      }
      this.maximize.addEventListener("click", () => {
        this.textbox.classList.toggle("max");
        this.props.windowElement.classList.toggle("max");
        starField();
      });
      this.minimize.addEventListener("click", () => {
        this.toggleWindow();
      });
      this.close.addEventListener("click", () => {
        this.toggleWindow();
        this.task.remove();
        this.task = undefined;
      });
    }

    toggleWindow() {
      this.isOpen = !this.isOpen;
      this.props.windowElement.hidden = !this.isOpen;
      this.task.classList.toggle("active");
    }

    getWindowButtons() {
      const { windowElement } = this.props;
      this.maximize = windowElement.querySelector("[data-maximize]");
      this.minimize = windowElement.querySelector("[data-minimize]");
      this.close = windowElement.querySelector("[data-close]");
      this.textbox = windowElement.querySelector("[data-textbox]");
    }
  }

  // create windows
  new Window(aboutProps);
  new Window(contactProps);
  new Window(gerritProps);
  new Window(spotavibeProps);
  new Window(musicProps);
  new Window(mariposaProps);
  // new Window(settingsProps);

  /* DRAGGABLE */
  // Make the desktop icons draggable
  let desktopIcons = document.getElementsByClassName("desktop-icon");
  for (let i = 0; i < desktopIcons.length; i++) {
    dragElement(desktopIcons[i]);
  }

  let windows = document.getElementsByClassName("window");
  for (let i = 0; i < windows.length; i++) {
    dragElement(windows[i]);
  }

  function dragElement(elmnt) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      const { innerWidth, innerHeight } = window;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // when mouse leaves monitor, leave element behind
      if (e.clientX > innerWidth || e.clientY > innerHeight) {
        return;
      }
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      limitDrag(elmnt, innerWidth, innerHeight);
    }

    function limitDrag(elmnt, innerWidth, innerHeight) {
      // define monitor & elmnt width and height
      const { width, height } = elmnt.getBoundingClientRect();
      const { offsetTop, offsetLeft, style } = elmnt;

      // limit drag function to monitor
      if (offsetTop <= 0) {
        style.top = 0 + "px";
      }
      if (offsetLeft <= 0) {
        style.left = 0 + "px";
      }

      if (offsetLeft + width >= innerWidth) {
        style.left = innerWidth - width + "px";
      }
      if (offsetTop + height >= innerHeight) {
        style.top = innerHeight - height + "px";
      }
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }


    // change color theme desktop
    const themes = document.getElementsByClassName("theme");
    const backgroundColorPc = document.querySelector(".background-color");
    // const monitor = document.getElementById("monitor");
    const buttons = document.getElementsByClassName("classic-btn");
    const settingsWindow = document.getElementsByClassName("settings-window ")[0];
    const images = document.getElementsByClassName("display-img");
    const chosenBackgroundImage = document.getElementById("chosen-background-img");
    const backgroundImagePc = document.getElementsByClassName("pc-bg-img")[0];

    /* open settings when clicked on menu */
    clickSettingsMenu.onclick = () => {
      settingsWindow.hidden = false;
    }

    // function to set a given theme/color-scheme
    function setTheme(themeName) {
      localStorage.setItem('theme', themeName);
      document.documentElement.className = themeName;
    }
    // // function to toggle between themes
    // function toggleTheme() {
    //   if (localStorage.getItem('theme') === 'theme-purplelady') {
    //     setTheme('theme-purplelady');
    //   } else {
    //     setTheme('theme-oceantheme');
    //   }
    // }
    // // Immediately invoked function to set the theme on initial load
    // (function () {
    //   if (localStorage.getItem('theme') === 'theme-purplelady') {
    //     setTheme('theme-purplelady');
    //   } else {
    //     setTheme('theme-oceanview');
    //   }
    // })();

    function changeTheme() {
      if (!backgroundColorPc.style.backgroundColor) {
        backgroundColorPc.style.backgroundColor = "var(--color-primary)";
      }
      for (let i = 0; i < themes.length; i++) {
        themes[i].onclick = () => {
          selected = themes[i];
          // change background selected color
          themes[i].style.backgroundColor = "var(--color-accent)";
          themes[i].style.color = "white";
          for (let j = 0; j < themes.length; j++) {
            if (themes[i] !== themes[j]) {
              themes[j].style.backgroundColor = "white";
              themes[j].style.color = "black";
            }
          }
          // change to selected color on pc display
          let selectedTheme = themes[i].innerHTML.toLowerCase().split(" ").join("");
          console.log('theme-' + selectedTheme);
          setTheme('theme-' + selectedTheme);
        }
      }
      // when confirmed, change whole styling
      buttons[0].onclick = () => {
        buttons[0].active = true;
        settingsWindow.hidden = true;
      }

      // if canceled, got back to old
      buttons[1].onclick = () => {
        monitor.style.backgroundColor = "var(--color-primary)";
        settingsWindow.hidden = true;
      }
    }

    /* sets the selected image as background */
    function setImage(selectedImage, title, artist) {
      if (selectedImage === "none") {
        chosenBackgroundImage.hidden = true;
        backgroundImagePc.hidden = true;
      } else {
        // add image to both backgrounds (pc and real display)
        chosenBackgroundImage.hidden = false;
        chosenBackgroundImage.src = "./images/" + selectedImage + ".png";
        chosenBackgroundImage.alt = title;
        backgroundImagePc.hidden = false;
        backgroundImagePc.src = "./images/" + selectedImage + ".png";
        backgroundImagePc.alt = title;

        // add artist link
        const backgroundContainer = document.getElementsByClassName("background-container")[0];
        let artistDiv = document.getElementsByClassName("artist")[0];
        if (artist) {
          // let artistDiv = document.createElement("DIV");
          // console.log(artistDiv);
          artistDiv.hidden = false;
          if (artist === "kathi") {
            artistDiv.innerHTML = "by @katherinamichalsky";
          } else if (artist === "shruti") {
            artistDiv.innerHTML = "by @shrooodi";
          } else {
            artistDiv.innerHTML = "by @iti.art";
          }
          backgroundContainer.appendChild(artistDiv);
        } else {
          artistDiv.hidden = true;
        }
      }
    }
    // function addArtist() {

    // }
    // check id for artist name
    // add p tag with artists instagram and link

    function changeImage() {

      for (let i = 0; i < images.length; i++) {
        // if image is selected
        images[i].onclick = () => {
          // change its background in the list
          images[i].style.backgroundColor = "var(--color-accent)";
          images[i].style.color = "white";
          // make sure that the rest of the list is not selected
          for (let j = 0; j < images.length; j++) {
            if (images[i] !== images[j]) {
              images[j].style.backgroundColor = "white";
              images[j].style.color = "black";
            }
          }
          // change to selected image on pc display
          let title = images[i].innerHTML;
          let selectedImage = images[i].innerHTML.toLowerCase().split(" ").join("");
          setImage(selectedImage, title, images[i].id);
        }
      }
    }
    changeTheme();
    changeImage();
  }
};
