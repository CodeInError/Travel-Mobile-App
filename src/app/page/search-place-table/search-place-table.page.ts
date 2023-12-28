import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonicModule, ToastController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-search-place-table',
  templateUrl: './search-place-table.page.html',
  styleUrls: ['./search-place-table.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPlaceTablePage implements OnInit {

  constructor(private toastController: ToastController) { }

  searchResult: string = '';

  ngOnInit() {
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'No Notification!',
      duration: 3000,
      position: position,
    });

    await toast.present();
  }

  bannerSlidesOpts: SwiperOptions = {
    autoplay: {
      delay: 3000,
    },
    speed: 800,
    freeMode: true,
    effect: 'fade'
  };

  cardData = [
    {
      color: 'dark',
      imageSrc: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Leh Ladakh',
      content: 'Card Content 1',
    },
    {
      color: 'secondary',
      imageSrc: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Card Title 2',
      content: 'Card Content 2',
    },
    {
      color: 'tertiary',
      imageSrc: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Card Title 2',
      content: 'Card Content 2',
    },
    {
      color: 'success',
      imageSrc: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Card Title 2',
      content: 'Card Content 2',
    },
  ];

  onSearch(searchQuery: any) {
    this.searchResult = searchQuery ?? '';
  }

}

