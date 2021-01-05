"use strict";

function Settings() {
  // global variables
  var clickSettingsMenu = document.querySelector(".settings");
  var themes = document.getElementsByClassName("theme");
  var settingsWindow = document.getElementsByClassName("settings-window ")[0];
  var images = document.getElementsByClassName("display__props-background-image");
  var chosenBackgroundImage = document.querySelector(".monitor__background-img");
  var backgroundImagePc = document.getElementsByClassName("pc__background-img")[0];
  var closeSettings = document.getElementsByClassName("settings-exit")[0];
  var currentTheme = document.getElementsByTagName("html")[0].className;
  var currentImage;
  /* open settings when clicked on menu */

  clickSettingsMenu.onclick = function () {
    settingsWindow.hidden = false;
  };
  /* close settings when clicked on x*/


  closeSettings.onclick = function () {
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
      return;
    }

    localStorage.setItem('theme', themeName);
  }

  function getCurrentTheme() {
    return localStorage.getItem('theme') || "theme-purplelady";
  }
  /* changes chosen theme */


  function chooseTheme() {
    var _loop = function _loop(i) {
      themes[i].onclick = function () {
        selected = themes[i]; // change styling according to selection in themelist

        var activeTheme = document.querySelector(".theme.active");

        if (activeTheme) {
          activeTheme.classList.remove("active");
        }

        selected.classList.add("active"); // change to selected color on pc display

        var selectedTheme = themes[i].innerHTML.toLowerCase().split(" ").join("");
        previewTheme('theme-' + selectedTheme);
        currentTheme = 'theme-' + selectedTheme;
      };
    };

    for (var i = 0; i < themes.length; i++) {
      _loop(i);
    }
  }
  /* sets the selected image as background */


  function previewImage(_ref) {
    var selectedImage = _ref.selectedImage,
        title = _ref.title,
        artist = _ref.artist;
    var artistInsta = document.querySelector(".link__instagram");

    if (selectedImage === "none") {
      chosenBackgroundImage.hidden = true;
      backgroundImagePc.hidden = true;
      artistInsta.hidden = true;
    } else {
      if (artist) {
        artistInsta.hidden = false;

        switch (artist) {
          case "kathi":
            artistInsta.innerHTML = "by @katharina.michalsky";
            artistInsta.href = "https://www.instagram.com/katharina.michalsky";
            chosenBackgroundImage.style.width = "450";
            break;

          case "chris":
            artistInsta.innerHTML = "by @iti.art";
            artistInsta.href = "https://www.instagram.com/iti.art";
            chosenBackgroundImage.style.width = "450";
            break;

          case "shruti":
            artistInsta.innerHTML = "by @shrooodi";
            artistInsta.href = "https://www.instagram.com/shrooodi";
            chosenBackgroundImage.style.width = "1200";
            break;

          case "djamillia":
            artistInsta.innerHTML = "by @manush420";
            artistInsta.href = "https://www.instagram.com/manush420";
            chosenBackgroundImage.style.width = "800";
            break;

          case "vika":
            artistInsta.innerHTML = "by @uuuuuvika";
            artistInsta.href = "https://www.instagram.com/uuuuuvika";
            chosenBackgroundImage.style.width = "450";
            break;
        }
      } else {
        artistInsta.hidden = true;
        chosenBackgroundImage.style.width = "450";
      } // add image to both backgrounds (pc and real display)


      chosenBackgroundImage.src = selectedImage;
      chosenBackgroundImage.alt = title;
      backgroundImagePc.hidden = false;
      backgroundImagePc.src = selectedImage;
      backgroundImagePc.alt = title;
    }
  }

  function getCurrentImage() {
    var storedImage = localStorage.getItem("display__props-background-image");
    return Boolean(storedImage) ? JSON.parse(storedImage) : {
      selectedImage: "none"
    };
  }

  function storeImage(image) {
    if (!image) {
      return;
    }

    localStorage.setItem("display__props-background-image", JSON.stringify(image));
  }

  function chooseImage() {
    var _loop2 = function _loop2(i) {
      // if image is selected
      images[i].onclick = function () {
        selected = images[i]; // change styling according to selection in themelist

        var activeImage = document.querySelector(".display__props-background-image.active");

        if (activeImage) {
          activeImage.classList.remove("active");
        }

        selected.classList.add("active");
        var title = images[i].innerHTML;
        selectedImage = images[i].dataset.url;
        currentImage = {
          title: title,
          selectedImage: selectedImage,
          artist: images[i].id
        }; // change to selected image on pc display

        previewImage(currentImage);
      };
    };

    for (var i = 0; i < images.length; i++) {
      _loop2(i);
    }
  }
  /* Buttons  */


  var okButton = document.querySelector("[data-ok]");
  var cancelButton = document.querySelector("[data-cancel]");

  okButton.onclick = function () {
    okButton.active = true;
    storeImage(currentImage); // setting.storeCurrentValue(currentImage, "display__props-background-image")

    storeTheme(currentTheme);
    settingsWindow.hidden = true;
  };

  cancelButton.onclick = function () {
    previewTheme(getCurrentTheme());
    previewImage(getCurrentImage());
    settingsWindow.hidden = true;
  };
} // class Setting {
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