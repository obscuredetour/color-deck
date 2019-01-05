
// DOM components
const eHSL = document.getElementById('hsl');

// initial color picker
const colorPicker = new iro.ColorPicker("#iro-wrapper", {
  width: 320,
  height: 320,
  color: {r: 252, g: 11, b: 23},
  markerRadius: 8,
  padding: 4,
  sliderMargin: 24,
  sliderHeight: 36,
  borderWidth: 1,
  borderColor: "#eee",
  anticlockwise: true,
  // Dynamic CSS guide: https://iro.js.org/guide.html#Dynamic-CSS
  css: {
    "#swatch, .slider": {
      "background-color": "$color"
    }
  }
});
const hValue = document.getElementById("hValue");
const hSlider = document.getElementById("hSlider");

const sValue = document.getElementById("sValue");
const sSlider = document.getElementById("sSlider");

const lValue = document.getElementById("lValue");
const lSlider = document.getElementById("lSlider");


const values = document.getElementById("values");
const css = document.getElementById("css");

// https://iro.js.org/guide.html#color-change
colorPicker.on("color:change", function(color) {
  // Show the current color in different formats
  // Using the selected color: https://iro.js.org/guide.html#Using-the-Selected-Color
  values.innerHTML = [
    "hex: " + color.hexString,
    "rgb: " + color.rgbString,
    "hsl: " + color.hslString,
  ].join("<br>");

  let hue = colorPicker.color.hsl.h;
  let saturation = colorPicker.color.hsl.s;
  let lightness = colorPicker.color.hsl.l;
  hValue.innerHTML = hue;
  sValue.innerHTML = saturation + '%';
  lValue.innerHTML = lightness + '%';
  
  // Get the dynamic stylesheet content and pretty-print it by replacing newlines and tabs with suitable html
  var cssText = colorPicker.stylesheet.cssText;
  // css.innerHTML = cssText.replace(/([\n\t])/g, function($1){
  //   switch($1) {
  //     case "\n": return "<br>";
  //     case "\t": return "&nbsp;&nbsp;";
  //   }
  // });
});

colorPicker.on("color:change", function(color, changes) {
  // Log the color's hex RGB value to the dev console
  // console.log(color.hslString);
  // If the "S" channel has changed, log the color's HSL (saturation) value too

  // changes to color picker change sliders
  if(changes.h) {
    hSlider.value = color.hsl.h;
  }
  if(changes.s) {
    sSlider.value = color.hsl.s;
  }
  if(changes.l) {
    lSlider.value = color.hsl.l;
  }

  const sliderChange = () => {
    // get color
    let currentColor = color.hsl;
    let newColor = currentColor;

    newColor.h = Number(hSlider.value);
    newColor.s = Number(sSlider.value);
    newColor.l = Number(lSlider.value);

    // set new color
    colorPicker.color.hsl = newColor;
  
    hValue.innerHTML = hSlider.value;
    sValue.innerHTML = sSlider.value;
    lValue.innerHTML = lSlider.value;
  };

  hSlider.addEventListener('change', sliderChange);
  sSlider.addEventListener('change', sliderChange);
  lSlider.addEventListener('change', sliderChange);



  
});





// eHSL.innerHTML = hsl;