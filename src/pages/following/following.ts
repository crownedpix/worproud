import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';

import {Items, User} from '../../providers';
import {ItemSliding} from "ionic-angular/umd";
import firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'following',
  templateUrl: 'following.html'
})
export class Following {
  currentItems: any[];
  leftItems = 0;
  pos: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,
              public toastCtrl: ToastController, private afDB: AngularFireDatabase, public loadingCtrl: LoadingController) {

this.pos = this.afDB.list('/pos');
const personRef: firebase.database.Reference = firebase.database().ref('/pos');
  personRef.on('value', personSnapshot => {
    this.currentItems = this.snapshotToArray(personSnapshot);
  });
  };

  public ImgGale(img){
    return "../../assets/pos/"+ img;
  };

  public likePost(item) {
      firebase.database().ref('pos/' + item.id).set({
      completed: item.completed,
      difficulty: item.difficulty,
      favorite: !item.favorite,
      id: item.id,
      photoVal: item.photoVal
    }, function(error) {
    if (error) {

    } else {
      // Data saved successfully!
    }
    });
  }

  public compPost(item) {
      firebase.database().ref('pos/' + item.id).set({
      completed: !item.completed,
      difficulty: item.difficulty,
      favorite: item.favorite,
      id: item.id,
      photoVal: item.photoVal
    }, function(error) {
    if (error) {

    } else {
      // Data saved successfully!
    }
    });
  }

  snapshotToArray(snapshot) {
     this.leftItems = 0;
     var o = this;
     var returnArr = [];
     var sortArr = [];
     snapshot.forEach(function(childSnapshot) {
         var item = childSnapshot.val();
         item.key = childSnapshot.key;
         if(item.completed == true) {
           o.leftItems += 1;
         }
         returnArr.push(item);
     });
     // returnArr.reverse();
     return returnArr;
  };

  unfollowSomeOne(user: User,slidingItem: ItemSliding) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: "You have un-followed "+user['name']+" successfully .",
        duration: 2000,
        position: 'top'
      });
      slidingItem.close();
      toast.present();
    }, 2000);
  }
}
