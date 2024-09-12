// Arrays of trait options
const backgrounds = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg', 'bg9.jpg'];
const faces = ['face1.png', 'face2.png'];
const eyes = ['eyes1.png', 'eyes2.png', 'eyes3.png', 'eyes4.png', 'eyes5.png', 'eyes6.png'];
const mouths = ['mouth1.png', 'mouth2.png', 'mouth3.png'];
const clothing = ['clothing1.png', 'clothing2.png', 'clothing3.png', 'clothing4.png', 'clothing5.png', 'clothing6.png'];
const accessories = ['accessory1.png', 'accessory2.png', 'accessory3.png', 'accessory4.png'];
const hats = ['hat1.png', 'hat2.png', 'hat3.png', 'hat4.png'];

let scrollAmount = 0;
let currentTraitCategory = '';

// Function to scroll right
function scrollRight() {
  const slider = document.querySelector(`#${currentTraitCategory} .trait-selector`);
  const sliderWrapper = document.querySelector(`#${currentTraitCategory} .trait-slider-wrapper`);
  const maxScroll = slider.scrollWidth - sliderWrapper.clientWidth;

  if (scrollAmount < maxScroll) {
    scrollAmount += 100;
    slider.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
}

// Function to scroll left
function scrollLeft() {
  const slider = document.querySelector(`#${currentTraitCategory} .trait-selector`);

  if (scrollAmount > 0) {
    scrollAmount -= 100;
    slider.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
}

// Function to randomly select traits
function getRandomTrait(traits) {
  return traits[Math.floor(Math.random() * traits.length)];
}

// Function to load random base traits
function loadRandomAvatar() {
  document.getElementById('background').src = `images/${getRandomTrait(backgrounds)}`;
  document.getElementById('face').src = `images/${getRandomTrait(faces)}`;
  document.getElementById('eyes').src = `images/${getRandomTrait(eyes)}`;
  document.getElementById('mouth').src = `images/${getRandomTrait(mouths)}`;
  document.getElementById('clothing').src = `images/${getRandomTrait(clothing)}`;
  document.getElementById('accessories').src = `images/${getRandomTrait(accessories)}`;
  document.getElementById('hats').src = `images/${getRandomTrait(hats)}`;
}

// Function to generate trait selectors using images
function generateTraitSelectors(traitType, traitArray) {
  const container = document.getElementById(`${traitType}Selector`);
  container.innerHTML = ''; // Clear previous buttons
  traitArray.forEach(trait => {
    const button = document.createElement('button');
    button.style.backgroundImage = `url('images/${trait}')`; // Set the image as the background
    button.onclick = () => document.getElementById(traitType).src = `images/${trait}`;
    container.appendChild(button);
  });
}

// Function to randomize the traits
function randomizeTraits() {
  document.getElementById('background').src = `images/${getRandomTrait(backgrounds)}`;
  document.getElementById('face').src = `images/${getRandomTrait(faces)}`;
  document.getElementById('eyes').src = `images/${getRandomTrait(eyes)}`;
  document.getElementById('mouth').src = `images/${getRandomTrait(mouths)}`;
  document.getElementById('clothing').src = `images/${getRandomTrait(clothing)}`;
  document.getElementById('accessories').src = `images/${getRandomTrait(accessories)}`;
  document.getElementById('hats').src = `images/${getRandomTrait(hats)}`;
}

// Set up trait selection buttons with images
function setupTraitSelectors() {
  generateTraitSelectors('background', backgrounds);
  generateTraitSelectors('face', faces);
  generateTraitSelectors('eyes', eyes);
  generateTraitSelectors('mouth', mouths);
  generateTraitSelectors('clothing', clothing);
  generateTraitSelectors('accessories', accessories);
  generateTraitSelectors('hats', hats);
}

// Function to download the avatar as an image
function downloadAvatar() {
  const avatarCanvas = document.querySelector('.avatar-canvas');
  html2canvas(avatarCanvas).then(canvas => {
    const link = document.createElement('a');
    link.download = 'avatar.png';
    link.href = canvas.toDataURL();
    link.click();
  });
}

// Tab-switching functionality
function openTab(evt, categoryName) {
  scrollAmount = 0; // Reset scroll amount when switching tabs
  currentTraitCategory = categoryName;

  // Get all elements with class="tabcontent" and hide them
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(categoryName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Initialize the avatar builder and open the first tab
window.onload = () => {
  loadRandomAvatar();
  setupTraitSelectors();
  document.querySelector('.tablinks').click(); // Automatically open the first tab on load

  // Ensure the scrollbar starts at the left (default behavior)
  const tabContainer = document.querySelector('.tab');
  tabContainer.scrollLeft = 0;
};

