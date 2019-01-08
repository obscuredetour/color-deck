// thanks stackoverflow
getStartColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Start Color Picker
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

// Start clipboard module
new ClipboardJS('.hsl-copy-button');
new ClipboardJS('.hex-copy-button');
new ClipboardJS('.rgb-copy-button');

// DOM objects
const elements = {
  colorControls: document.querySelector(".color-controls"),
  colorInput: document.querySelector(".color-input"),
  hslCopyValue: document.querySelector(".hsl-copy-text"),
  hexCopyValue: document.querySelector(".hex-copy-text"),
  rgbCopyValue: document.querySelector(".rgb-copy-text"),
  hslCopyButton: document.querySelector(".hsl-copy-button"),
  hexCopyButton: document.querySelector(".hex-copy-button"),
  rgbCopyButton: document.querySelector(".rgb-copy-button"),
  hslTooltip: document.querySelector(".hsl-tip"),
  hexTooltip: document.querySelector(".hex-tip"),
  rgbTooltip: document.querySelector(".rgb-tip"),
  hInput: document.querySelector(".h-input"),
  hValue: document.querySelector(".h-value"),
  hSlider: document.querySelector(".h-slider"),
  sInput: document.querySelector(".s-input"),
  sValue: document.querySelector(".s-value"),
  sSlider: document.querySelector(".s-slider"),
  lInput: document.querySelector(".l-input"),
  lValue: document.querySelector(".l-value"),
  lSlider: document.querySelector(".l-slider"),
  savedColorContainer: document.querySelector(".saved-color"),
  saveColorButton: document.querySelector(".save-color-button")
}

const colorInput = document.querySelector(".color-input"),
  hslCopyValue = document.querySelector(".hsl-copy-text"),
  hexCopyValue = document.querySelector(".hex-copy-text"),
  rgbCopyValue = document.querySelector(".rgb-copy-text"),
  hslCopyButton = document.querySelector(".hsl-copy-button"),
  hexCopyButton = document.querySelector(".hex-copy-button"),
  rgbCopyButton = document.querySelector(".rgb-copy-button"),
  hslTooltip = document.querySelector(".hsl-tip"),
  hexTooltip = document.querySelector(".hex-tip"),
  rgbTooltip = document.querySelector(".rgb-tip"),
  hInput = document.querySelector(".h-input"),
  hValue = document.querySelector(".h-value"),
  hSlider = document.querySelector(".h-slider"),
  sInput = document.querySelector(".s-input"),
  sValue = document.querySelector(".s-value"),
  sSlider = document.querySelector(".s-slider"),
  lInput = document.querySelector(".l-input"),
  lValue = document.querySelector(".l-value"),
  lSlider = document.querySelector(".l-slider"),
  saveColorButton = document.querySelector(".save-color-button");


colorPicker.on("color:change", function(color) {

  // get current color & channels
  let hex = color.hexString,
    rgb = color.rgbString,
    hsl = color.hslString,
    hue = color.hsl.h,
    saturation = color.hsl.s,
    lightness = color.hsl.l;

  // SET COLOR
  // whole inputs
  // hslInput.value = hsl;
  // hexInput.value = hex;
  // rgbInput.value = rgb;
  hslCopyValue.innerHTML = hsl;
  hexCopyValue.innerHTML = hex;
  rgbCopyValue.innerHTML = rgb;
  hslCopyButton.dataset.clipboardText = hsl;
  hexCopyButton.dataset.clipboardText = hex;
  rgbCopyButton.dataset.clipboardText = rgb;
  // single HSL inputs
  hValue.innerHTML = hue;
  hInput.value = hue;

  sValue.innerHTML = saturation + '%';
  sInput.value = saturation;

  lValue.innerHTML = lightness + '%';
  lInput.value = lightness;

  colorInput.placeholder = hex;
  
});

colorPicker.on("color:change", function(color, changes) {
  
  // get current color
  let currentColor = color.hsl,
    hslString = color.hslString,
    hexString = color.hexString,
    rgbString = color.rgbString;

  // create new color object & string
  let newColor = currentColor,
    newHslString = hslString,
    newHexString = hexString,
    newRgbString = rgbString;

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

  ///////// SLIDERS ////////////
  /////////////////////////////
  // change slider values
  const sliderChange = () => {
    // set new color
    color.hsl = newColor;
    hValue.innerHTML = hSlider.value;
    sValue.innerHTML = sSlider.value + "%";
    lValue.innerHTML = lSlider.value + "%";
  };
  // update slider UI
  const sliderUIUpdate = () => {
    // replace new colors with slider values (chg to #)
    newColor.h = Number(hSlider.value);
    newColor.s = Number(sSlider.value);
    newColor.l = Number(lSlider.value);
    sliderChange();// change slider values
  };

  //////// SINGLE HSL INPUTS ////////
  const mainHslInputChange = () => {

    // replace new colors with slider values (chg to #)
    newColor.h = Number(hInput.value);
    newColor.s = Number(sInput.value);
    newColor.l = Number(lInput.value);

    // set new color
    color.hsl = newColor;
  
    // update UI
    hValue.innerHTML = hInput.value;
    sValue.innerHTML = sInput.value + "%";
    lValue.innerHTML = lInput.value + "%";
  };

  ///////// WHOLE COLOR INPUTS ////////////
  // change whole hsl input values
  const hslInputChange = () => {

    // replace new colors with slider values (chg to #)
    // color.hsl = iro.Color.parseHslStr(hslInput.value);
    // color.hslString = hslInput.value;

    console.log(color.hsl);

    console.log(color.hslString);
    console.log(newColor);

    // set new color
    // colorPicker.color.hsl = newColor;

    // update UI
    //hValue.innerHTML = hInput.value;
  
    // hslInput.value = newHslString;
    // hslUIUpdate();
    sliderUIUpdate();
  };
  const hexInputChange = () => {

    // replace new colors with slider values (chg to #)
    // set new color
    color.hex = newColor;

    // update UI
    // hValue.innerHTML = hInput.value;
  
    // hslInput.value = newHslString;
    // hslUIUpdate();
    sliderUIUpdate();
    mainHslInputChange();
  };

  const colorInputChange = (color) => {
    newColor = colorInput.value;

    if (newColor.includes('h')) {
      //hsl
      colorPicker.color.hslString = newColor;

    } else if (newColor.length >= 3 && newColor.length <= 7) {
      //hex
      newColor.includes('#') ? colorPicker.color.hexString = newColor : colorPicker.color.hexString = '#' + newColor; 
      colorInput.value = newColor;
    } else {
      //rgb
      colorPicker.color.rgbString = newColor;
      // colorPicker.color.rgbString = newColor;
      console.log(newColor);

      // colorInput.value = newColor;
    }
  }

  // Handling color control changes
  elements.hSlider.addEventListener('change', sliderUIUpdate);
  elements.sSlider.addEventListener('change', sliderUIUpdate);
  elements.lSlider.addEventListener('change', sliderUIUpdate);

  // hexInput.addEventListener('change', hexInputChange);
  // rgbInput.addEventListener('change', inputChange);
  // hslInput.addEventListener('change', hslInputChange);
  elements.hInput.addEventListener('change', mainHslInputChange);
  elements.sInput.addEventListener('change', mainHslInputChange);
  elements.lInput.addEventListener('change', mainHslInputChange);

  colorInput.addEventListener('change', colorInputChange);

});

// COPY BUTTON TOOLTIPS
const showTooltip = async (el) => {
  // pass in tooltip element
  // 'show' tooltip via class
  el.classList.toggle('visible');
  // wait 1 second and remove visible class
  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(1000);
  el.classList.toggle('visible');
};


hslCopyButton.addEventListener('click', () => {
  showTooltip(el = hslTooltip);
});
hexCopyButton.addEventListener('click', () => {
  showTooltip(el = hexTooltip);
});
rgbCopyButton.addEventListener('click', () => {
  showTooltip(el = rgbTooltip);
});
// saveColorButton.addEventListener('click', doThis());


///// SAVE COLOR
const saveColor = () => {
  const markup = `
    <div class="saved-color">

    </div>
  `;
  let currentColor = elements.hslCopyValue.innerHTML;
  let savedColor = new Colors(currentColor);

  elements.savedColorContainer.style.background = savedColor.color;

  console.log(savedColor.color);
};
class Colors {
  constructor(color) {
    this.color = color;
  }
}
// class Colors {
//   constructor() {
//     this.colors = [];
//   }

//   addColor(color) {
//     const savedColor = { color };
//     this.colors.push(color);
//     return savedColor;
//   }

//   deleteColor(color) {
//     const index = this.colors.findIndex(el => el.color === color);
//     this.colors.splice(index, 1);
//   }

//   getNumColors() {
//     return this.colors.length;
//   }
// }

// Handling button clicks
elements.saveColorButton.addEventListener('click', saveColor);


// hslCopyButton.addEventListener('click', copyText(str = hslCopyValue.innerHTML));
// hslCopyButton.addEventListener('click', () => {
//   var copied;
//   try {
//     copied = window.clipbrd.copy(hslCopyValue.innerHTML);
//   } catch (e) {}
// });

// const inputChange = () => {

//   // replace new colors with slider values (chg to #)
//   newColor.h = Number(hInput.value);
//   newColor.s = Number(sInput.value);
//   newColor.l = Number(lInput.value);
//   // newHslString = hslInput.value;
//   // newHexString = hexInput.value;
//   // newRgbString = rgbInput.value;

//   // set new color
//   colorPicker.color.hsl = newColor;
//   // let hsl = iro.Color.parseHslStr(newHslString);
//   // let hex = iro.Color.parseHexStr(newHexString);
//   // let rgb = iro.Color.parseRgbStr(newRgbString);
//   // colorPicker.color.hsl = hsl;
//   // colorPicker.color.hex = hex;
//   // colorPicker.color.rgb = rgb;

//   // update UI
//   hValue.innerHTML = hInput.value;
//   sValue.innerHTML = sInput.value + "%";
//   lValue.innerHTML = lInput.value + "%";

//   // hslInput.value = newHslString;
//   // hexInput.value = newHexString;
//   // rgbInput.value = newRgbString;
// };