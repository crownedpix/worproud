import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, ViewController, ToastController, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Camera} from '@ionic-native/camera';

import {User} from '../../providers';

@IonicPage()
@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  profileDetails: any[];
  private isDisabled: boolean = true;
  private caption_name: string = "EDIT";
  account: {
    user_name: string, user_email: string, user_password: string, user_state: string, profile_image: string,
    full_name: string, about: string
  } = {
    user_name: 'arnoldschwarzenegger',
    user_email: 'arnold.sc@terminator.net',
    user_password: 'password',
    user_state: 'California',
    profile_image: 'asset/img/src/img.jpg',
    full_name: 'Arnold Schwarzenegger',
    about: 'Former Governor of California'
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder,
              public camera: Camera, public users: User,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    this.form = formBuilder.group({
      image: [''], user_name: [''], user_password: [''], user_email: [''], user_state: [''],
    });


    this.profileDetails = [
      {
        full_name: "Arnold Schwarzenegger",
        about: "Former Governor of California",
        followers: 230,
        following: 170
      },
    ];

  }

  openFollowers() {
    this.navCtrl.push('Followers');
  }

  openFollowing() {
    this.navCtrl.push('Following');
  }

  changedSmtng() {
    this.caption_name = "SAVE";
  }

  editProfile() {
    if (this.caption_name == "EDIT") {
      this.isDisabled = false;
      this.caption_name = "CANCEL";
    } else if (this.caption_name == "SAVE") {

      console.log(this.isReadyToSave);
      if (!(this.account.user_name && this.account.user_email && this.account.user_password && this.account.user_state)) {
        let toast = this.toastCtrl.create({
          message: "Validation errors !",
          duration: 2000,
          position: 'top'
        });
        toast.present();
      } else {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        setTimeout(() => {
          loading.dismiss();
          let toast = this.toastCtrl.create({
            message: "You have successfully updated your details .",
            duration: 2000,
            position: 'top'
          });
          this.caption_name = "EDIT";
          this.isDisabled = true;
          toast.present();

        }, 2000);
      }
    } else if (this.caption_name == "CANCEL") {
      this.isDisabled = true;
      this.caption_name = "EDIT";
    }
  }

  ionViewDidLoad() {
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({'image': 'data:image/jpg;base64,' + data});
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({'image': imageData});
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }


}
