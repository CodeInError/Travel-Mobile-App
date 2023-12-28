import { Component, OnInit } from '@angular/core';
import { StandaloneCommonModule } from 'src/app/standalone-common/standalone-common.module';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { SessionStorageService } from 'src/app/session-storage.service';
import { SearchPlaceTablePage } from '../search-place-table/search-place-table.page';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [StandaloneCommonModule, SearchPlaceTablePage]
})
export class DashboardComponent  implements OnInit {
  isLoggedIn: boolean = false;
  fullName: string = '';
  profilePhoto: string | any;

  constructor(private router: Router,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private authService: AuthService,
    private sessionStorage: SessionStorageService,
    private toastController: ToastController) { }

    ngOnInit() {
      this.profilePhoto = sessionStorage.getItem('profilePhoto');
      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
          const registrationDataString = this.sessionStorage.getItem('registrationData');
          const registrationData = registrationDataString ? JSON.parse(registrationDataString) : null;
          this.fullName = registrationData.fullName || '';
        }
      });
    }




  async goToLoginPage(){
    const loader = await this.loadingController.create({
      message: 'Logged out...',
      spinner: null,
      cssClass: 'custom-spinner'
    });

    await loader.present();

    // Simulate an API call or any asynchronous task
    setTimeout(() => {
      loader.dismiss();
      this.authService.logout();
      this.router.navigate(['/home']);
    }, 3000);
  }

  closeMenu() {
    // Close the menu
    this.menuCtrl.close();

    // Navigate back to the dashboard
    this.navCtrl.navigateBack('/dashboard');
  }

  openFileInput() {
    const fileInput = document.querySelector('#fileInput') as HTMLInputElement;
    console.log('Sameer => 69',fileInput);
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.profilePhoto = e.target?.result as string;
        console.log('Selected Photo:', this.profilePhoto);
        sessionStorage.setItem('profilePhoto', this.profilePhoto);    // Store the profile photo in session storage
      };

      reader.readAsDataURL(file);
    }
  }


  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'No Notification!',
      duration: 3000,
      position: position,
    });

    await toast.present();
  }

  goToSearchPlacePage(){
    this.router.navigateByUrl('/search-place-table');
  }

}

