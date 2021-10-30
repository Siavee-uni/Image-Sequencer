interface Options {
  type?: string;
}
export class imageSequenze {
  images: string[];
  path: string;
  framesPS: number;
  cenvas: HTMLElement;
  repeater = 0;
  stoppedForwards = false;
  stoppedBackwards = false;
  loadingElement: HTMLElement;

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
    this.loadingElement = this.createLoading();
    this.cenvas.appendChild(this.loadingElement);
  }

  createLoading() {
    const div = document.createElement("div");
    div.classList.add("loading");
    return div;
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
    element.classList.add("show");

    if (this.repeater < this.images.length - 1) {
      this.repeater++;
      await this.sleep();
      this.animate(cenvasImages);
    }
  }

  createImage(src: string, alt = "", title = "") {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.title = title;
    return img;
  }

  sleep() {
    return new Promise((resolve) => setTimeout(resolve, this.framesPS));
  }
}

export const imageLoader = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", imageUrl, true);
    xhr.responseType = "arraybuffer";

    xhr.onprogress = function (e) {
      if (e.lengthComputable) {
        // function to update hier:
        /* progressUpdateCallback((e.loaded / e.total) * 100); */
      }
    };

    xhr.onloadend = function () {
      /* progressUpdateCallback(100); */
      const options: Options = {};
      const headers = xhr.getAllResponseHeaders();
      const typeMatch = headers.match(/^Content-Type\:\s*(.*?)$/im);

      if (typeMatch && typeMatch[1]) {
        options.type = typeMatch[1];
      }

      const blob = new Blob([this.response], options);

      resolve(window.URL.createObjectURL(blob));
    };
    xhr.send();
  });
};
