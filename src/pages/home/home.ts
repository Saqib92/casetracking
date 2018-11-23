import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 headers:any;
 data:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public http: Http,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.getAllCases();
  }
  presentToast(m) {
    const toast = this.toastCtrl.create({
      message: m,
      duration: 3000
    });
    toast.present();
  }
  getAllCases() {
    this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'cases', {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
          if (data.status == true) {
            this.data = data.data;
            this.presentToast(data.message);
          }
          else{
            this.presentToast(data.message);
          }
      });
  }

  toNewCase(){
  	this.navCtrl.push('NewcasePage');
  }
}
