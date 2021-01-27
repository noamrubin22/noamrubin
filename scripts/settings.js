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
                artist: "kathi",
                artistText: "artwork by @katharina.michalsky",
                artistInstaLink: "https://www.instagram.com/katharina.michalsky",
                hasInstagram: true,
                title: "Landscape",
                url: "./images/landscape.jpg",
            },
            {
                artist: "djamillia",
                artistText: "artwork by @manush420",
                artistInstaLink: "https://www.instagram.com/manush420",
                hasInstagram: true,
                title: "Ich Gebäre dich",
                url: "./images/ichgebäredich.png",
            },
            {
                artist: "chris",
                artistText: "artwork by @iti.art",
                artistInstaLink: "https://www.instagram.com/iti.art",
                hasInstagram: true,
                title: "Inner Floating",
                url: "./images/innerfloating.png",
            },
            {
                artist: "shruti",
                artistText: "artwork by @shrooodi",
                artistInstaLink: "https://www.instagram.com/shrooodi",
                hasInstagram: true,
                title: "High_Rise",
                url: "./images/shruti.png",
            },
            {
                artist: "vika",
                artistText: "artwork by @uuuuuvika",
                artistInstaLink: "https://www.instagram.com/uuuuuvika",
                hasInstagram: true,
                title: "Peaceful Warrior",
                url: "./images/peacefulwarrior.jpg",
            },
            {
                artist: "yossi1",
                artistText: "artwork by @yoshikame_",
                artistInstaLink: "https://www.instagram.com/yoshikame_",
                hasInstagram: true,
                title: "Pasha",
                url: "./images/pasha_01_mobile.png",
            },
            {
                artist: "yossi2",
                artistText: "artwork by @yoshikame_",
                artistInstaLink: "https://www.instagram.com/yoshikame_",
                hasInstagram: true,
                title: "Pasha",
                url: "./images/pasha_01.png",
            }
        ];
        this.themes = ["theme-purplelady", "theme-windowsclassic", "theme-oceanview", "theme-eatyourgreens", "theme-burnbabyburn"];
        this.currentTheme = null;
        this.currentWallpaper = null;
        this.nextThemeValue;
        this.nextWallpaperValue;
        this.createEventHandler();
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
        }

        closeSettingsWindow.onclick = () => {
            this.previewWallpaper(this.loadSettings("wallpapers"));
            this.previewTheme(this.loadSettings("themes"));
            settingsWindow.hidden = true;
        }

        okButton.onclick = () => {
            okButton.active = true;
            this.storeSettings(this.nextWallpaperValue, "wallpapers");
            this.storeSettings(this.nextThemeValue, "themes");
            settingsWindow.hidden = true;
        }

        cancelButton.onclick = () => {
            this.previewWallpaper(this.loadSettings("wallpapers"));
            this.previewTheme(this.loadSettings("themes"));
            settingsWindow.hidden = true;
        }

        this.highlightSelectedItem("theme");
        this.highlightSelectedItem("display__props-background-image");
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
            }
        }
    }

    previewWallpaper(wallpaperIndex) {
        const wallpaper = this.wallpapers[wallpaperIndex];
        const monitorWallpaper = document.querySelector("[data-wallpaper-monitor]");
        const settingsMonitorWallpaper = document.querySelector("[data-wallpaper-pc]");
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
                return
            }
            this.currentWallpaper = elementIndex;
            localStorage.setItem("display__props-background-image", JSON.stringify(this.wallpapers[elementIndex]));
        } else {
            if (!elementIndex) {
                return
            }
            this.currentTheme = elementIndex;
            localStorage.setItem('theme', this.themes[elementIndex]);
        }
    }

    loadSettings(property) {
        // initial values
        const purpleLady = 0;
        const ninteesKid = 0;

        if (property === "wallpapers") {
            const storedImage = localStorage.getItem("display__props-background-image");
            let wallpaperIndex;
            if (storedImage) {
                this.wallpapers.filter((t, i) => {
                    if (t.artist === JSON.parse(storedImage).artist) {
                        wallpaperIndex = i;
                    }
                })
            }
            return Boolean(storedImage) ? wallpaperIndex : ninteesKid;
        } else {
            const storedTheme = localStorage.getItem("theme");
            let themeIndex;
            if (storedTheme) {
                this.themes.filter((t, i) => {
                    if (t === storedTheme) {
                        themeIndex = i;
                    }
                })
            }
            return Boolean(storedTheme) ? themeIndex : purpleLady;
        }
    }
}
