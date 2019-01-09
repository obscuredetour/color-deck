// DOM elements
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
  userColors: document.querySelector(".user-colors"),
  savedColorContainer: document.querySelectorAll(".saved-color"),
  saveColorButton: document.querySelector(".save-color-button"),
  savedColorValue: document.querySelector(".saved-color-value"),
  savedColorName: document.querySelector(".saved-color-name"),
  savedColorCopyHsl: document.querySelector(".saved-color-copy__hsl"),
  savedColorCopyHex: document.querySelector(".saved-color-copy__hex"),
  savedColorCopyRgb: document.querySelector(".saved-color-copy__rgb")
}

// thanks stackoverflow
getStartColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Create and Display Color Picker
const colorPicker = new iro.ColorPicker("#color-wheel", {
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
    "#swatch, .slider, .s-controls__slider, .l-controls__slider": {
      "background-color": "$color"
    }
  }
});

// Start clipboard module
new ClipboardJS(elements.hslCopyButton);
new ClipboardJS(elements.hexCopyButton);
new ClipboardJS(elements.rgbCopyButton);

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

  if(changes) {
    elements.colorInput.placeholder = color.hexString;
    elements.colorInput.value = color.hexString;
  }

  ///////// SLIDERS ////////////
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

  const colorInputChange = (color) => {
    newColor = colorInput.value;

    if (newColor.includes('h')) {
      //hsl
      colorPicker.color.hslString = newColor;
      elements.colorInput.value = newColor;

    } else if (newColor.length >= 3 && newColor.length <= 7) {
      //hex
      newColor.includes('#') ? colorPicker.color.hexString = newColor : colorPicker.color.hexString = '#' + newColor; 
      colorInput.value = newColor;
    } else {
      //rgb
      colorPicker.color.rgbString = newColor;
    }
  }

  // Handling color control changes
  elements.hSlider.addEventListener('change', sliderUIUpdate);
  elements.sSlider.addEventListener('change', sliderUIUpdate);
  elements.lSlider.addEventListener('change', sliderUIUpdate);
  elements.hInput.addEventListener('change', mainHslInputChange);
  elements.sInput.addEventListener('change', mainHslInputChange);
  elements.lInput.addEventListener('change', mainHslInputChange);

  elements.colorInput.addEventListener('change', colorInputChange);

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


///// SAVE COLOR Controller
const saveColor = async () => {
  // Get saved color
  let currentColor = elements.hexCopyValue.innerHTML;
  // Create new saved
  let savedColor = new Colors(currentColor, currentColor);
  createColors(savedColor);

  // log newly created object to console
  console.log(savedColor);

  // Create & Update UI
  const markup = `
    <div class="saved-color" style="background-color: ${currentColor}">
      <input type="text" class="saved-color-name" placeholder="color name" data-color="${currentColor}">
      <!-- <p><span class="saved-color-value">${currentColor}</span></p> -->
      <div class="saved-color-copy">
        <button class="saved-color-copy__hsl" data-clipboard-text=${elements.hslCopyValue.innerHTML}>HSL</button>
        <button class="saved-color-copy__hex" data-clipboard-text=${elements.hexCopyValue.innerHTML}>HEX</button>
        <button class="saved-color-copy__rgb" data-clipboard-text=${elements.rgbCopyValue.innerHTML}>RGB</button>
      </div>
    </div>
  `;

  elements.userColors.insertAdjacentHTML('beforeend', markup);
  
  elements.savedColorCopyHsl = document.querySelector(".saved-color-copy__hsl");
  elements.savedColorCopyHex = document.querySelector(".saved-color-copy__hex");
  elements.savedColorCopyRgb = document.querySelector(".saved-color-copy__rgb");
  
  new ClipboardJS(elements.savedColorCopyHsl);
  new ClipboardJS(elements.savedColorCopyHex);
  new ClipboardJS(elements.savedColorCopyRgb);

};
class Colors {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
};

let colors = [];
createColors = (color) => {
  colors.push(color);
  console.log(colors);
};

// const updateColorName = async () => {
//  elements.savedColorName = document.querySelector(".saved-color-name");
//   if (colors.color === elements.savedColorName.dataset.color) {
//     colors.color = elements.savedColorName.value;
//   }
// };

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
elements.savedColorName.addEventListener('click', updateColorName);
