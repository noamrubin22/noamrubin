window.onload = function () {

  // settings function
  Settings();

  // set clock
  setInterval(updateTime, 1000);

  // store needed objects
  const startButton = document.querySelector(".start__button");
  const startMenu = document.querySelector(".start__menu-main");
  const body = document.querySelector("body");
  const projectsItem = document.querySelector(".projects");
  const projectsMenu = document.querySelector(".sub__projects");
  const screenSaver = document.querySelector(".screensaver");
  const shutDown = document.querySelector(".shutdown");

  /* SCREENSAVER */
  // show screensaver after no mousemove
  let timeout;
  document.onmousemove = function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      screenSaver.hidden = false;
    }, 180000);
  };

  screenSaver.hidden = true;
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

  projectsItem.addEventListener("click", function () {
    menuDisplay(projectsMenu);
  });


  /* OPENS WINDOW AND ADD TASK TO TASKBAR */
  // menu buttons
  const clickAboutMenu = document.querySelector(".about");
  const clickContactMenu = document.querySelector(".contact");
  const clickMariposaMenu = document.querySelector(".sub__projects-mariposa");
  const clickGerritMenu = document.querySelector(".sub__projects-gerrit");
  const clickMusicMenu = document.querySelector(".sub__projects-musicvis");
  const clickSpotavibeMenu = document.querySelector(".sub__projects-spotavibe");

  // windows
  const gerritWindow = document.querySelector(".gerrit-window");
  const spotavibeWindow = document.querySelector(".spotavibe-window");
  const musicWindow = document.querySelector(".music-window");
  const mariposaWindow = document.querySelector(".mariposa-window");
  const contactWindow = document.querySelector(".contact-window");
  const aboutWindow = document.querySelector(".about-window");
  const videoWindow = document.querySelector(".video-window");

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
    taskText: "contact.txt",
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

  const videoProps = {
    windowElement: videoWindow,
    iconClassName: "video-icon",
    taskText: "groove.mov",
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
      const tasksList = document.querySelector(".tasks");
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

      if (this.props.desktopButton) {
        this.props.desktopButton.addEventListener("click", () => {
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
  // new Window(videoProps);

  // let audioElement;
  // const muteFire = document.getElementById("mute-fire");

  // // FIRE sound about window
  // clickAboutMenu.onclick = () => {
  //   audioElement = new Audio("./images/fire.mp3");
  //   audioElement.play();
  // }

  // closeAbout.onclick = () => {
  //   audioElement.pause();
  // }
  // let isPlaying = false;

  // function togglePlay() {
  //   isPlaying ? audioElement.pause() : audioElement.play();
  // };

  // audioElement.onplaying = function () {
  //   isPlaying = true;
  // };
  // audioElement.onpause = function () {
  //   isPlaying = false;
  // };

  // muteFire.onclick = () => {
  //   togglePlay();
  // }

  /* DRAGGABLE */
  // Make the desktop icons draggable
  const desktopIcons = document.getElementsByClassName("desktop-icon");
  for (let i = 0; i < desktopIcons.length; i++) {
    dragElement(desktopIcons[i]);
    console.log(desktopIcons[i]);
  }

  const windows = document.getElementsByClassName("window");
  for (let i = 0; i < windows.length; i++) {
    dragElement(windows[i]);
    console.log(windows[i]);
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
  }
}


      // make desktop items are "selected" by clicking once
      // if (this.props.desktopButton) {
      //   this.props.desktopButton.addEventListener("click", () => {
      //     console.log("clickedonce");
      //     this.props.desktopButton.style.backgroundColor = "var(--color-accent)"
      //     item = this.props.desktopButton;

      //     setTimeout(function () {
      //       setToPurple(item);
      //       setColorToNone(item);
      //     }, 500);
      //   });

      //   function setColorToNone(desktopButton) {
      //     desktopButton.style.cssText = "background-color: none";
      //   }
      //   function setToPurple(desktopButton) {
      //     desktopButton.style.cssText = `background-color: var(--color-secondary)`;
      //   }
      // }