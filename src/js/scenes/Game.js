import Phaser from 'phaser';
import HandTracking from './game/HandTracking';

export default class Game extends Phaser.Scene {
  // init mediapipe hand tracking
  handTracking = new HandTracking({ hands: 2 });
  /** @type {Phaser.Physics.Arcade.StaticBody} */
  handLeft;
  /** @type {Phaser.Physics.Arcade.StaticBody} */
  handRight;
  results;
  totalTime = 0;

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
    this.totalTime += delta;

    // get hand tracking results
    /** @type {import('@mediapipe/tasks-vision').GestureRecognizerResult} */
    this.results = this.handTracking.getResults();

    // update hand positions
    const leftHandPosition = this.#analyzeHand('left');
    if (leftHandPosition.x !== null && leftHandPosition.y !== null) {
      this.handLeft.setPosition(leftHandPosition.x, leftHandPosition.y);
    }

    const rightHandPosition = this.#analyzeHand('right');
    if (rightHandPosition.x !== null && rightHandPosition.y !== null) {
      this.handRight.setPosition(rightHandPosition.x, rightHandPosition.y);
    }
    // console.dir(leftHandPosition, rightHandPosition, this.totalTime);

    // if gesture is CLosed_Fist draw the hand red
    if (leftHandPosition.gesture === 'Closed_Fist') {
      this.handLeft.setTint(0xff0000);
    } else {
      this.handLeft.clearTint();
    }

    // if gesture is CLosed_Fist draw the hand green
    if (rightHandPosition.gesture === 'Closed_Fist') {
      this.handRight.setTint(0x00ff00);
    } else {
      this.handRight.clearTint();
    }
  }

  #analyzeHand(hand) {
    const handIndex = {
      left: 1,
      right: 0,
    };
    let x, y, gesture;
    if (this.results?.landmarks && this.results.landmarks.length > 0) {
      const { width } = this.game.config;
      try {
        // landmarks
        ({ x, y } = this.results.landmarks[handIndex[hand]][8]);
        x = width - x * width;
        y = y * width;
        // gestures
        gesture = this.results.gestures[handIndex[hand]][0].categoryName;
      } catch {
        x = null;
        y = null;
        gesture = null;
      }
    }
    return { x, y, gesture };
  }
}
