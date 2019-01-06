// thanks stackoverflow
function getStartColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


// initial color picker
const colorPicker = new iro.ColorPicker("#iro-wrapper", {
  width: 320,
  height: 320,
  color: getStartColor(),
  markerRadius: 8,
  padding: 4,
  sliderMargin: 24,
  sliderHeight: 36,
  borderWidth: 3,
  borderColor: "#1d1d1d",
  anticlockwise: true,
  // Dynamic CSS guide: https://iro.js.org/guide.html#Dynamic-CSS
  css: {
    "#swatch, .slider": {
      "background-color": "$color"
    },
    ".s-controls__slider, .l-controls__slider": {
      "background-color": "$color"
    }
  }
});
const hexInput = document.getElementById("hexInput");
const rgbInput = document.getElementById("rgbInput");
const hslInput = document.getElementById("hslInput");
const hInput = document.getElementById("hInput");
const hValue = document.getElementById("hValue");
const hSlider = document.getElementById("hSlider");

const sInput = document.getElementById("sInput");
const sValue = document.getElementById("sValue");
const sSlider = document.getElementById("sSlider");

const lInput = document.getElementById("lInput");
const lValue = document.getElementById("lValue");
const lSlider = document.getElementById("lSlider");


// const values = document.getElementById("values");
// const css = document.getElementById("css");

// https://iro.js.org/guide.html#color-change
colorPicker.on("color:change", function(color) {
  // Show the current color in different formats
  // Using the selected color: https://iro.js.org/guide.html#Using-the-Selected-Color
  // values.innerHTML = [
  //   "hex: " + color.hexString,
  //   "rgb: " + color.rgbString,
  //   "hsl: " + color.hslString,
  // ].join("<br>");

  // get current color channels
  let hex = colorPicker.color.hexString;
  let rgb = colorPicker.color.rgbString;
  let hsl = colorPicker.color.hslString;
  let hue = colorPicker.color.hsl.h;
  let saturation = colorPicker.color.hsl.s;
  let lightness = colorPicker.color.hsl.l;

  // set color channels
  hValue.innerHTML = hue;
  hInput.value = hue;
  hslInput.value = hsl;
  hexInput.value = hex;
  rgbInput.value = rgb;

  sValue.innerHTML = saturation + '%';
  sInput.value = saturation;

  lValue.innerHTML = lightness + '%';
  lInput.value = lightness;
  
  
});

colorPicker.on("color:change", function(color, changes) {
  
  // get current color
  let currentColor = color.hsl;
  let hslString = color.hslString;
  let hexString = color.hexString;
  let rgbString = color.rgbString;

   // changes to color picker change sliders
  if(changes.h) {
    hSlider.value = color.hsl.h;
  }
  if(changes.s) {
    sSlider.value = color.hsl.s;
  }
  if(changes.s || changes.v) {
    lSlider.value = color.hsl.l;
  }
  // does not work
  // if(changes.l) {
  //   lSlider.value = color.hsl.l;
  // }
  // console.log(changes.l); //undefined

  const sliderChange = () => {

    // create new color object & string
    let newColor = currentColor,
      newHslString = hslString,
      newHexString = hexString,
      newRgbString = rgbString;
    // replace new colors with slider values (chg to #)
    newColor.h = Number(hSlider.value);
    newColor.s = Number(sSlider.value);
    newColor.l = Number(lSlider.value);
    // set new color
    colorPicker.color.hsl = newColor;
  
    hValue.innerHTML = hSlider.value;
    sValue.innerHTML = sSlider.value + "%";
    lValue.innerHTML = lSlider.value + "%";
  };
  const inputChange = () => {

    // create new color object & string
    let newColor = currentColor,
      newHslString = hslString,
      newHexString = hexString,
      newRgbString = rgbString;

    // replace new colors with slider values (chg to #)
    newColor.h = Number(hInput.value);
    newColor.s = Number(sInput.value);
    newColor.l = Number(lInput.value);
    newHslString = hslInput.value;
    newHexString = hexInput.value;
    newRgbString = rgbInput.value;

    // set new color
    colorPicker.color.hsl = newColor;
    // let hsl = iro.Color.parseHslStr(newHslString);
    // let hex = iro.Color.parseHexStr(newHexString);
    // let rgb = iro.Color.parseRgbStr(newRgbString);
    // colorPicker.color.hsl = hsl;
    // colorPicker.color.hex = hex;
    // colorPicker.color.rgb = rgb;
  
    hValue.innerHTML = hInput.value;
    sValue.innerHTML = sInput.value + "%";
    lValue.innerHTML = lInput.value + "%";

    // hslInput.value = newHslString;
    // hexInput.value = newHexString;
    // rgbInput.value = newRgbString;
  };

  hSlider.addEventListener('change', sliderChange);
  sSlider.addEventListener('change', sliderChange);
  lSlider.addEventListener('change', sliderChange);

  // hexInput.addEventListener('change', inputChange);
  // rgbInput.addEventListener('change', inputChange);
  // hslInput.addEventListener('change', inputChange);
  hInput.addEventListener('change', inputChange);
  sInput.addEventListener('change', inputChange);
  lInput.addEventListener('change', inputChange);

});

