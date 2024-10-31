import { TestBed, ComponentFixture } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should be created', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBe(null);
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should contain specific tailwind classes', () => {
    const tailwindClasses =
      'w-full min-w-[250px] max-w-[300px] mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' '
      );

    compiled.classList.forEach((cls) => {
      expect(tailwindClasses).toContain(cls);
    });
    tailwindClasses.forEach((cls) => {
      expect(compiled.classList).toContain(cls);
    });
  });
});
