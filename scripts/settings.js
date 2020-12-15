function Settings() {
    // global variables
    const clickSettingsMenu = document.querySelector(".settings");
    const themes = document.getElementsByClassName("theme");
    const settingsWindow = document.getElementsByClassName("settings-window ")[0];
    const images = document.getElementsByClassName("display-img");
    const chosenBackgroundImage = document.getElementById("chosen-background-img");
    const backgroundImagePc = document.getElementsByClassName("pc-bg-img")[0];
    const closeSettings = document.getElementsByClassName("closeme-settings")[0];
    let currentTheme = document.getElementsByTagName("html")[0].className;
    let currentImage;


    /* open settings when clicked on menu */
    clickSettingsMenu.onclick = () => {
        settingsWindow.hidden = false;
    }

    /* close settings when clicked on x*/
    closeSettings.onclick = () => {
        settingsWindow.hidden = true;
    };

    changeTheme();
    previewTheme(getCurrentTheme());
    changeImage();
    previewImage(getCurrentImage());

    /* set a given theme/color-scheme */
    function previewTheme(themeName) {
        document.documentElement.className = themeName;
    }

    function storeTheme(themeName) {
        localStorage.setItem('theme', themeName);
    }

    function getCurrentTheme() {
        return localStorage.getItem('theme') || "theme-purplelady";
    }

    /* changes chosen theme */
    function changeTheme() {

        for (let i = 0; i < themes.length; i++) {
            themes[i].onclick = () => {
                selected = themes[i];
                // change styling according to selection in themelist
                let activeTheme = document.querySelector(".theme.active");

                if (activeTheme) {
                    activeTheme.classList.remove("active");
                }
                selected.classList.add("active");

                // change to selected color on pc display
                let selectedTheme = themes[i].innerHTML.toLowerCase().split(" ").join("");

                previewTheme('theme-' + selectedTheme);
                currentTheme = 'theme-' + selectedTheme;
            }
        }

    }

    /* sets the selected image as background */
    function previewImage({ selectedImage, title, artist }) {
        const artistInsta = document.getElementById("insta-artist");

        if (selectedImage === "none") {
            chosenBackgroundImage.hidden = true;
            backgroundImagePc.hidden = true;
            artistInsta.hidden = true;
        } else {
            // add artist link

            //verander naar switch
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
            chosenBackgroundImage.src = selectedImage;
            chosenBackgroundImage.alt = title;
            backgroundImagePc.hidden = false;
            backgroundImagePc.src = selectedImage;
            backgroundImagePc.alt = title;
        }
    }

    function getCurrentImage() {
        let storedImage = localStorage.getItem("display-img");
        return storedImage ? JSON.parse(storedImage) : { selectedImage: "none" }
    }

    function storeImage(image) {
        localStorage.setItem("display-img", JSON.stringify(image));
    }

    function changeImage() {
        for (let i = 0; i < images.length; i++) {
            // if image is selected
            images[i].onclick = () => {
                selected = images[i];
                // change styling according to selection in themelist
                let activeImage = document.querySelector(".display-img.active");
                if (activeImage) {
                    activeImage.classList.remove("active");
                }
                selected.classList.add("active");

                let title = images[i].innerHTML;
                selectedImage = images[i].dataset.url;
                currentImage = {
                    title: title,
                    selectedImage: selectedImage,
                    artist: images[i].id
                }

                // change to selected image on pc display
                previewImage(currentImage);
            }
        }
    }
    const okButton = document.querySelector("[data-ok]");
    const cancelButton = document.querySelector("[data-cancel]");

    okButton.onclick = () => {
        okButton.active = true;
        storeImage(currentImage);
        storeTheme(currentTheme);
        settingsWindow.hidden = true;
    }

    cancelButton.onclick = () => {
        previewTheme(getCurrentTheme());
        previewImage(getCurrentImage());
        settingsWindow.hidden = true;
    }
}

