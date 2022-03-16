import { Wave } from "./wave.js";

export class WaveGroup {
  constructor() {
    this.totalWaves = 3; //3개의 웨이브
    this.totalpoints = 6; // 위아래로 움직이는 물결의 꼭짓점

    //웨이브의 컬러 지정
    this.color = [
      "rgba(0,199, 235, 0.4)",
      "rgba(0,146, 199, 0.4",
      "rgba(0,87, 158, 0.4)",
    ];
    this.waves = [];
    for (let i = 0; i < this.totalWave; ++i) {
      const wave = new Wave();
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalWave; i++) {
      const wave = new Wave(i, this.totalpoints, this.color[i]);
      this.waves[i] = wave;
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.totalWave; i++) {
      const wave = this.wavesf[i];
      wave.draw(ctx);
    }
  }
}
