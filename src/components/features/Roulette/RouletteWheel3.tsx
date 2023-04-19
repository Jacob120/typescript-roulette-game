import React, { useRef, useEffect } from 'react';
import {
  Application,
  Container,
  Graphics,
  Sprite,
  Text,
  TextStyle,
  Assets,
  Texture,
  Resource,
  Ticker,
} from 'pixi.js';
import { assetsManager } from './assets';

interface RouletteWheelProps {
  width: number;
  height: number;
  winningNumber: number;
}

const RouletteWheel3: React.FC<RouletteWheelProps> = ({
  width,
  height,
  winningNumber,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const rouletteWheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

  const totalNumbers = 37;
  const singleSpinDuration = 5000;
  const singleRotationDegree = 360 / totalNumbers;
  const ballRadius = width / 10;
  const ballRef = useRef<Sprite | null>(null);
  const wheelRotationDuration = 5000;

  const getRouletteIndexFromNumber = (number: number) => {
    return rouletteWheelNumbers.indexOf(number);
  };

  const getRotationFromNumber = (number: number) => {
    var index = getRouletteIndexFromNumber(number);
    return singleRotationDegree * index;
  };

  const spinWheel = (
    number: number,
    wheel: Container,
    ballContainer: Container
  ) => {
    const linear = (t: number) => t;

    const endRotation = -getRotationFromNumber(number);
    const totalWheelRotation =
      endRotation + 360 * (wheelRotationDuration / singleSpinDuration);
    const ballEndRotation =
      ballContainer.rotation +
      (360 - (totalWheelRotation % 360)) +
      getRotationFromNumber(number) +
      singleRotationDegree / 2;

    const wheelTicker = new Ticker();
    const ballTicker = new Ticker();

    let wheelStartTime = 0;
    let ballStartTime = 0;

    const updateBallPosition = (rotation: number) => {
      if (!ballRef.current) return;

      const radianRotation = (rotation * Math.PI) / 180;
      const x = width / 2 + Math.cos(radianRotation) * (width / 2 - ballRadius);
      const y =
        height / 2 - Math.sin(radianRotation) * (height / 2 - ballRadius);
      ballRef.current.position.set(x, y);
    };

    wheelTicker.add(() => {
      if (wheelStartTime === 0) wheelStartTime = performance.now();
      const currentTime = performance.now();
      const elapsedTime = currentTime - wheelStartTime;
      const progress = Math.min(elapsedTime / wheelRotationDuration, 1);

      wheel.rotation =
        wheel.rotation +
        (totalWheelRotation - wheel.rotation) * linear(progress);

      if (progress === 1) {
        wheelTicker.stop();
      }
    });

    ballTicker.add(() => {
      if (ballStartTime === 0) ballStartTime = performance.now();
      const currentTime = performance.now();
      const elapsedTime = currentTime - ballStartTime;
      const progress = Math.min(elapsedTime / singleSpinDuration, 1);
      ballContainer.rotation =
        ballContainer.rotation +
        (ballEndRotation - ballContainer.rotation) * linear(progress);

      updateBallPosition(ballContainer.rotation);

      if (progress === 1) {
        ballTicker.stop();
      }
    });

    wheelTicker.start();
    ballTicker.start();
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const app = new Application({
      view: canvasRef.current,
      width,
      height,
      // backgroundColor: 0xffffff,
      antialias: true,
    });

    const wheel = new Container();
    wheel.pivot.set(width / 2, height / 2);
    wheel.position.set(width / 2, height / 2);
    app.stage.addChild(wheel);

    const ballContainer = new Container();
    ballContainer.pivot.set(width / 2, height / 2);
    ballContainer.position.set(width / 2, height / 2);
    app.stage.addChild(ballContainer);

    const loadSprites = async () => {
      const textures = await assetsManager();

      const imgArr: Sprite[] = [];
      for (let i = 0; i < 5; i++) {
        imgArr[i] = new Sprite(textures[`layer${i + 1}`]);
        imgArr[i].anchor.set(0.5);
        imgArr[i].position.set(width / 2, height / 2);
      }
      wheel.addChild(...imgArr);

      const ball = new Sprite(textures['ball']);
      ball.anchor.set(0.5);
      ball.scale.set(0.1);
      ball.position.set(width / 2, height / 4);
      ballRef.current = ball;
      ballContainer.addChild(ball);
    };

    loadSprites();

    spinWheel(winningNumber, wheel, ballContainer);

    return () => {
      app.destroy(true);
    };
  }, [width, height, winningNumber]);

  return <canvas ref={canvasRef} />;
};

export default RouletteWheel3;
