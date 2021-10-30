import { imageLoader, imageSequenze } from "./imageSequenzer.js";

const images = [
  "intro-animation.2.jpg",
  "intro-animation.3.jpg",
  "intro-animation.4.jpg",
  "intro-animation.5.jpg",
  "intro-animation.6.jpg",
  "intro-animation.7.jpg",
  "intro-animation.8.jpg",
  "intro-animation.9.jpg",
  "intro-animation.10.jpg",
  "intro-animation.11.jpg",
  "intro-animation.12.jpg",
  "intro-animation.13.jpg",
  "intro-animation.14.jpg",
  "intro-animation.15.jpg",
  "intro-animation.16.jpg",
];
const path = "../images/";
const framesPs = 2;

const cenvas = document.getElementById("player");
const sequenzer = new imageSequenze(images, path, framesPs, cenvas);
sequenzer.init();

const countert = 1 / images.length;
let counter = countert;
console.log(counter);

for (let index = 0; index < images.length; index++) {
  const image = images[index];
  const imagePath = path + image;

  imageLoader(imagePath).then((image) => {
    const htmlImage = sequenzer.createImage(image);
    cenvas.appendChild(htmlImage);

    sequenzer.loadingElement.style.transform = `scaleX(${counter})`;
    counter += countert;
    console.log(counter);
  });
}

const button = document.getElementById("start");

if (cenvas) {
  const cenvasImages = cenvas.children;

  button.addEventListener("mouseenter", () => {
    sequenzer.start(cenvasImages);
  });

  button.addEventListener("mouseleave", () => {
    sequenzer.reverse(cenvasImages);
  });
}
