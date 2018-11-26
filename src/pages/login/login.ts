import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { globalData } from '../../helper/helper';
import { Events } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 headers:any;
 loader:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public http: Http,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    private storage:Storage,
    public events: Events
    ) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  presentToast(m) {
    const toast = this.toastCtrl.create({
      message: m,
      duration: 3000
    });
    toast.present();
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }
   doLogin(email, password) {
    
    if (email == undefined || email == '') {
        this.presentToast('Please Enter Email');
        return false;
    }
    if (password == undefined || password == '') {
        this.presentToast('Please Enter Password');
        return false;
    }
    var loginObj = {
        email: email,
        password: password
    };

    this.presentLoading();
    this.headers = {'Content-Type': 'application/json'}; 
    this.http.post(globalData.serviceUrl + 'login', JSON.stringify(loginObj), {headers: this.headers})
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
        if (data.status == true) {
          this.loader.dismiss();
          this.presentToast(data.message)
          this.storage.set('userObject', data.data);
          this.events.publish('user:created', data.data); 
          this.storage.set('userId', data.data.id);
          this.navCtrl.setRoot('MenuPage');
        }
        else{
          this.loader.dismiss();
          this.presentToast(data.message)
        }
    });
    
  }
  


}
