import { gameStore } from './gameStore';

describe('GameStore', () => {
  // let gameStore: GameStore;

  beforeEach(() => {
    gameStore;
  });

  test('checkWinningNumber with no bets should return no win', () => {
    const result = gameStore.checkWinningNumber(5);
    expect(result.winStatus).toBe(false);
    expect(result.winAmount).toBe(0);
  });

  test('checkWinningNumber with winning number bet should return correct win amount', () => {
    gameStore.placeNumberBet(7);
    const result = gameStore.checkWinningNumber(7);
    expect(result.winStatus).toBe(true);
    expect(result.winAmount).toBe(35 * gameStore.selectedCoinValue);
  });

  // Add more tests for other bet types, scenarios, and edge cases
});
