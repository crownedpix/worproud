import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { UsersPage } from './users_lists';

@NgModule({
  declarations: [
    UsersPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersPage),
    TranslateModule.forChild()
  ],
  exports: [
    UsersPage
  ]
})
export class UsersPageModule { }
