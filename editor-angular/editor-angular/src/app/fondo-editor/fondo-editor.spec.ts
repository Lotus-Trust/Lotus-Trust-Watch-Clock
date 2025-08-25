import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoEditor } from './fondo-editor';

describe('FondoEditor', () => {
  let component: FondoEditor;
  let fixture: ComponentFixture<FondoEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoEditor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
