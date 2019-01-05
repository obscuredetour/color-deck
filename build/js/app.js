
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
    "#swatch": {
      "background-color": "$color"
    }
  }
});
const sValue = document.getElementById("sValue");
const sSlider = document.getElementById("sSlider");
let sSliderValue = sSlider.value;


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

  let saturation = colorPicker.color.hsl.s;
  sValue.innerHTML = saturation;
  
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
  if(changes.s) {
    // console.log(color.hsl.s);
    sSlider.value = color.hsl.s;
  }

  sSlider.addEventListener('change', () => {
    // get color
    let currentColor = color.hsl;
    let newColor = currentColor;

    newColor.s = Number(sSlider.value);

    // set new color
    colorPicker.color.hsl = newColor;

    // changes to sliders change color picker
    // color.hsl.s = Number(sSlider.value);
  
    sValue.innerHTML = sSlider.value;
  
    // if(sSliderValue) {
    //   colorPicker.color.hsl.s = sSliderValue;
    // }
  });

  
});





// eHSL.innerHTML = hsl;