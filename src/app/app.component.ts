import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
   @ViewChild(Nav) nav: Nav;
  rootPage:any = 'LoginPage';
myData:any;
  constructor(platform: Platform,private fcm: FCM, statusBar: StatusBar, splashScreen: SplashScreen,     private storage:Storage) {
    platform.ready().then(() => {
      this.checkLogin();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  checkLogin(){
    this.storage.get('userObject').then((val)=>{
        if(val != null || val != undefined){
          this.nav.setRoot('MenuPage');
          this.myData = val;
        }
    })
  }


push(){
  this.fcm.subscribeToTopic('marketing');

this.fcm.getToken().then(token => {
  //backend.registerToken(token);
});

this.fcm.onNotification().subscribe(data => {
  if(data.wasTapped){
    console.log("Received in background");
  } else {
    console.log("Received in foreground");
  };
});

this.fcm.onTokenRefresh().subscribe(token => {
  //backend.registerToken(token);
});

this.fcm.unsubscribeFromTopic('marketing');
}

}

