function Settings() {
    // global variables
    const clickSettingsMenu = document.querySelector(".settings");
    const themes = document.getElementsByClassName("theme");
    const settingsWindow = document.getElementsByClassName("settings-window ")[0];
    const images = document.getElementsByClassName("display__props-background-image");
    const chosenBackgroundImage = document.querySelector(".monitor__background-img");
    const backgroundImagePc = document.getElementsByClassName("pc__background-img")[0];
    const closeSettings = document.getElementsByClassName("settings-exit")[0];
    const desktopIconsText = document.getElementsByClassName("desktop-icon__text")[1];
    let currentTheme = document.getElementsByTagName("html")[0].className;
    let currentImage;
    let selectedImage;

    console.log(images);
    console.log(document.getElementById("djamillia"));
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
    getCurrentImage();
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
        const classes = ["vika", "djamillia", "kathi", "chris", "shruti", "yossi1", "yossi2", "since95"];

        if (artist) {
            console.log(artist);
            artistInsta.hidden = false;
            switch (artist) {
                case "kathi":
                    artistInsta.innerHTML = "artwork by @katharina.michalsky";
                    artistInsta.href = "https://www.instagram.com/katharina.michalsky";
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break;
                case "chris":
                    artistInsta.innerHTML = "artwork by @iti.art";
                    artistInsta.href = "https://www.instagram.com/iti.art";
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break;
                case "shruti":
                    artistInsta.innerHTML = "artwork by @shrooodi";
                    artistInsta.href = "https://www.instagram.com/shrooodi";
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break;
                case "djamillia":
                    artistInsta.innerHTML = "artwork by @manush420";
                    artistInsta.href = "https://www.instagram.com/manush420"
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break;
                case "vika":
                    artistInsta.innerHTML = "artwork by @uuuuuvika";
                    artistInsta.href = "https://www.instagram.com/uuuuuvika";
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break;
                case "yossi1":
                    artistInsta.innerHTML = "artwork by @yoshikame_";
                    artistInsta.href = "https://www.instagram.com/yoshikame_";
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break;
                case "yossi2":
                    artistInsta.innerHTML = "artwork by @yoshikame_";
                    artistInsta.href = "https://www.instagram.com/yoshikame_";
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break
                case "since95":
                    artistInsta.hidden = true;
                    chosenBackgroundImage.classList.remove(...classes);
                    chosenBackgroundImage.classList.add(artist);
                    backgroundImagePc.classList.remove(...classes);
                    backgroundImagePc.classList.add(artist);
                    break
            }
        } else {
            console.log("no");
        }

        // props 
        // artistText
        // artistInstaLink
        // hasInstagram = true or false

        // spefifyArtworkStyling() shuuld 
        // remove all classnames
        // add artist name as classname
        // add text and link

        // previewBackground() 
        // add image to both backgrounds (pc and real display)
        chosenBackgroundImage.src = selectedImage;
        chosenBackgroundImage.alt = title;
        chosenBackgroundImage.id = artist;
        backgroundImagePc.hidden = false;
        backgroundImagePc.src = selectedImage;
        backgroundImagePc.alt = title;
    }


    const kathiProps = {
        artist: "kathi",
        artistText: "artwork by @katharina.michalsky",
        artistInstaLink: "https://www.instagram.com/katharina.michalsky",
        hasInstagram: true,
        title: "Landscape",
    }

    const yossiDesktopProps = {
        artist: "yossi1",
        artistText: "artwork by @yoshikame_",
        artistInstaLink: "https://www.instagram.com/yoshikame_",
        hasInstagram: true,
        title: "Pasha",
    }

    const yossiMobileProps = {
        artist: "yossi2",
        artistText: "artwork by @yoshikame_",
        artistInstaLink: "https://www.instagram.com/yoshikame_",
        hasInstagram: true,
        title: "Pasha",
    }

    const djamilliaProps = {
        artist: "djamillia",
        artistText: "artwork by @manush420",
        artistInstaLink: "https://www.instagram.com/manush420",
        hasInstagram: true,
        title: "Ich Gebäre dich",
    }

    const shrutiProps = {
        artist: "shruti",
        artistText: "artwork by @shrooodi",
        artistInstaLink: "https://www.instagram.com/shrooodi",
        hasInstagram: true,
        title: "High_Rise",
    }

    const chrisProps = {
        artist: "chris",
        artistText: "artwork by @iti.art",
        artistInstaLink: "https://www.instagram.com/iti.art",
        hasInstagram: true,
        title: "Inner Floating",
    }

    const vikaProps = {
        artist: "vika",
        artistText: "artwork by @uuuuuvika",
        artistInstaLink: "https://www.instagram.com/uuuuuvika",
        hasInstagram: true,
        title: "Peaceful Warrior",
    }

    const since95Props = {
        artist: "since95",
        hasInstagram: false,
        title: "90iesKid",
    }

    class Artwork {
        constructor(props) {
            this.props = props;
            this.specifyStyling();
            this.previewArtwork();
        }

        specifyStyling() {
            const instagramLink = document.querySelector(".link__instagram");
            const chosenBackgroundImage = document.querySelector(".monitor__background-img");
            const artists = ["vika", "djamillia", "kathi", "chris", "shruti", "yossi1", "yossi2", "since95"];

            chosenBackgroundImage.classList.remove(...artists);
            chosenBackgroundImage.classList.add(this.props.artist);

            if (this.props.hasInstagram) {
                instagramLink.hidden = false;
                instagramLink.innerHTML = this.props.artistText;
                instagramLink.href = this.props.artistInstaLink;
            } else {
                instagramLink.hidden = true;
            }
        }

        previewArtwork() {
            const backgroundImagePc = document.getElementsByClassName("pc__background-img")[0];
            chosenBackgroundImage.src = selectedImage;
            chosenBackgroundImage.alt = this.title;
            chosenBackgroundImage.id = this.artist;
            backgroundImagePc.hidden = false;
            backgroundImagePc.src = selectedImage;
            backgroundImagePc.alt = this.title;
        }
    }


    // new Artwork(kathiProps);
    // new Artwork(djamilliaProps);
    // new Artwork(yossiDesktopProps);
    // new Artwork(yossiMobileProps);
    // new Artwork(shrutiProps);
    // new Artwork(chrisProps);
    // new Artwork(since95Props);
    // new Artwork(vikaProps);

    function getCurrentImage() {
        const storedImage = localStorage.getItem("display__props-background-image");
        return Boolean(storedImage) ? JSON.parse(storedImage) : { selectedImage: "../images/90ieskid.png" }
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

