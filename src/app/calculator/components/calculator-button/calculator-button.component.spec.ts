import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import CalculatorButtonComponent from './calculator-button.component';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `<calculator-button>
    <span class="text-red-500">Test content</span>
  </calculator-button>`,
})
class TestComponent {}

describe('CaclulatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should aaply tailwind class w-1/4 if isDoubleSize is false', () => {
    expect(compiled.classList).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should aaply tailwind class w-2/4 if isDoubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    expect(compiled.classList).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick when button is clicked', () => {
    component.contentValue()!.nativeElement.innerText = '1';
    spyOn(component.onClick, 'emit');
    component.clickHandler();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('isPressed should change when keyPressedStyleHandler is called with a matching key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyPressedStyleHandler('1');
    expect(component.isPressed()).toBeTrue();
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 100);
  });

  it('isPressed should not change when keyPressedStyleHandler is called with a mismatching key', () => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyPressedStyleHandler('2');
    expect(component.isPressed()).toBeFalse();
  });

  it('should display the projected content', () => {
    const testComponentFixture = TestBed.createComponent(TestComponent);
    const compiled = testComponentFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span.text-red-500')).toBeDefined();
  });
});
