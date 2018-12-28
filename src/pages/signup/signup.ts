import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers';
import { FirstRunPage } from '../';
import firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  dataA: { myDate: string, type: string, hrs: string, dayType: string, exp:string } = {
    myDate: '',
    type: '',
    hrs: '',
    dayType: '',
    exp:''
  };
  account: { name: string, email: string, password: string,number:string,myDate:string, gender:string} = {
    name: '',
    email: '',
    password: '',
    number:'',
    myDate:'MM/DD/YYYY',
    gender:'m'
  };
  mPartner: AngularFireList<any>;
  fPartner: AngularFireList<any>;
  emer: AngularFireList<any>;
  vEmer: AngularFireList<any>;
  nEmer: AngularFireList<any>;
  wEmer: AngularFireList<any>;

  songs;
  girls;
  waitMins=0;
  // Our translated text strings
  private signupErrorString: string;
  constructor(public navCtrl: NavController, public user: User, public toastCtrl: ToastController,  private afDB: AngularFireDatabase, public translateService: TranslateService) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    // TO ADD
    this.emer = this.afDB.list('/Emergency');
    this.vEmer = this.afDB.list('/VEmergency');
    this.nEmer = this.afDB.list('/NEmergency');
    this.wEmer = this.afDB.list('/WEmergency');
    this.mPartner = this.afDB.list('/boy');
    // this.mPartner = this.afDB.list('/girl');

    // TO DISPPALY
  // const personRef: firebase.database.Reference = firebase.database().ref('/girl');
  const personRef: firebase.database.Reference = firebase.database().ref('/boy');
    personRef.on('value', personSnapshot => {
      this.girls = this.snapshotToArray(personSnapshot);
    });
  }


 snapshotToArray(snapshot) {
    var returnArr = [];
    var sortArr = [];
    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    returnArr.reverse();
    for(var i = 0; i <= returnArr.length; i++){
      if(i <= 5)
      sortArr.push(returnArr[i]);
    }
    return sortArr;
};
  doRecord() {
  const sRef = this.mPartner.push({});
  sRef.set({
    id: sRef.key,
    Date: this.dataA.myDate,
    Type: this.dataA.type,
    Hours: this.dataA.hrs,
    Day: this.dataA.dayType,
    Experience: this.dataA.exp,
  });
  setTimeout(() => {
    this.user.login(this.account).subscribe((resp) => {
    }, (err) => {
    navigator['app'].exitApp();
    });
  }, 2000);
  }

calcu(arr){
  var re = "";
  for(var i = 0; i < arr.length; i++){
    if(i != 0)
    re += ", ";
    if(arr[i] == "NSRM"){
      re += "not filled";
    }
    if(arr[i] == "SRM"){
      re += "filled";
    }
    if(arr[i] == "SAS"){
      re += "Ass entered";
    }
    if(arr[i] == "WLD"){
      re += "Wild";
    }
    if(arr[i] == "FRC"){
      re += "Forced";
    }
    if(arr[i] == "ORL"){
      re += "Oral involved";
    }
    if(arr[i] == "DLD"){
      re += "Dildo used";
    }

  }
  return re;
}

  myDate = new Date().toISOString();
  emergency(){
    this.afDB.list('/Emergency').remove();

    const sRef = this.emer.push({});
    sRef.set({
      id: sRef.key,
      Date: this.myDate
    });
    const toast = this.toastCtrl.create({
      message: "Sent Succesfully",
      duration: 2000,
      position: 'top'
    });
  }

  veryEmergency(){
    this.afDB.list('/VEmergency').remove();
    const sRef = this.vEmer.push({});
    sRef.set({
      id: sRef.key,
      Date: this.myDate
    });
    const toast = this.toastCtrl.create({
      message: "Sent Succesfully",
      duration: 2000,
      position: 'top'
    });
  }

  notEmergency(){
  this.afDB.list('/NEmergency').remove();
    const sRef = this.nEmer.push({});
    sRef.set({
      id: sRef.key,
      Date: this.myDate
    });
    const toast = this.toastCtrl.create({
      message: "Sent Succesfully",
      duration: 2000,
      position: 'top'
    });
  }

  waitEmergency(){
    this.afDB.list('/WEmergency').remove();
    if(this.waitMins == 0){
      const toast = this.toastCtrl.create({
        message: "Not sent set minutes",
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else {
      const sRef = this.wEmer.push({});
      const b = this.waitMins;
      sRef.set({
        id: sRef.key,
        Date: this.myDate,
        mins: b
      });
      const toast = this.toastCtrl.create({
        message: "Sent Succesfully",
        duration: 2000,
        position: 'top'
      });
      this.waitMins=0;
      toast.present();
    }
  }



  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(FirstRunPage);
    }, (err) => {
      this.navCtrl.push(FirstRunPage);
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: "You have successfully signed up . Please sign in .",//this.signupErrorString
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  welcomePage(){
    this.navCtrl.push('WelcomePage');
  }
}
