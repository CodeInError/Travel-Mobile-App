import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserRegistrationSaraSansarComponent } from './user-registration-sara-sansar.component';

describe('UserRegistrationSaraSansarComponent', () => {
  let component: UserRegistrationSaraSansarComponent;
  let fixture: ComponentFixture<UserRegistrationSaraSansarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationSaraSansarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationSaraSansarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
