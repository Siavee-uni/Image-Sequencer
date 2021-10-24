import { imageSequenze } from "./imageSequenzer.js";

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

window.addEventListener("load", () => {
  const cenvas = document.getElementById("player");
  const button = document.getElementById("start");

  if (cenvas) {
    const sequenzer = new imageSequenze(images, path, framesPs, cenvas);
    sequenzer.init();

    const cenvasImages = cenvas.children;
    /*     sequenzer.checkLoading(cenvasImages);
     */
    button.addEventListener("mouseenter", () => {
      sequenzer.start(cenvasImages);
      console.log("start");
    });

    button.addEventListener("mouseleave", () => {
      sequenzer.reverse(cenvasImages);
      console.log("reverse");
    });
  }
});

let myImage = document.getElementById("myImage");
let imageProgress = document.getElementById("imageProgress");

let imageLoader = GetImageLoader();

imageLoader("../images/intro-animation.2.jpg").then((image) => {
  console.log(image);
});
