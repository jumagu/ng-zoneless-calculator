import { ChangeDetectionStrategy, Component } from '@angular/core';

import CalculatorComponent from '@/calculator/components/calculator/calculator.component';

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'w-full max-w-[300px] mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden',
  },
})
export default class CalculatorViewComponent {}
