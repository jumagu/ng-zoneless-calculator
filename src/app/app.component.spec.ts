import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render the router-outlet inside a div with specific tailwind classes', () => {
    const div = compiled.querySelector('div');
    const tailwindClasses =
      'min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5'.split(
        ' '
      );

    expect(div).toBeTruthy();
    // div?.classList.forEach((cls) => {
    //   expect(tailwindClasses).toContain(cls);
    // });
    tailwindClasses.forEach((cls) => {
      expect(div?.classList).toContain(cls);
    });
  });
});
