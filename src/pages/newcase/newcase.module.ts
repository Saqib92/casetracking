import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewcasePage } from './newcase';

@NgModule({
  declarations: [
    NewcasePage,
  ],
  imports: [
    IonicPageModule.forChild(NewcasePage),
  ],
})
export class NewcasePageModule {}
