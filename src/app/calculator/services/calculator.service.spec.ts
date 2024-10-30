import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.result()).toBe('0');
    expect(service.subResult()).toBe('0');
    expect(service.lastOperator()).toBe('');
  });

  it('should set result, subResult and lastOperator to defaults when C key is pressed', () => {
    service.result.set('85');
    service.subResult.set('79859');
    service.lastOperator.set('*');

    service.constructNumber('C');

    expect(service.result()).toBe('0');
    expect(service.subResult()).toBe('0');
    expect(service.lastOperator()).toBe('');
  });

  it('should update result', () => {
    service.constructNumber('1');
    expect(service.result()).toBe('1');

    service.constructNumber('5');
    expect(service.result()).toBe('15');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    expect(service.lastOperator()).toBe('+');
    expect(service.result()).toBe('0');
  });

  it('should calculate the result correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('5');
    service.constructNumber('=');
    expect(service.result()).toBe('6');
  });

  it('should calculate the result correctly for substraction', () => {
    service.constructNumber('8');
    service.constructNumber('9');
    service.constructNumber('-');
    service.constructNumber('2');
    service.constructNumber('0');
    service.constructNumber('=');
    expect(service.result()).toBe('69');
  });

  it('should calculate the result correctly for product', () => {
    service.constructNumber('5');
    service.constructNumber('x');
    service.constructNumber('5');
    service.constructNumber('=');
    expect(service.result()).toBe('25');
  });

  it('should calculate the result correctly for division', () => {
    service.constructNumber('2');
    service.constructNumber('5');
    service.constructNumber('÷');
    service.constructNumber('5');
    service.constructNumber('=');
    expect(service.result()).toBe('5');
  });

  it('should handle decimal dot correctly', () => {
    service.constructNumber('2');
    service.constructNumber('.');
    service.constructNumber('9');
    expect(service.result()).toBe('2.9');
    service.constructNumber('.');
    expect(service.result()).toBe('2.9');
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('8');
    service.constructNumber('+/-');
    expect(service.result()).toBe('-8');
    service.constructNumber('+/-');
    expect(service.result()).toBe('8');
  });

  it('should handle backspace correctly', () => {
    service.constructNumber('7');
    service.constructNumber('9');
    service.constructNumber('7');
    service.constructNumber('4');

    service.constructNumber('Backspace');
    expect(service.result()).toBe('797');

    service.constructNumber('Backspace');
    service.constructNumber('Backspace');
    expect(service.result()).toBe('7');
  });

  it('should handle result max length correctly', () => {
    for (let i = 0; i < 15; i++) {
      service.constructNumber('1');
    }
    expect(service.result().length).toBe(10);
  });
});
