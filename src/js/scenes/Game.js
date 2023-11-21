import Phaser from 'phaser';
import HandTracking from './game/HandTracking';

// init mediapipe hand tracking
const handTracking = new HandTracking();

export default class Game extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.StaticBody} */
  handLeft;
  /** @type {Phaser.Physics.Arcade.StaticBody} */
  handRight;
  results;

  constructor() {
    super('game');
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('handLeft', 'assets/bird.png');
    this.load.image('handRight', 'assets/star.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.handLeft = this.physics.add.staticImage(200, 300, 'handLeft');
    this.handRight = this.physics.add.staticImage(500, 300, 'handRight');
  }

  update(_, delta) {
    // get hand tracking results
    this.results = handTracking.getResults();
    // update hand positions
    // this.handLeft.x = this.results.multiHandLandmarks[0][0].x * 800;
    // this.handLeft.y = this.results.multiHandLandmarks[0][0].y * 600;
    // this.handRight.x = this.results.multiHandLandmarks[0][1].x * 800;
    // this.handRight.y = this.results.multiHandLandmarks[0][1].y * 600;
  }
}
