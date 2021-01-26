function Settings() {

    class MySettings {
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
            ]
            this.themes = ["theme-purplelady", "theme-windowsclassic", "theme-oceanview", "theme-eatyourgreens", "theme-burnbabyburn"];
            this.currentTheme = null;
            this.currentWallpaper = null;
            this.nextThemeValue;
            this.nextWallpaperValue;

            const settingsWindow = document.getElementsByClassName("settings-window ")[0];
            const clickSettingsWindow = document.querySelector(".settings");
            const closeSettingsWindow = document.getElementsByClassName("settings-exit")[0];

            clickSettingsWindow.onclick = () => {
                settingsWindow.hidden = false;
            }

            closeSettingsWindow.onclick = () => {
                settingsWindow.hidden = true;
                this.previewWallpaper(this.loadSettings("wallpapers"));
                this.previewTheme(this.loadSettings("themes"));
            }
            // background imageListeners
            const wallpaperList = document.getElementsByClassName("display__props-background-image");
            for (let i = 0; i < wallpaperList.length; i++) {
                wallpaperList[i].onclick = () => {
                    let selected = wallpaperList[i];
                    // change styling according to selection in themelist
                    let activeWallpaper = document.querySelector(".display__props-background-image.active");
                    if (activeWallpaper) {
                        activeWallpaper.classList.remove("active");
                    }
                    selected.classList.add("active");
                    this.previewWallpaper(i);
                }
            }
            // theme list listeners 
            const themeList = document.getElementsByClassName("theme");
            for (let i = 0; i < themeList.length; i++) {
                themeList[i].onclick = () => {
                    let selected = themeList[i];

                    const activeTheme = document.querySelector(".theme.active");
                    if (activeTheme) {
                        activeTheme.classList.remove("active");
                    }
                    selected.classList.add("active");
                    let selectedTheme = themeList[i].innerHTML.toLowerCase().split(" ").join("");
                    this.previewTheme(i);
                }
            }

            // buttons
            const okButton = document.querySelector("[data-ok]");
            const cancelButton = document.querySelector("[data-cancel]");

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

            // load chosen settings
            this.previewWallpaper(this.loadSettings("wallpapers"));
            this.previewTheme(this.loadSettings("themes"));
        }

        previewWallpaper(wallpaperIndex) {
            const wallpaper = this.wallpapers[wallpaperIndex];
            const chosenWallpaper = document.querySelector(".monitor__background-img");
            const wallpaperPc = document.getElementsByClassName("pc__background-img")[0];
            const removeClasses = this.wallpapers.map((t) => t.artist);
            const artistInsta = document.querySelector(".link__instagram");

            artistInsta.innerHTML = wallpaper.artistText;
            artistInsta.href = wallpaper.artistInstaLink;

            if (!wallpaper.artistText) {
                artistInsta.hidden = true;
            } else {
                artistInsta.hidden = false;
            }

            chosenWallpaper.classList.remove(...removeClasses);
            chosenWallpaper.classList.add(wallpaper.artist);
            chosenWallpaper.src = wallpaper.url;
            wallpaperPc.hidden = false;
            wallpaperPc.classList.remove(...removeClasses);
            wallpaperPc.classList.add(wallpaper.artist);
            wallpaperPc.src = wallpaper.url;

            this.nextWallpaperValue = wallpaperIndex;
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
            // initiale values
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
                let index;
                if (storedTheme) {
                    this.themes.filter((t, i) => {
                        if (t === storedTheme) {
                            index = i;
                        }
                    })
                }
                return Boolean(storedTheme) ? index : purpleLady;
            }
        }
    }
    new MySettings();
}