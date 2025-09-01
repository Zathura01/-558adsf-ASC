import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventForm } from './new-event-form';

describe('NewEventForm', () => {
  let component: NewEventForm;
  let fixture: ComponentFixture<NewEventForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEventForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEventForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
