import { Injectable, signal } from '@angular/core';

const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['+', '-', 'x', '÷', '%'];
const SPECIALS = ['C', '.', '=', '+/-', '%', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public result = signal('0');
  public subResult = signal('0');
  public lastOperator = signal('');

  public constructNumber(value: string): void {
    if (NUMBERS.includes(value)) {
      if (this.result.length >= 10) return;
      if (value === '0' && this.result() === '0') return;
      if (this.result() === '0') return this.result.set(value);
      this.result.update((prev) => prev + value);
      return;
    }

    if (OPERATORS.includes(value)) {
      // this.calculateResult();
      this.lastOperator.set(value);
      this.subResult.set(this.result());
      this.result.set('0');
      return;
    }

    if (SPECIALS.includes(value)) {
      switch (value) {
        case '=':
          this.calculateResult();
          return;

        case 'C':
          this.result.set('0');
          this.subResult.set('0');
          this.lastOperator.set('');
          return;

        // Validate negative numbers
        case 'Backspace':
          if (this.result() === '0') return;
          if (this.result().length === 1) return this.result.set('0');
          this.result.update((prev) => prev.slice(0, -1));
          return;

        // Decimal
        case '.':
          if (this.result().includes(value)) return;
          if (this.result() === '') return this.result.set('0.');
          this.result.update((prev) => prev + '.');
          return;

        case '+/-':
          if (this.result() === '0') return;
          if (this.result().includes('-'))
            return this.result.update((prev) => prev.slice(1));
          this.result.update((prev) => '-' + prev);
          return;

        default:
          return;
      }
    }
  }

  public calculateResult(): void {
    const accValue = parseFloat(this.subResult());
    const currentNumber = parseFloat(this.result());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = accValue + currentNumber;
        break;

      case '-':
        result = accValue - currentNumber;
        break;

      case 'x':
        result = accValue * currentNumber;
        break;

      case '÷':
        result = accValue / currentNumber;
        break;

      default:
        break;
    }

    this.result.set(result.toString());
    this.subResult.set('0');
    this.lastOperator.set('');
  }
}
