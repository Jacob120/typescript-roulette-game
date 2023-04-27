import { GameStore } from './gameStore';

describe('GameStore', () => {
  let gameStore: GameStore;

  beforeEach(() => {
    gameStore = new GameStore();
  });

  test('initial state', () => {
    expect(gameStore.selectedNumbers).toEqual([]);
    expect(gameStore.selectedDozens).toEqual([]);
    expect(gameStore.selectedHalves).toEqual([]);
    expect(gameStore.selectedRows).toEqual([]);
    expect(gameStore.coinValues).toEqual([1, 5, 10, 25, 100]);
    expect(gameStore.coinColors).toEqual([
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
    ]);
    expect(gameStore.selectedCoinValue).toEqual(gameStore.coinValues[0]);
    expect(gameStore.bets).toEqual([]);
    expect(gameStore.playerMoney).toEqual(10000);
    expect(gameStore.winAmount).toBeNull();
    expect(gameStore.resultsHistory).toEqual([]);
    expect(gameStore.winningNumber).toBeNull();
    expect(gameStore.spinning).toBeFalsy();
  });

  test('spinRoulette', () => {
    jest.useFakeTimers();
    const spin = gameStore.spinRoulette();
    expect(gameStore.spinning).toBeTruthy();

    jest.advanceTimersByTime(16000);
    expect(gameStore.resultsHistory[0]).toEqual(spin);
    expect(gameStore.spinning).toBeFalsy();
  });

  test('getBetAmount', () => {
    gameStore.bets = [
      { type: 'number', value: 1, amount: 10 },
      { type: 'dozen', value: 2, amount: 5 },
      { type: 'half', value: '1to18', amount: 15 },
      { type: 'row', value: 1, amount: 25 },
    ];

    expect(gameStore.getBetAmount('number', 1)).toEqual(10);
    expect(gameStore.getBetAmount('dozen', 2)).toEqual(5);
    expect(gameStore.getBetAmount('half', '1to18')).toEqual(15);
    expect(gameStore.getBetAmount('row', 1)).toEqual(25);
  });

  test('getTotalBetAmount', () => {
    gameStore.bets = [
      { type: 'number', value: 1, amount: 10 },
      { type: 'dozen', value: 2, amount: 5 },
      { type: 'half', value: '1to18', amount: 15 },
      { type: 'row', value: 1, amount: 25 },
    ];

    expect(gameStore.getTotalBetAmount()).toEqual(55);
  });

  test('selectedCoinColor', () => {
    gameStore.selectedCoinValue = 1;
    expect(gameStore.selectedCoinColor).toEqual('red');

    gameStore.selectedCoinValue = 25;
    expect(gameStore.selectedCoinColor).toEqual('yellow');
  });

  test('getColorByValue', () => {
    expect(gameStore.getColorByValue(1)).toEqual('red');
    expect(gameStore.getColorByValue(5)).toEqual('blue');
    expect(gameStore.getColorByValue(10)).toEqual('green');
    expect(gameStore.getColorByValue(25)).toEqual('yellow');
    expect(gameStore.getColorByValue(100)).toEqual('purple');
  });

  test('clearBets', () => {
    gameStore.bets = [
      { type: 'number', value: 1, amount: 10 },
      { type: 'dozen', value: 2, amount: 5 },
      { type: 'half', value: '1to18', amount: 15 },
      { type: 'row', value: 1, amount: 25 },
    ];

    const totalBetAmount = gameStore.clearBets();

    expect(totalBetAmount).toEqual(55);
    expect(gameStore.bets).toEqual([]);
  });

  test('checkWinningNumber', () => {
    gameStore.bets = [
      { type: 'number', value: 5, amount: 10 },
      { type: 'dozen', value: 2, amount: 5 },
      { type: 'half', value: '1to18', amount: 15 },
      { type: 'row', value: 1, amount: 25 },
    ];

    const { winStatus, winAmount } = gameStore.checkWinningNumber(5);

    expect(winStatus).toBeTruthy();
    expect(winAmount).toBeGreaterThan(0);
  });
});
