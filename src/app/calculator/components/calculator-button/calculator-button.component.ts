import {
  input,
  signal,
  output,
  Component,
  viewChild,
  type ElementRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class]': 'isDoubleSize() ? "w-2/4" : "w-1/4"',
  },
  encapsulation: ViewEncapsulation.None,
})
export default class CalculatorButtonComponent {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isOperator = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public clickHandler(): void {
    const value = this.contentValue()?.nativeElement.innerText;
    if (!value) return;
    this.onClick.emit(value.trim());
  }

  public keyPressedStyleHandler(key: string): void {
    if (!this.contentValue()) return;
    const btnInnerText = this.contentValue()?.nativeElement.innerText;
    if (btnInnerText !== key) return;
    this.isPressed.set(true);
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }

  // ? create a bind with the host element
  // @HostBinding('class') get btnOperationClass() {
  //   return this.isDoubleSize() ? 'w-2/4' : 'w-1/4';
  // }
  // @HostBinding('class.is-operation') get btnOperationClass() {
  //   return this.isOperation();
  // }
}
