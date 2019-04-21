import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChilduserlistComponent } from './childuserlist.component';

describe('ChilduserlistComponent', () => {
  let component: ChilduserlistComponent;
  let fixture: ComponentFixture<ChilduserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChilduserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChilduserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
