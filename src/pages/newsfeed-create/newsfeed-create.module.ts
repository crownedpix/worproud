import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NewsfeedCreate } from './newsfeed-create';

@NgModule({
  declarations: [
    NewsfeedCreate,
  ],
  imports: [
    IonicPageModule.forChild(NewsfeedCreate),
    TranslateModule.forChild()
  ],
  exports: [
    NewsfeedCreate
  ]
})
export class NewsfeedCreateModule { }
