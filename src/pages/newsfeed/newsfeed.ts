import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, ToastController} from 'ionic-angular';
import {Items} from "../../providers";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {Observable} from 'rxjs/Rx';
@IonicPage()
@Component({
  selector: 'news-feed',
  templateUrl: 'newsfeed.html'
})
export class NewsFeed {
  cardItems: any[];
  films;

  public press: number = 0;
  public likes: number = 10;
  constructor(public navCtrl: NavController,private iab: InAppBrowser, public http: HttpClient, public modalCtrl: ModalController, public items: Items, public toastCtrl: ToastController) {

    //
    // this.http.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=a29246aa495f41f29efabe3cdbf19b79', {}, {})
    //   .then(data => {
    //
    //     console.log(data.status);
    //     console.log(data.data); // data received by server
    //     console.log(data.headers);
    //
    //   })
    //   .catch(error => {
    //
    //     console.log(error.status);
    //     console.log(error.error); // error message as string
    //     console.log(error.headers);
    //
    //   });
this.films = this.http.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=a29246aa495f41f29efabe3cdbf19b79');
this.films.subscribe(data => {
      console.log('my data: ', data);
      this.cardItems = data.articles;
    })
    // this.cardItems = [
    //   {
    //     user_avtar: 'assets/img/marty-avatar.png',
    //     user_name: 'Marty McFly',
    //     date: 'November 5, 1955',
    //     image: 'assets/img/advance-card-bttf.png',
    //     content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
    //   },
    //   {
    //     user_avtar: 'assets/img/sarah-avatar.png.jpeg',
    //     user_name: 'Sarah Connor',
    //     date: 'May 12, 1984',
    //     image: 'assets/img/advance-card-tmntr.jpg',
    //     content: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'
    //   },
    //   {
    //     user_avtar: 'assets/img/ian-avatar.png',
    //     user_name: 'Dr. Ian Malcolm',
    //     date: 'June 28, 1990',
    //     image: 'assets/img/advance-card-jp.jpg',
    //     content: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.'
    //   }
    // ];
  }
  addNewsFeed() {
    let addModal = this.modalCtrl.create('NewsfeedCreate');
    addModal.onDidDismiss(item => {
      if (item) {
        this.cardItems.push(item);
      }
    })
    addModal.present();
  }
  urlClick(url){
this.iab.create(url);
  }
  dblClickEvent(ev,user_name) {
    this.press++;
    if (this.press == 2) {
      let toast = this.toastCtrl.create({
        message: "You have liked this.",
        duration: 2000,
        position: 'top'
      });
      toast.present();
      this.press = 0;
      this.likes++;
    }
  }
}
