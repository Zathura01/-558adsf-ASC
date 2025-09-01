import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConf } from './event-conf';

describe('EventConf', () => {
  let component: EventConf;
  let fixture: ComponentFixture<EventConf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventConf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventConf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
