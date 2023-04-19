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

const RouletteWheel: React.FC<RouletteWheelProps> = ({
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
    const index = getRouletteIndexFromNumber(number);
    return singleRotationDegree * index;
  };

  const spinWheel = (number: number, wheel: Container) => {
    const endRotation = 0 - getRotationFromNumber(number);
    console.log('endRotation', endRotation);
    wheel.rotation = endRotation;
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

    spinWheel(winningNumber, wheel);

    return () => {
      app.destroy(true);
    };
  }, [width, height, winningNumber]);

  return <canvas ref={canvasRef} />;
};

export default RouletteWheel;
