import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { globalData } from '../../helper/helper';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
headers:any;
loader:any;
userId:any;
fName:any;
lName:any;
email:any;
birthDay:any;
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
    this.storage.get('userObject').then((val1)=>{
      this.fName = val1.name;
      this.lName = val1.last_name;
      this.email = val1.email;
      this.birthDay = val1.bday;
    })
    this.storage.get('userId').then((val)=>{
      this.userId = val;
    })


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  toPhoto(){
  	this.navCtrl.push('ProfilephotoPage');
  }


  saveProfile(fName, lName, email, birthDay){

    if (fName == undefined || fName == '') {
      this.presentToast('Please Enter First Name');
      return false;
    }
    if (lName == undefined || lName == '') {
      this.presentToast('Please Enter Last Name');
      return false;
    }
    if (email == undefined || email == '') {
      this.presentToast('Please Enter Email');
      return false;
    }
    if (birthDay == undefined || birthDay == '') {
      this.presentToast('Please Enter Birth Date');
      return false;
    }

    let profileObj = {
      id: this.userId,
      name: fName,
      last_name: lName,
      email: email,
      bday: birthDay
    }
     this.presentLoading();
        this.headers = {'Content-Type': 'application/json'}; 
        this.http.post(globalData.serviceUrl + 'update_profile', JSON.stringify(profileObj), {headers: this.headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
            if (data.status == true) {
              this.loader.dismiss();
              this.storage.set('userObject', data.data);
              this.events.publish('user:created', data.data); 
              this.presentToast(data.message)       
            }
            else{
              this.loader.dismiss();
              this.presentToast(data.message)
            }
        });
  }

}
