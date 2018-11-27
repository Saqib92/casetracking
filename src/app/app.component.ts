import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { FCM } from '@ionic-native/fcm';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;
  rootPage:any = 'LoginPage';
myData:any;
  constructor(
    platform: Platform,
    private fcm: FCM,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage:Storage,
    public events: Events
    ) {
    platform.ready().then(() => {
      this.checkLogin();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  checkLogin(){
    this.pushSetup();
    this.storage.get('userObject').then((val)=>{
        if(val != null || val != undefined){
          this.nav.setRoot('MenuPage');
          this.myData = val;
        }
    })
  }


pushSetup(){
  this.fcm.subscribeToTopic('all');
}

}

