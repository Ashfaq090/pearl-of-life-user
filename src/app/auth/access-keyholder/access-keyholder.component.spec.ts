import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessKeyholderComponent } from './access-keyholder.component';

describe('AccessKeyholderComponent', () => {
  let component: AccessKeyholderComponent;
  let fixture: ComponentFixture<AccessKeyholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessKeyholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessKeyholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
