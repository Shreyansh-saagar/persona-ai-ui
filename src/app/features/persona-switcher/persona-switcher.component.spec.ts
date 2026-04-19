import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaSwitcherComponent } from './persona-switcher.component';

describe('PersonaSwitcherComponent', () => {
  let component: PersonaSwitcherComponent;
  let fixture: ComponentFixture<PersonaSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaSwitcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonaSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
