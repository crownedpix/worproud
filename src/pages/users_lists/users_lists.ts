import {Component} from '@angular/core';
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  LoadingController
} from 'ionic-angular';
import {Vibration} from '@ionic-native/vibration';


import {Item} from '../../models/item';
import {Items} from '../../providers';
import {ItemSliding} from "ionic-angular/umd";



@IonicPage()
@Component({
  selector: 'users_lists',
  templateUrl: 'users_lists.html'
})
export class UsersPage {

  currentItems: any[];
  public press: number = 0;


  constructor(public vibration: Vibration, public navCtrl: NavController, public navParams: NavParams,
              public items: Items, public modalCtrl: ModalController,
              public toastCtrl: ToastController, private alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

    this.currentItems = this.items.query();


  }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = this.items.query();
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }


  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        console.log(item);
        this.items.add(item);
      }
    })
    addModal.present();
  }

  pressEvent(ev) {
    this.press++;
    this.vibration.vibrate(150);
    let toast = this.toastCtrl.create({
      message: "please slide to get the options .",
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }


  deleteItem(item, slidingItem: ItemSliding) {

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            loading.present();
            setTimeout(() => {
              loading.dismiss();
              this.items.delete(item);
              let toast = this.toastCtrl.create({
                message: "You have deleted " + item['name'] + " successfully .",
                duration: 2000,
                position: 'top'
              });
              toast.present();
            }, 1000);
          }
        }
      ]
    });
    alert.present();
  }
}
