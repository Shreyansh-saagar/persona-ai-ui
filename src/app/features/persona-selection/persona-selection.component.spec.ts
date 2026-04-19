import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaSelectionComponent } from './persona-selection.component';

describe('PersonaSelectionComponent', () => {
  let component: PersonaSelectionComponent;
  let fixture: ComponentFixture<PersonaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
