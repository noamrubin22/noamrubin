class Settings {
  constructor() {
    this.wallpapers = [
      {
        artist: "since95",
        hasInstagram: false,
        title: "90iesKid",
        url: "./images/90ieskid.png",
      },
      {
        artist: "vika",
        artistText: "artwork by @uvi (opensea)",
        artistInstaLink: "https://opensea.io/uvi",
        hasInstagram: true,
        title: "Buoyant",
        url: "./images/buoyant.png",
      },
      {
        artist: "kathi",
        artistText: "artwork by @katharina.michalsky",
        artistInstaLink: "https://www.instagram.com/katharina.michalsky",
        hasInstagram: true,
        title: "Cricket",
        url: "./images/kathi.jpeg",
      },
      {
        artist: "djamillia",
        artistText: "artwork by @manush420",
        artistInstaLink: "https://www.instagram.com/manush420",
        hasInstagram: true,
        title: "Flower Penis",
        url: "./images/flower_penis.jpeg",
      },
      {
        artist: "chris",
        artistText: "artwork by @iti.art",
        artistInstaLink: "https://www.instagram.com/iti.art",
        hasInstagram: true,
        title: "Time And Money Have No Space",
        url: "./images/no_space.jpeg",
      },
      {
        artist: "shruti",
        artistText: "artwork by @shrooodi",
        artistInstaLink: "https://www.instagram.com/shrooodi",
        hasInstagram: true,
        title: "Disjointed",
        url: "./images/disjointed.jpeg",
      },
      {
        artist: "yossi1",
        artistText: "artwork by @yoshikame_",
        artistInstaLink: "https://www.instagram.com/yoshikame_",
        hasInstagram: true,
        title: "A Pink Flower",
        url: "./images/a-pink-flower.mp4",
      },
      {
        artist: "yossi2",
        artistText: "artwork by @yoshikame_",
        artistInstaLink: "https://www.instagram.com/yoshikame_",
        hasInstagram: true,
        title: "A Pink Flower",
        url: "./images/a-pink-flower-01.png",
      },
    ];
    this.themes = [
      "theme-windowsclassic",
      "theme-purplelady",
      "theme-oceanview",
      "theme-eatyourgreens",
      "theme-burnbabyburn",
    ];
    this.currentTheme = null;
    this.currentWallpaper = null;
    this.nextThemeValue;
    this.nextWallpaperValue;
    this.createEventHandler();
    this.highlightSelectedItem("theme");
    this.highlightSelectedItem("display__props-background-image");
    this.previewWallpaper(this.loadSettings("wallpapers"));
    this.previewTheme(this.loadSettings("themes"));
  }

  createEventHandler() {
    const settingsWindow = document.querySelector("[data-window-settings]");
    const clickSettingsWindow = document.querySelector("[data-open-settings]");
    const closeSettingsWindow = document.querySelector("[data-close-settings]");
    const okButton = document.querySelector("[data-ok]");
    const cancelButton = document.querySelector("[data-cancel]");

    clickSettingsWindow.onclick = () => {
      settingsWindow.hidden = false;
    };

    closeSettingsWindow.onclick = () => {
      this.previewWallpaper(this.loadSettings("wallpapers"));
      this.previewTheme(this.loadSettings("themes"));
      settingsWindow.hidden = true;
    };

    okButton.onclick = () => {
      okButton.active = true;
      this.storeSettings(this.nextWallpaperValue, "wallpapers");
      this.storeSettings(this.nextThemeValue, "themes");
      settingsWindow.hidden = true;
    };

    cancelButton.onclick = () => {
      this.previewWallpaper(this.loadSettings("wallpapers"));
      this.previewTheme(this.loadSettings("themes"));
      settingsWindow.hidden = true;
    };
  }

  highlightSelectedItem(item) {
    const itemList = document.getElementsByClassName(item);

    for (let i = 0; i < itemList.length; i++) {
      itemList[i].onclick = () => {
        let selected = itemList[i];
        const activeItem = document.querySelector("." + item + ".active");
        if (activeItem) {
          activeItem.classList.remove("active");
        }
        selected.classList.add("active");
        if (item === "theme") {
          this.previewTheme(i);
        } else {
          this.previewWallpaper(i);
        }
      };
    }
  }

  previewWallpaper(wallpaperIndex) {
    const wallpaper = this.wallpapers[wallpaperIndex];
    // save in constructor and call through this. DOM interactive is expensive for performance
    const monitorWallpaper = document.querySelector("[data-wallpaper-monitor]");
    const settingsMonitorWallpaper = document.querySelector(
      "[data-wallpaper-pc]"
    );
    const artistInsta = document.querySelector("[data-link-insta]");

    artistInsta.innerHTML = wallpaper.artistText;
    artistInsta.href = wallpaper.artistInstaLink;

    if (!wallpaper.artistText) {
      artistInsta.hidden = true;
    } else {
      artistInsta.hidden = false;
    }

    this.addWallpaperTo(monitorWallpaper, wallpaper);
    this.addWallpaperTo(settingsMonitorWallpaper, wallpaper);

    settingsMonitorWallpaper.hidden = false;
    this.nextWallpaperValue = wallpaperIndex;
  }

  addWallpaperTo(location, wallpaper) {
    const removeClasses = this.wallpapers.map((t) => t.artist);
    location.classList.remove(...removeClasses);
    location.classList.add(wallpaper.artist);
    location.src = wallpaper.url;
  }

  previewTheme(themeIndex) {
    const theme = this.themes[themeIndex];
    document.documentElement.className = theme;
    this.nextThemeValue = themeIndex;
  }

  storeSettings(elementIndex, property) {
    if (property == "wallpapers") {
      if (!elementIndex) {
        return;
      }
      this.currentWallpaper = elementIndex;
      localStorage.setItem(
        "display__props-background-image",
        JSON.stringify(this.wallpapers[elementIndex])
      );
    } else {
      if (!elementIndex) {
        return;
      }
      this.currentTheme = elementIndex;
      localStorage.setItem("theme", this.themes[elementIndex]);
    }
  }

  loadSettings(property) {
    // initial values
    const windowsClassic = 0;
    const ninteesKid = 0;

    if (property === "wallpapers") {
      const storedImage = localStorage.getItem(
        "display__props-background-image"
      );
      if (!storedImage) {
        return ninteesKid;
      }
      const wallpaperIndex = this.wallpapers.reduce((acc, current, index) => {
        if (current.artist === JSON.parse(storedImage).artist) {
          return index;
        }
        return acc;
      }, undefined);
      return Boolean(wallpaperIndex) ? wallpaperIndex : ninteesKid;
    } else {
      const storedTheme = localStorage.getItem("theme");
      if (!storedTheme) {
        return windowsClassic;
      }
      const themeIndex = this.themes.reduce((acc, current, index) => {
        if (current === storedTheme) {
          return index;
        }
        return acc;
      }, undefined);
      return Boolean(storedTheme) ? themeIndex : windowsClassic;
    }
  }
}
