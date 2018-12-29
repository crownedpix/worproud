import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { Followers } from './followers';

@NgModule({
  declarations: [
    Followers,
  ],
  imports: [
    IonicPageModule.forChild(Followers),
    TranslateModule.forChild()
  ],
  exports: [
    Followers
  ]
})
export class FollowersModule { }
