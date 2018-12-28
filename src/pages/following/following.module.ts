import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { Following } from './following';

@NgModule({
  declarations: [
    Following,
  ],
  imports: [
    IonicPageModule.forChild(Following),
    TranslateModule.forChild()
  ],
  exports: [
    Following
  ]
})
export class FollowerModule { }
