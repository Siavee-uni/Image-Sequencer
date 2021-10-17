export class imageSequenze {
  images: string[];
  path: string;
  framesPS: number;
  cenvas: HTMLElement;
  repeater = 0;
  stoppedForwards = false;
  stoppedBackwards = false;

  constructor(
    images: string[],
    path: string,
    framesPs: number,
    cenvas: HTMLElement
  ) {
    this.images = images;
    this.path = path;
    this.framesPS = Math.abs(1000 / framesPs);
    this.cenvas = cenvas;
  }

  init() {
    for (let index = 0; index < this.images.length; index++) {
      const image = this.images[index];
      const imageElement = this.createImage(image);

      this.cenvas.appendChild(imageElement);
    }
  }

  start(cenvasImages: HTMLCollection) {
    this.stopBackwards();
    this.startForwards();
    this.animate(cenvasImages);
  }

  startForwards() {
    this.stoppedForwards = false;
  }

  stopForwards() {
    this.stoppedForwards = true;
  }

  stopBackwards() {
    this.stoppedBackwards = true;
  }

  startBackwards() {
    this.stoppedBackwards = false;
  }

  reverse(cenvasImages: HTMLCollection) {
    this.stopForwards();
    this.startBackwards();
    this.reverseAnimate(cenvasImages);
  }

  async reverseAnimate(cenvasImages: HTMLCollection): Promise<void> {
    if (this.repeater < 0 || this.stoppedBackwards) {
      return;
    }
    console.log(this.repeater, cenvasImages);

    const element = cenvasImages[this.repeater];
    element.classList.remove("show");

    if (this.repeater > 0) {
      this.repeater--;
      await this.sleep();
      this.reverseAnimate(cenvasImages);
    }
  }

  async animate(cenvasImages: HTMLCollection): Promise<void> {
    if (this.repeater > this.images.length - 1 || this.stoppedForwards) {
      return;
    }

    const element = cenvasImages[this.repeater];
    console.log(this.repeater, cenvasImages);
    element.classList.add("show");

    if (this.repeater < this.images.length - 1) {
      this.repeater++;
      await this.sleep();
      this.animate(cenvasImages);
    }
  }

  createImage(src: string, alt = "", title = "") {
    const img = document.createElement("img");
    img.src = this.path + src;
    img.alt = alt;
    img.title = title;
    return img;
  }

  sleep() {
    return new Promise((resolve) => setTimeout(resolve, this.framesPS));
  }
}
