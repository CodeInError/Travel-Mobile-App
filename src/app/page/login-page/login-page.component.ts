import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StandaloneCommonModule } from 'src/app/standalone-common/standalone-common.module';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { SessionStorageService } from 'src/app/session-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [StandaloneCommonModule]
})
export class LoginPageComponent  implements OnInit {
  loginForm: FormGroup | any;
  loading: boolean = false;


  constructor(private formBuilder: FormBuilder, private router: Router, private loadingController: LoadingController,
    private toastController: ToastController,
    private authService: AuthService,
    private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      rememberMe: [false]
    });
  }


  async login() {
    if (this.loginForm.valid) {
      const loader = await this.loadingController.create({
        message: 'Logging in...',
        spinner: null,
        cssClass: 'custom-spinner'
      });

      await loader.present();

      setTimeout(() => {
        const userName = this.loginForm.get('userName').value;
        const userPassword = this.loginForm.get('userPassword').value;
        console.log('Username:', userName);
        console.log('Password:', userPassword);
        console.log('Remember Me:', this.loginForm.get('rememberMe').value);

        // Retrieve registration data from session storage
        const registrationDataString = this.sessionStorage.getItem('registrationData');
        const registrationData = registrationDataString ? JSON.parse(registrationDataString) : null;
        // Check if the entered username and password match the stored registration data
        if (registrationData && userName === registrationData.fullName && userPassword === registrationData.password) {
          // Successful login
          loader.dismiss();
          this.authService.login();
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        } else {
          // Incorrect login credentials
          loader.dismiss();
          this.showToast('Incorrect login credentials. Please try again.', 'danger');
        }
      }, 2000);
    } else {
      this.showToast('Please enter valid username and password.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      buttons: [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel'
        }
      ],
      color: color
    });

    await toast.present();
  }


  navigateToRegistration(){
    this.router.navigateByUrl('/user-registration');
  }

}
