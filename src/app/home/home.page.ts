import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginPageComponent } from '../page/login-page/login-page.component';
import { StandaloneCommonModule } from '../standalone-common/standalone-common.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [StandaloneCommonModule, LoginPageComponent]
})
export class HomePage {
  constructor() {}
}
