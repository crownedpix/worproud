import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NewsFeed } from './newsfeed';

@NgModule({
  declarations: [
    NewsFeed,
  ],
  imports: [
    IonicPageModule.forChild(NewsFeed),
    TranslateModule.forChild()
  ],
  exports: [
    NewsFeed
  ]
})
export class NewsfeedModule { }
