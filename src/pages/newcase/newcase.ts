import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the NewcasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newcase',
  templateUrl: 'newcase.html',
})
export class NewcasePage {
  headers:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController, public http: Http, public toastCtrl:ToastController, public loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewcasePage');
  }
  presentToast(m) {
    const toast = this.toastCtrl.create({
      message: m,
      duration: 3000
    });
    toast.present();
  }
  Newcase(customer_name, start_date,description) {
    
    if (customer_name == undefined || customer_name == '') {
        this.presentToast('Please Enter Customer Name');
        return false;
    }
    if (start_date == undefined || start_date == '') {
        this.presentToast('Please Enter Start Date');
        return false;
    }
    if (description == undefined || description == '') {
      this.presentToast('Please Enter description');
      return false;
  }
    var loginObj = {
      customer_name: customer_name,
      start_date: start_date,
      description: description,
      file:'tes'
    };

    var that = this;
    //this.presentLoading();
    this.headers = { 'Content-Type': 'application/json' };
    this.http.post('http://localhost/demoapp-we/api/case', JSON.stringify(loginObj), { headers: this.headers })
        .map(function (res) { return res.json(); })
        .subscribe(function (data) {
        console.log(data);
        if (data.status == true) {
               // this.storage.set('userObject', data.data);
               // _this.loader.dismiss();
                 that.presentToast(data.message);
               that.navCtrl.setRoot('NewcasePage');
                //  this.navCtrl.setRoot('MenuPage');
        }
        else if (data.status == false) {
          that.presentToast(data.message);
           // _this.loader.dismiss();
           // _this.showPrompt();
        }
        else {
            //_this.loader.dismiss();
            that.presentToast(data.message);
        }
    });
  }

}
