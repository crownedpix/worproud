import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';

import {Items, User} from '../../providers';
import {ItemSliding} from "ionic-angular/umd";

@IonicPage()
@Component({
  selector: 'following',
  templateUrl: 'following.html'
})
export class Following {
  currentItems: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    // console.log(this.items.query());

    var items_here = [
      ['input1', 'input2'],
      ['input3', 'input4'],
      ['input5', 'input6'],
      ['input7', 'input8'],
      ['input9', 'input10'],
      ['input11', 'input12'],
      ['input13', 'input14'],
      ['input15', 'input16'],
      ['input17', 'input18'],
      ['input19', 'input20'],
    ];

    items_here[2]['about'] = "Application Developer";
    items_here[2]['name'] = "Sibabrat Swain";
    items_here[2]['profilePic'] = "../../assets/img/users/user1.jpg";

    items_here[0]['about'] = "Co-founder and CTO";
    items_here[0]['name'] = "Devadatta Sahoo ";
    items_here[0]['profilePic'] = "../../assets/img/users/user2.png";

    items_here[1]['about'] = "Software Developer";
    items_here[1]['name'] = "Pitabas Behera";
    items_here[1]['profilePic'] = "../../assets/img/users/user3.jpeg";


    items_here[3]['about'] = "Human Resources Executive ";
    items_here[3]['name'] = "Rutuparna Singh";
    items_here[3]['profilePic'] = "../../assets/img/users/user4.jpeg";


    items_here[4]['about'] = "Application Developer";
    items_here[4]['name'] = "Ashutosh kumar choubey";
    items_here[4]['profilePic'] = "../../assets/img/users/user5.jpeg";


    items_here[5]['about'] = "Electric Utilities Consultant";
    items_here[5]['name'] = "Manish Mishra";
    items_here[5]['profilePic'] = "../../assets/img/users/user6.jpeg";


    items_here[6]['about'] = "Co Founder at FDSHive";
    items_here[6]['name'] = "Bikash Sahoo";
    items_here[6]['profilePic'] = "../../assets/img/users/user7.jpeg";


    items_here[7]['about'] = "Business Consultant; Web Analyst";
    items_here[7]['name'] = "Monisha K";
    items_here[7]['profilePic'] = "../../assets/img/users/user8.jpeg";


    items_here[8]['about'] = "Software Developer";
    items_here[8]['name'] = "Nambrata Mital";
    items_here[8]['profilePic'] = "../../assets/img/users/user9.jpeg";


    items_here[9]['about'] = "Application Developer";
    items_here[9]['name'] = "Gokulananda Dash";
    items_here[9]['profilePic'] = "../../assets/img/users/user10.jpeg";


    // console.log(items_here);
    this.currentItems = items_here;

    // console.log(this.currentItems);
    // this.currentItems = this.items.query()

  }

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
