function dragMobile() {
    /* DRAGGABLE */
    // Make the desktop icons draggable
    // const desktopIcons = document.getElementsByClassName("desktop-icon");
    // for (let i = 0; i < desktopIcons.length; i++) {
    //     dragElement(desktopIcons[i]);
    // }

    let dragActive = false;
    const windows = document.getElementsByClassName("window");
    for (let i = 0; i < windows.length; i++) {
        dragElement(windows[i]);
    }

    function dragElement(elmnt) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        elmnt.addEventListener("touchstart", dragMouseDown, { capture: "false", passive: "false" });

        function dragMouseDown(e) {
            e = e || window.event;
            // e.preventDefault();
            dragActive = true;
            // get the touch position at start
            pos3 = e.touches[0].clientX;
            console.log(e.touches[0]);
            pos4 = e.touches[0].clientY;
            document.addEventListener("touchmove", elementDrag, { capture: "false", passive: "false" });
            document.addEventListener("touchend", closeDragElement, { capture: "false", passive: "false" });
            // call a function whenever the cursor moves:

            function elementDrag(e) {
                e = e || window.event;
                // e.preventDefault();

                const { innerWidth, innerHeight } = window;
                // calculate the new cursor position:
                pos1 = pos3 - e.touches[0].clientX;
                pos2 = pos4 - e.touches[0].clientY;
                pos3 = e.touches[0].clientX;
                pos4 = e.touches[0].clientY;

                // when mouse leaves monitor, leave element behind
                if (e.touches[0].clientX > innerWidth || e.touches[0].clientY > innerHeight) {
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
        }
        function closeDragElement() {
            // stop moving when mouse button is released:
            document.ontouchend = () => { return }
            document.ontouchmove = () => { return }
        }
    }
}


