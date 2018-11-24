import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditcasePage } from './editcase';

@NgModule({
  declarations: [
    EditcasePage,
  ],
  imports: [
    IonicPageModule.forChild(EditcasePage),
  ],
})
export class EditcasePageModule {}
