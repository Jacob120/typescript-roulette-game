import { makeAutoObservable, action } from 'mobx';

type Bet = {
  type: 'number' | 'dozen' | 'half' | 'row';
  value: number | string;
  amount: number;
  color?: string;
};

class GameStore {
  selectedNumbers: number[] = [];
  selectedDozens: number[] = [];
  selectedHalves: string[] = [];
  selectedRows: number[] = [];
  coinValues: number[] = [1, 5, 10, 25, 100];
  coinColors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  selectedCoinValue: number = this.coinValues[0];
  bets: Bet[] = [];
  playerMoney: number = 10000;
  winAmount: number | null = null;
  resultsHistory: number[] = [];
  winningNumber: number | null = null;
  spinning: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      spinRoulette: action.bound,
    });
  }

  addNumber(number: number) {
    this.selectedNumbers.push(number);
  }

  addDozen(dozen: number) {
    this.selectedDozens.push(dozen);
  }

  addHalf(half: string) {
    this.selectedHalves.push(half);
  }

  addRow(row: number) {
    this.selectedRows.push(row);
  }

  setSelectedCoinValue(value: number) {
    this.selectedCoinValue = value;
  }

  addBet(bet: Bet) {
    const existingBet = this.bets.find(
      (b) => b.type === bet.type && b.value === bet.value
    );

    if (existingBet) {
      existingBet.amount += bet.amount;
      existingBet.color = this.getColorByValue(existingBet.amount);
    } else {
      this.bets.push({ ...bet, color: this.selectedCoinColor });
    }

    this.playerMoney -= bet.amount;
  }

  placeNumberBet(number: number) {
    this.addBet({
      type: 'number',
      value: number,
      amount: this.selectedCoinValue,
    });
  }

  placeDozenBet(dozen: number) {
    this.addBet({
      type: 'dozen',
      value: dozen,
      amount: this.selectedCoinValue,
    });
  }

  placeHalfBet(half: string) {
    this.addBet({
      type: 'half',
      value: half,
      amount: this.selectedCoinValue,
    });
  }

  placeRowBet(row: number) {
    this.addBet({
      type: 'row',
      value: row,
      amount: this.selectedCoinValue,
    });
  }

  // Takes the bet type and value and returns the bet amount for that specific bet
  getBetAmount(
    type: 'number' | 'dozen' | 'half' | 'row',
    value: number | string
  ): number {
    const bet = this.bets.find((b) => b.type === type && b.value === value);
    return bet ? bet.amount : 0;
  }

  getTotalBetAmount(): number {
    return this.bets.reduce((total, bet) => total + bet.amount, 0);
  }

  get selectedCoinColor(): string {
    const index = this.coinValues.indexOf(this.selectedCoinValue);
    return this.coinColors[index];
  }

  getColorByValue(value: number): string {
    // Find the highest coin value
    const index = this.coinValues
      .slice()
      .reverse()
      .findIndex((coinValue) => value >= coinValue);

    return this.coinColors[
      this.coinColors.length - 1 - (index >= 0 ? index : 0)
    ];
  }

  spinRoulette() {
    this.spinning = true;
    const winningNumber = Math.floor(Math.random() * 37);

    setTimeout(() => {
      this.resultsHistory = [winningNumber, ...this.resultsHistory.slice(0, 4)];
      this.spinning = false;
      this.clearBets();
    }, 14000);

    const { winStatus, winAmount } = this.checkWinningNumber(winningNumber);
    this.winAmount = winStatus ? winAmount : null;

    return (this.winningNumber = winningNumber);
  }

  clearBets() {
    this.bets = [];
  }

  checkWinningNumber(winningNumber: number) {
    const isEven = winningNumber % 2 === 0;

    let winAmount = 0;
    let winStatus = false;

    const redNumbers = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];

    const isRed = redNumbers.includes(winningNumber);
    const isBlack = !isRed && winningNumber !== 0;

    for (const bet of this.bets) {
      switch (bet.type) {
        case 'number':
          if (bet.value === winningNumber) {
            this.playerMoney += bet.amount * 35;
            winAmount += bet.amount * 35;
            winStatus = true;
          }
          break;
        case 'dozen':
          const dozenStart = (bet.value as number) * 12 - 11;
          const dozenEnd = (bet.value as number) * 12;
          if (winningNumber >= dozenStart && winningNumber <= dozenEnd) {
            this.playerMoney += bet.amount * 3;
            winAmount += bet.amount * 3;
            winStatus = true;
          }
          break;
        case 'half':
          if (
            winningNumber !== 0 &&
            ((bet.value === '1to18' && winningNumber <= 18) ||
              (bet.value === '19to36' &&
                winningNumber >= 19 &&
                winningNumber <= 36) ||
              (bet.value === 'EVEN' && isEven) ||
              (bet.value === 'ODD' && !isEven) ||
              (bet.value === 'RED' && isRed) ||
              (bet.value === 'BLACK' && isBlack))
          ) {
            this.playerMoney += bet.amount * 2;
            winAmount += bet.amount * 2;
            winStatus = true;
          }
          break;
        case 'row':
          const rowStart = (bet.value as number) * 3 - 2;
          const rowEnd = (bet.value as number) * 3;
          if (winningNumber >= rowStart && winningNumber <= rowEnd) {
            this.playerMoney += bet.amount * 3;
            winAmount += bet.amount * 3;
            winStatus = true;
          }
          break;
      }
    }

    return { winStatus, winAmount };
  }
}

export const gameStore = new GameStore();
