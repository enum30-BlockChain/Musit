import { WaveGroup } from "./wavegroup.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);

    //
    this.waveGroup = new WaveGroup();

    //resize event 걸어주기
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    //선명도 지정해주기 (retina)
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    //캔버스 클리어어 하는 것
    this.ctx.clearRect(0, 0, this.stageHeight, this.stageHeight);
    this.waveGroup.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

// 윈도우 로드가 되면 앱을 생성해주기
window.onload = () => {
  const test = new App();
  console.log(test);
};
