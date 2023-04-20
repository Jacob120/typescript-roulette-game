import { Assets, Texture } from 'pixi.js';

export async function assetsManager() {
  Assets.add('layer1', '/assets/wheel/roulette_1.png');
  Assets.add('layer2', '/assets/wheel/roulette_2.png');
  Assets.add('layer3', '/assets/wheel/roulette_3.png');
  Assets.add('layer4', '/assets/wheel/roulette_4.png');
  Assets.add('layer5', '/assets/wheel/roulette_5.png');
  Assets.add('ball', '/assets/wheel/ball.png');

  return await Assets.load<Texture>([
    'ball',
    'layer1',
    'layer2',
    'layer3',
    'layer4',
    'layer5',
  ]);
}
