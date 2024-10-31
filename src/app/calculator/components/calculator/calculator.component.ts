import {
  inject,
  computed,
  Component,
  viewChildren,
  ChangeDetectionStrategy,
} from '@angular/core';

import { CalculatorService } from '@/calculator/services/calculator.service';
import CalculatorButtonComponent from '../calculator-button/calculator-button.component';

const KEY_EQUIVALENTS: Record<string, string> = {
  Escape: 'C',
  Clear: 'C',
  Enter: '=',
  '*': 'x',
  '/': '÷',
};

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'keyboardEventHandler($event)',
  },
})
export default class CalculatorComponent {
  private caclulatorService = inject(CalculatorService);
  public buttons = viewChildren(CalculatorButtonComponent);
  public result = computed(() => this.caclulatorService.result());
  public subResult = computed(() => this.caclulatorService.subResult());
  public lastOperator = computed(() => this.caclulatorService.lastOperator());

  public clickHandler(key: string): void {
    this.caclulatorService.constructNumber(key);
  }

  // ? Listen host events - not recommended for new angular apps
  // @HostListener('document:keyup', ['$event'])
  public keyboardEventHandler(event: KeyboardEvent): void {
    const key = event.key;
    const keyValue = KEY_EQUIVALENTS[key] ?? key;
    this.clickHandler(keyValue);
    this.buttons().forEach((btn) => {
      btn.keyPressedStyleHandler(keyValue);
    });
  }
}
