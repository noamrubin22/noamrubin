function Settings() {
    // global variables
    const clickSettingsMenu = document.querySelector(".settings");
    const themes = document.getElementsByClassName("theme");
    const settingsWindow = document.getElementsByClassName("settings-window ")[0];
    const images = document.getElementsByClassName("display__props-background-image");
    const chosenBackgroundImage = document.querySelector(".monitor__background-img");
    const backgroundImagePc = document.getElementsByClassName("pc__background-img")[0];
    const closeSettings = document.getElementsByClassName("settings-exit")[0];
    let currentTheme = document.getElementsByTagName("html")[0].className;
    let currentImage;

    /* open settings when clicked on menu */
    clickSettingsMenu.onclick = () => {
        settingsWindow.hidden = false;
    }

    /* close settings when clicked on x*/
    closeSettings.onclick = () => {
        settingsWindow.hidden = true;
        previewTheme(getCurrentTheme());
        previewImage(getCurrentImage());
        settingsWindow.hidden = true;
    };

    chooseTheme();
    previewTheme(getCurrentTheme());
    chooseImage();
    previewImage(getCurrentImage());

    /* set a given theme/color-scheme */
    function previewTheme(themeName) {
        document.documentElement.className = themeName;
    }

    function storeTheme(themeName) {
        if (!themeName) {
            return
        }
        localStorage.setItem('theme', themeName);
    }

    function getCurrentTheme() {
        return localStorage.getItem('theme') || "theme-purplelady";
    }

    /* changes chosen theme */
    function chooseTheme() {

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
        const artistInsta = document.querySelector(".link__instagram");

        // if (selectedImage === "none") {
        //     chosenBackgroundImage.hidden = true;
        //     backgroundImagePc.hidden = true;
        //     artistInsta.hidden = true;
        // } else {
        if (artist) {
            artistInsta.hidden = false;
            switch (artist) {
                case "kathi":
                    artistInsta.innerHTML = "artwork by @katharina.michalsky";
                    artistInsta.href = "https://www.instagram.com/katharina.michalsky";
                    chosenBackgroundImage.style.width = "32rem";
                    break;
                case "chris":
                    artistInsta.innerHTML = "artwork by @iti.art";
                    artistInsta.href = "https://www.instagram.com/iti.art";
                    chosenBackgroundImage.style.width = "32rem";
                    break;
                case "shruti":
                    artistInsta.innerHTML = "artwork by @shrooodi";
                    artistInsta.href = "https://www.instagram.com/shrooodi";
                    chosenBackgroundImage.style.width = "32rem";
                    break;
                case "djamillia":
                    artistInsta.innerHTML = "artwork by @manush420";
                    artistInsta.href = "https://www.instagram.com/manush420"
                    chosenBackgroundImage.style.width = "54rem";
                    break;
                case "vika":
                    artistInsta.innerHTML = "artwork by @uuuuuvika";
                    artistInsta.href = "https://www.instagram.com/uuuuuvika"
                    chosenBackgroundImage.style.width = "32rem";
                    break;
                case "yossi":
                    artistInsta.innerHTML = "artwork by @yoshikame_";
                    artistInsta.href = "https://www.instagram.com/yoshikame_"
                    chosenBackgroundImage.style.width = "54rem";
                    break;
            }
        } else {
            artistInsta.hidden = true;
            chosenBackgroundImage.style.width = "450";
        }

        // add image to both backgrounds (pc and real display)
        chosenBackgroundImage.src = selectedImage;
        chosenBackgroundImage.alt = title;
        backgroundImagePc.hidden = false;
        backgroundImagePc.src = selectedImage;
        backgroundImagePc.alt = title;
    }

    function getCurrentImage() {
        const storedImage = localStorage.getItem("display__props-background-image");
        return Boolean(storedImage) ? JSON.parse(storedImage) : { selectedImage: "none" }
    }

    function storeImage(image) {
        if (!image) {
            return
        }
        localStorage.setItem("display__props-background-image", JSON.stringify(image));
    }

    function chooseImage() {
        for (let i = 0; i < images.length; i++) {
            // if image is selected
            images[i].onclick = () => {
                selected = images[i];
                // change styling according to selection in themelist
                let activeImage = document.querySelector(".display__props-background-image.active");
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

    /* Buttons  */
    const okButton = document.querySelector("[data-ok]");
    const cancelButton = document.querySelector("[data-cancel]");

    okButton.onclick = () => {
        okButton.active = true;
        storeImage(currentImage);
        // setting.storeCurrentValue(currentImage, "display__props-background-image")
        storeTheme(currentTheme);
        settingsWindow.hidden = true;
    }

    cancelButton.onclick = () => {
        previewTheme(getCurrentTheme());
        previewImage(getCurrentImage());
        settingsWindow.hidden = true;
    }
}

// class Setting {
//     constructor(props) {
//         this.props = props;
//         this.storeCurrentValue(nextValue, className);
//         this.getCurrentValue(className);
//         // this.setCurrentValue(nextValue);
//     }

//     storeCurrentValue(nextValue, className) {
//         if (!nextValue) {
//             return
//         }
//         localStorage.setItem(className, JSON.stringify(nextValue));
//     }

//     getCurrentValue(className) {
//         const storedElement = localStorage.getItem(className);
//         if (className === "theme") {
//             return Boolean(storedElement) || "theme-purplelady";
//         } else {
//             return Boolean(storedElement) ? JSON.parse(storedElement) : { selectedImage: "none" }
//         }
//     }
// }

// const setting = new Setting()

// currentValue = 'some value'
// tempValue = undefined
// setCurrentValue(nextValue) {
//     this.currentValue = nextValue
// }


// setting.setCurrentValue('sadasdjasd')

// {
//     currentValue: 'some value',
//         tempValue : undefined
// }

