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
  saveSomeColors: document.querySelector(".save-some-colors"),
  savedColorContainer: document.querySelectorAll(".saved-color"),
  saveColorButton: document.querySelector(".save-color-button"),
  smSaveColorButton: document.querySelector(".sm-save-button"),
  clearAllColorsButton: document.querySelector(".clear-button"),
  savedColorValue: document.querySelector(".saved-color-value"),
  savedColorName: document.querySelectorAll(".saved-color-name"),
  savedColorRemove: document.querySelectorAll(".saved-color-remove"),
  savedColorCopyHsl: document.querySelectorAll(".saved-color-copy__hsl"),
  savedColorCopyHex: document.querySelectorAll(".saved-color-copy__hex"),
  savedColorCopyRgb: document.querySelectorAll(".saved-color-copy__rgb")
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
    "#swatch, .swatch-sm, .slider, .s-controls__slider, .l-controls__slider": {
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
    newColor = colorInput.value.replace('%', '').replace('%', '');

    if (newColor.includes('r')) {
      //rgb
      colorPicker.color.rgbString = newColor;

    } else if (newColor.length >= 3 && newColor.length <= 7) {
      //hex
      newColor.includes('#') ? colorPicker.color.hexString = newColor : colorPicker.color.hexString = '#' + newColor; 
      colorInput.value = newColor;
    } else {
      //hsl
      colorPicker.color.hslString = newColor;
      elements.colorInput.value = newColor;
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

// Save Color Controller
class Colors {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
};

let colors = [];
createColors = (color) => {
  colors.push(color);
  // console.log(colors);
};

///// SAVE UI Controller
const saveColor = async () => {
  elements.saveSomeColors.classList.add('d-none');

  // Get saved color
  let currentColor = elements.hexCopyValue.innerHTML,
    hex = currentColor,
    hsl = elements.hslCopyButton.dataset.clipboardText,
    rgb = elements.rgbCopyButton.dataset.clipboardText;
  // Create new saved
  let savedColor = new Colors(currentColor, currentColor);
  createColors(savedColor);
  // log newly created object to console
  console.log(savedColor);
  // let colorsCopy = [...colors];
  // colors.push(...colorsCopy);
  // console.log(colors);
  // need to 

  // Create & Update UI
  const markup = `
    <div class="saved-color" data-color="${currentColor}" data-color-name="" style="background-color: ${currentColor}">
      <input type="text" class="saved-color-name" placeholder="color name" data-color="${currentColor}">
      <!-- <p><span class="saved-color-value">${currentColor}</span></p> -->
      <div class="saved-color-copy">
        <button class="saved-color-copy__hsl" data-clipboard-text="${hsl}">HSL</button>
        <button class="saved-color-copy__hex" data-clipboard-text="${hex}">HEX</button>
        <button class="saved-color-copy__rgb" data-clipboard-text="${rgb}">RGB</button>
      </div>
      <button class="saved-color-remove">
        <span>
          <svg class="plus-icon clear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"></path></svg>
        </span>
      </button>
    </div>
  `;

  elements.userColors.insertAdjacentHTML('beforeend', markup);

  // need to reassign elements again
  elements.savedColorCopyHsl = document.querySelectorAll(".saved-color-copy__hsl");
  elements.savedColorCopyHex = document.querySelectorAll(".saved-color-copy__hex");
  elements.savedColorCopyRgb = document.querySelectorAll(".saved-color-copy__rgb");
  elements.savedColorName = document.querySelectorAll(".saved-color-name");

  let savedColorHslButtons = new ClipboardJS(elements.savedColorCopyHsl);
  let savedColorHexButtons = new ClipboardJS(elements.savedColorCopyHex);
  let savedColorRgbButtons = new ClipboardJS(elements.savedColorCopyRgb);

  elements.savedColorContainer = document.querySelectorAll(".saved-color");
  elements.savedColorRemove = document.querySelectorAll(".saved-color-remove");
  // Remove color on click
  elements.savedColorRemove.forEach(el => {

    el.addEventListener('click', () => {
      return el.parentNode.remove();
    });
    
  });

  // update color name of element
  elements.savedColorName.forEach(el => {
    el.addEventListener('change', () => {
      el.parentNode.dataset.colorName = el.value;
    });
    
  });
};

const removeAllColors = () => {
  const markup = `
  <div class="save-some-colors" aria-hidden="true">
    <p>Save some colors!</p>
  </div>
  `;

  if (elements.userColors.lastElementChild != elements.saveSomeColors) {
    elements.userColors.innerHTML = markup;
  }

  elements.saveSomeColors = document.querySelector(".save-some-colors");
}

// Handling button clicks
elements.saveColorButton.addEventListener('click', saveColor);
elements.smSaveColorButton.addEventListener('click', saveColor);
elements.clearAllColorsButton.addEventListener('click', removeAllColors);