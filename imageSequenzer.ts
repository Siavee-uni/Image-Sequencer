export class imageSequenze {
  images: string[];
  path: string;
  framesPS: number;
  cenvas: HTMLElement;
  repeater = 0;

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
    this.animate(cenvasImages);
  }

  stop() {
    console.log("stop function hiere");
  }

  async animate(cenvasImages: HTMLCollection): Promise<void> {
    if (this.repeater > this.images.length - 1) {
      return;
    }

    const element = cenvasImages[this.repeater];
    element.classList.add("show");

    this.repeater++;
    await this.sleep();
    this.animate(cenvasImages);
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
