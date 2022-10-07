window.onload = function () {
  new Settings();
  dragMobile();

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

  const SCREENSAVER_ACTIVATION_TIME = 1000 * 60 * 1; // ms * s * m

  const screenConfig = {
    isMobile: false,
    screenSaverTimeOut: 0,
  };

  const onWindowResize = () => {
    screenConfig.isMobile = document.body.clientWidth < 1000;
  };

  onWindowResize();

  window.addEventListener("resize", onWindowResize);

  /* SCREENSAVER */
  // show screensaver after no mousemove
  document.onmousemove = function () {
    clearTimeout(screenConfig.screenSaverTimeOut);
    screenConfig.screenSaverTimeOut = setTimeout(function () {
      screenSaver.hidden = false;
    }, SCREENSAVER_ACTIVATION_TIME);
  };

  document.ontouchstart = function () {
    clearTimeout(screenConfig.screenSaverTimeOut);
    screenConfig.screenSaverTimeOut = setTimeout(function () {
      screenSaver.hidden = false;
    }, SCREENSAVER_ACTIVATION_TIME);
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
  // start menu appears on click, disappears on click somewhere else
  function closeStartMenu(e) {
    const { classList } = e.target;
    const shouldNotClose =
      classList.contains("start__button") ||
      classList.contains("start__text") ||
      classList.contains("start__logo") ||
      classList.contains("projects");
    if (shouldNotClose) {
      return;
    }
    startMenu.classList.remove("menu-open");
  }

  body.addEventListener("click", closeStartMenu);

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
  const clickMusicMenu = document.querySelector(".sub__projects-musicvis");
  const clickBingoMenu = document.querySelector(".sub__projects-bingo");
  const clickTibetanRobotMenu = document.querySelector(
    ".sub__projects-tibetan-robot"
  );
  const clickDiamondMenu = document.querySelector(".sub__projects-diamond");

  // windows
  const musicWindow = document.querySelector(".music-window");
  const mariposaWindow = document.querySelector(".mariposa-window");
  const contactWindow = document.querySelector(".contact-window");
  const aboutWindow = document.querySelector(".about-window");
  const bingoWindow = document.querySelector(".bingo-window");
  const tibetanRobotWindow = document.querySelector(".tibetan-robot-window");
  const diamondWindow = document.querySelector(".diamond-window");

  // desktop items
  const musicDesktop = document.querySelector(".music-vis");
  const mariposaDesktop = document.querySelector(".mariposa");
  const bingoDesktop = document.querySelector(".bingo");
  const tibetanRobotDesktop = document.querySelector(".tibetan-robot");
  const diamondDesktop = document.querySelector(".diamond");

  const aboutProps = {
    menuButton: clickAboutMenu,
    windowElement: aboutWindow,
    iconClassName: "task__icon-about",
    taskText: "about.txt",
  };

  const contactProps = {
    menuButton: clickContactMenu,
    windowElement: contactWindow,
    iconClassName: "task__icon-contact",
    taskText: "contact.txt",
  };

  const musicProps = {
    desktopButton: musicDesktop,
    menuButton: clickMusicMenu,
    windowElement: musicWindow,
    iconClassName: "task__icon-musicviz",
    taskText: "music-visualization.txt",
  };

  const mariposaProps = {
    desktopButton: mariposaDesktop,
    menuButton: clickMariposaMenu,
    windowElement: mariposaWindow,
    iconClassName: "task__icon-mariposa",
    taskText: "mariposa.txt",
  };

  const bingoProps = {
    desktopButton: bingoDesktop,
    menuButton: clickBingoMenu,
    windowElement: bingoWindow,
    iconClassName: "task__icon-bingo",
    taskText: "bingo.txt",
  };

  const tibetanRobotProps = {
    desktopButton: tibetanRobotDesktop,
    menuButton: clickTibetanRobotMenu,
    windowElement: tibetanRobotWindow,
    iconClassName: "task__icon-tibetan-robot",
    taskText: "tibetan-singing-robot.txt",
  };

  const diamondProps = {
    desktopButton: diamondDesktop,
    menuButton: clickDiamondMenu,
    windowElement: diamondWindow,
    iconClassName: "task__icon-diamond",
    taskText: "diamond.txt",
  };

  class Window {
    constructor(props, windowsList) {
      this.windowsList = windowsList;
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
        this.textBox.classList.toggle("max");
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
      this.closeOpenWindows();
      this.isOpen = !this.isOpen;
      this.props.windowElement.hidden = !this.isOpen;
      this.task.classList.toggle("active");
    }

    closeOpenWindows() {
      if (screenConfig.isMobile && !this.isOpen) {
        windowsList.forEach((window) => {
          if (window.isOpen) {
            window.toggleWindow();
          }
        });
      }
    }

    getWindowButtons() {
      const { windowElement } = this.props;
      this.maximize = windowElement.querySelector("[data-maximize]");
      this.minimize = windowElement.querySelector("[data-minimize]");
      this.close = windowElement.querySelector("[data-close]");
      this.textBox = windowElement.querySelector("[data-textbox]");
    }
  }

  const windowsList = [];
  // create windows
  windowsList.push(new Window(aboutProps, windowsList));
  windowsList.push(new Window(contactProps, windowsList));
  windowsList.push(new Window(musicProps, windowsList));
  windowsList.push(new Window(mariposaProps, windowsList));
  windowsList.push(new Window(bingoProps, windowsList));
  windowsList.push(new Window(tibetanRobotProps, windowsList));
  windowsList.push(new Window(diamondProps, windowsList));

  // Make the desktop icons draggable
  const desktopIcons = document.getElementsByClassName("desktop-icon");
  for (let i = 0; i < desktopIcons.length; i++) {
    dragElement(desktopIcons[i]);
  }

  const windows = document.getElementsByClassName("window");
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
  }
};
