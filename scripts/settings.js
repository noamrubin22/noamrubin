function Settings() {
    // global variables
    const clickSettingsMenu = document.querySelector(".settings");
    const themes = document.getElementsByClassName("theme");
    const backgroundColorPc = document.querySelector(".background-color");
    const buttons = document.getElementsByClassName("classic-btn");
    const settingsWindow = document.getElementsByClassName("settings-window ")[0];
    const images = document.getElementsByClassName("display-img");
    const chosenBackgroundImage = document.getElementById("chosen-background-img");
    const backgroundImagePc = document.getElementsByClassName("pc-bg-img")[0];
    const closeSettings = document.getElementsByClassName("closeme-settings")[0];
    let currentTheme = document.getElementsByTagName("html")[0].className;
    let currentImage = "none";
    let currentTitle;
    let currentArtist;
    let prevTheme;
    let prevImage;

    /* open settings when clicked on menu */
    clickSettingsMenu.onclick = () => {
        settingsWindow.hidden = false;
    }

    /* close settings when clicked on x*/
    closeSettings.onclick = () => {
        settingsWindow.hidden = true;
    };

    changeTheme();
    changeImage();

    /* set a given theme/color-scheme */
    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }

    /* changes chosen theme */
    function changeTheme() {
        if (!backgroundColorPc.style.backgroundColor) {
            backgroundColorPc.style.backgroundColor = "var(--color-primary)";
        }
        for (let i = 0; i < themes.length; i++) {
            themes[i].onclick = () => {
                selected = themes[i];
                // change styling according to selection in themelist
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
                setTheme('theme-' + selectedTheme);
                prevTheme = currentTheme;
                currentTheme = 'theme-' + selectedTheme;
            }
        }
        // when confirmed, change whole styling
        buttons[0].onclick = () => {
            buttons[0].active = true;
            settingsWindow.hidden = true;
        }

        // when canceled, go back to old theme
        buttons[1].onclick = () => {
            monitor.style.backgroundColor = "var(--color-primary)";
            settingsWindow.hidden = true;
            setTheme(prevTheme);
        }
    }

    /* sets the selected image as background */
    function setImage(selectedImage, title, artist) {
        const artistInsta = document.getElementById("insta-artist");

        if (selectedImage === "none") {
            chosenBackgroundImage.hidden = true;
            backgroundImagePc.hidden = true;
            artistInsta.hidden = true;
        } else {
            // add artist link
            if (artist) {
                artistInsta.hidden = false;
                if (artist === "kathi") {
                    artistInsta.innerHTML = "by @katharina.michalsky";
                    artistInsta.href = "https://www.instagram.com/katharina.michalsky";
                    chosenBackgroundImage.style.width = "450";
                } else if (artist === "shruti") {
                    artistInsta.innerHTML = "by @shrooodi";
                    artistInsta.href = "https://www.instagram.com/shrooodi";
                    chosenBackgroundImage.style.width = "450";
                } else if (artist === "chris") {
                    artistInsta.innerHTML = "by @iti.art";
                    artistInsta.href = "https://www.instagram.com/iti.art";
                    chosenBackgroundImage.style.width = "450";
                } else if (artist === "djamillia") {
                    artistInsta.innerHTML = "by @manush420";
                    artistInsta.href = "https://www.instagram.com/manush420"
                    chosenBackgroundImage.style.width = "800";
                } else {
                    return
                }
            } else {
                artistInsta.hidden = true;
                chosenBackgroundImage.style.width = "450";
            }
            // add image to both backgrounds (pc and real display)
            // chosenBackgroundImage.hidden = false;
            chosenBackgroundImage.src = "./images/" + selectedImage + ".png";
            chosenBackgroundImage.alt = title;
            backgroundImagePc.hidden = false;
            backgroundImagePc.src = "./images/" + selectedImage + ".png";
            backgroundImagePc.alt = title;
        }
    }

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
                prevImage = currentImage;
                prevTitle = currentTitle;
                prevArtist = currentArtist;
                currentImage = selectedImage;
                currentTitle = title;
                currentArtist = images[i].id;
            }
        }
        // when confirmed, change whole styling
        buttons[0].onclick = () => {
            buttons[0].active = true;
            settingsWindow.hidden = true;
        }

        // when canceled, go back to old theme
        buttons[1].onclick = () => {
            monitor.style.backgroundColor = "var(--color-primary)";
            settingsWindow.hidden = true;
            setImage(prevImage, prevTitle, prevArtist);
            setTheme(prevTheme);
        }
    }
}