import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SessionStorageService } from 'src/app/session-storage.service';
import { StandaloneCommonModule } from 'src/app/standalone-common/standalone-common.module';

@Component({
  selector: 'app-user-registration-sara-sansar',
  templateUrl: './user-registration-sara-sansar.component.html',
  styleUrls: ['./user-registration-sara-sansar.component.scss'],
  standalone: true,
  imports: [StandaloneCommonModule]
})
export class UserRegistrationSaraSansarComponent  implements OnInit {
  registrationForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder,private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.buildRegistrationForm();
  }


  buildRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phnNumber: ['',[Validators.required,Validators.pattern('^[0-9]{10}$')]]
    });
  }

  async register() {
    if (this.registrationForm.valid) {
      const loader = await this.loadingController.create({
        message: 'Registering...',
        spinner: null,
        cssClass: 'custom-spinner'
      });

      await loader.present();

      setTimeout(() => {
        const fullName = this.registrationForm.get('fullName').value;
        const email = this.registrationForm.get('email').value;
        const phnNumber = this.registrationForm.get('phnNumber').value;
        const password = this.registrationForm.get('password').value;

        // Create an object to hold the registration data
        const registrationData = {
          fullName: fullName,
          email: email,
          phnNumber: phnNumber,
          password: password
        };

        // Store the registration data in the session storage
        this.sessionStorage.setItem('registrationData', JSON.stringify(registrationData));

        loader.dismiss();
        this.showToast('Registration successful!', 'success');
        this.registrationForm.reset();
        this.router.navigateByUrl('/home');
      }, 2000);
    } else {
      this.showToast('Please fill in all the required fields.', 'danger');
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

  navigateToLogin() {
    this.router.navigateByUrl('/home');
  }
}
