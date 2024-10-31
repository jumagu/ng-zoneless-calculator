import { TestBed, ComponentFixture } from '@angular/core/testing';

import CalculatorComponent from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

class MockCalculatorService {
  public result = jasmine.createSpy('result').and.returnValue('100.00');
  public subResult = jasmine.createSpy('subResult').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('');
  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;

    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have the initial values from the service', () => {
    expect(component.result()).toBe('100.00');
    expect(component.subResult()).toBe('0');
    expect(component.lastOperator()).toBe('');
  });

  it('should display the calculation correctly', () => {
    mockCalculatorService.result.and.returnValue('50');
    mockCalculatorService.subResult.and.returnValue('25');
    mockCalculatorService.lastOperator.and.returnValue('-');

    fixture.detectChanges();

    expect(component.result()).toBe('50');
    expect(component.subResult()).toBe('25');
    expect(component.lastOperator()).toBe('-');

    expect(compiled.querySelector('span')?.innerText).toBe('25 -');
  });

  it('should have 19 buttons (using property)', () => {
    expect(component.buttons()).toBeTruthy();
    expect(component.buttons()).toHaveSize(19);
  });

  it('should have 19 buttons (using querySelectorAll)', () => {
    // const buttonsByDirective = fixture.debugElement.queryAll(
    //   By.directive(CalculatorButtonComponent)
    // );
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons).toHaveSize(19);
  });

  it('button should have the correct inner text', () => {
    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons[0].textContent).toBe('C');
    expect(buttons[1].textContent).toBe('+/-');
    expect(buttons[2].textContent).toBe('%');
    expect(buttons[3].textContent).toBe('÷');
  });

  it('should handle keyboard events correctly', () => {
    const keyEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(keyEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const keyEscape = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(keyEscape);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.result.and.returnValue('123');
    fixture.detectChanges();
    expect(component.result()).toBe('123');
  });
});
