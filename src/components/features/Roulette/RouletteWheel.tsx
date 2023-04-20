import React, { useRef, useEffect } from 'react';
import { Application, Container, Sprite } from 'pixi.js';
import * as PIXI from 'pixi.js';
import { assetsManager } from './assets';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

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
  const singleRotationDegree = 360 / totalNumbers;
  const ballRef = useRef<Sprite | null>(null);

  const getRouletteIndexFromNumber = (number: number) => {
    return rouletteWheelNumbers.indexOf(number);
  };

  const getRotationFromNumber = (number: number) => {
    const index = getRouletteIndexFromNumber(number);
    return singleRotationDegree * index;
  };

  // register the plugin
  gsap.registerPlugin(PixiPlugin);

  // give the plugin a reference to the PIXI object
  PixiPlugin.registerPIXI(PIXI);

  const changeBallAnchor = (
    ball: Sprite,
    targetAnchor: number,
    duration: number
  ) => {
    return new Promise((resolve) => {
      const startAnchor = ball.anchor.x;
      const startTime = performance.now();

      const changeAnchor = () => {
        // Calculate progress and current anchor
        const currentTime = performance.now();
        const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
        const progress = elapsedTime / duration;

        if (progress < 1) {
          const currentAnchor =
            startAnchor + (targetAnchor - startAnchor) * progress;
          ball.anchor.set(currentAnchor);
          requestAnimationFrame(changeAnchor);
        } else {
          ball.anchor.set(targetAnchor); // Ensure the final anchor value is set
          resolve(null);
        }
      };

      changeAnchor();
    });
  };

  const spinWheel = async (
    number: number,
    wheel: Container,
    ballContainer: Container,
    ball: Sprite
  ) => {
    const endRotation = getRotationFromNumber(number) % 360;
    const randomOffset = Math.random() * 360;
    const wheelRotationDuration = 12; // seconds
    const ballRotationDuration = 12;

    const wheelEndRotation = endRotation * -1 - 360 * 4 - randomOffset;
    const ballEndRotation = 360 * 4 - randomOffset;

    gsap.to(wheel, {
      pixi: { rotation: wheelEndRotation },
      duration: wheelRotationDuration,
      ease: 'power1.inOut',
    });

    gsap.to(ballContainer, {
      pixi: { rotation: ballEndRotation },
      duration: ballRotationDuration,
      ease: 'power1.out',
    });

    // Change ball anchor during the spin
    setTimeout(() => {
      changeBallAnchor(ball, 0.5, 1);
    }, 8000);

    // Animate bouncing of the ball
    const bounceTimeline = gsap.timeline({
      delay: 10,
    });

    bounceTimeline
      .to(ball.scale, { x: 0.1, y: 0.1, duration: 0.3 })
      .to(ball.scale, { x: 0.12, y: 0.12, duration: 0.4 })
      .to(ball.scale, { x: 0.1, y: 0.1, duration: 0.3 })
      .to(ball.scale, { x: 0.1, y: 0.1, duration: 0.3 })
      .to(ball.scale, { x: 0.09, y: 0.09, duration: 0.3 })
      .to(ball.scale, { x: 0.08, y: 0.08, duration: 0.1 });
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const app = new Application({
      view: canvasRef.current,
      width,
      height,
      antialias: true,
      backgroundAlpha: 0,
    });

    const stationaryWheel = new Container();
    stationaryWheel.pivot.set(width / 2, height / 2);
    stationaryWheel.position.set(width / 2, height / 2);
    app.stage.addChild(stationaryWheel);

    const spinningWheel = new Container();
    spinningWheel.pivot.set(width / 2, height / 2);
    spinningWheel.position.set(width / 2, height / 2);
    app.stage.addChild(spinningWheel);

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
      spinningWheel.addChild(imgArr[1], imgArr[2], imgArr[3], imgArr[4]);
      stationaryWheel.addChild(imgArr[0]);

      const ball = new Sprite(textures['ball']);
      ball.anchor.set(4.7);
      ball.scale.set(0.08);
      ball.position.set(width / 2, height / 4);
      ballRef.current = ball;
      ballContainer.addChild(ball);
    };

    loadSprites().then(() => {
      spinWheel(winningNumber, spinningWheel, ballContainer, ballRef.current!);
    });

    return () => {
      app.destroy(true);
    };
  }, [width, height, winningNumber, spinWheel]);

  return <canvas ref={canvasRef} />;
};

export default RouletteWheel;
