function starField() {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext("2d");
  let contactContent = document.getElementById("contact-content");
  let contactTextBox = document.querySelector(".textbox-contact");

  let w;
  let h;

  // canvas should always match the window size
  const setCanvasExtents = () => {
    w = contactContent.clientWidth;
    h = contactContent.clientHeight;
    if (w == 0) {
      w = contactTextBox.clientWidth;
      h = contactTextBox.clientHeight;
    }
    canvas.width = w;
    canvas.height = h;
  };

  setCanvasExtents();

  // make sure resolution of canvas responds to resize
  window.onresize = () => {
    setCanvasExtents();
  };

  // creates the stars, random values in a given range
  const makeStars = (count) => {
    const output = [];
    for (let i = 0; i < count; i++) {
      const star = {
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      };
      output.push(star);
    }
    // returns array with stars
    return output;
  };

  let stars = makeStars(10000);

  // creates the black background
  const clear = () => {
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
  };

  // how bright is the pixel?
  const putPixel = (x, y, brightness) => {
    const intensity = brightness * 350;
    const rgb = "rgb(" + intensity + "," + intensity + "," + intensity + ")";
    c.fillStyle = rgb;
    c.fillRect(x, y, 1, 1);
  };

  const moveStars = (distance) => {
    const count = stars.length;
    for (var i = 0; i < count; i++) {
      const s = stars[i];
      s.z -= distance;
      while (s.z <= 1) {
        s.z += 1000;
      }
    }
  };

  let prevTime;
  const init = (time) => {
    prevTime = time;
    requestAnimationFrame(tick);
  };

  const tick = (time) => {
    let elapsed = time - prevTime;
    prevTime = time;

    moveStars(elapsed * 0.3);

    clear();
    c.font = "24px Sans-Serif";
    c.textAlign = "center";
    c.fillStyle = "grey";
    c.fillText(`Currently looking for new opportunities`, w / 2, h / 2.6, w);
    c.fillText(`Feel free to get in touch `,
      w / 2,
      h / 2.2
    );
    c.font = "20px Sans-Serif";
    c.fillText(`nrubin222@gmail.com`, w / 2, h / 1.9);

    let img = new Image();
    img.addEventListener("load", function () { });
    const cx = w / 2;
    const cy = h / 2;

    const count = stars.length;
    for (var i = 0; i < count; i++) {
      const star = stars[i];

      const x = cx + star.x / (star.z * 0.001);
      const y = cy + star.y / (star.z * 0.001);

      if (x < 0 || x >= w || y < 0 || y >= h) {
        continue;
      }

      const d = star.z / 1000.0;
      const b = 1 - d * d;

      putPixel(x, y, b);
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(init);
}
// credits for code https://codesandbox.io/s/lucid-fast-0v7ch
