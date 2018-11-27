import { HomePage } from './../home/home';
import { ProfilePage } from './../profile/profile';
import { TabsPage } from './../tabs/tabs';
import { NewcasePage } from './../newcase/newcase';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { globalData } from '../../helper/helper';
import { Events } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}
 
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  // Basic root for our content view
  rootPage = 'TabsPage';
 pic:any;
 name:any;
 imgUrl:any;
  // Reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    { title: 'Home', pageName: 'HomePage', tabComponent: HomePage, index: 0, icon: 'home' },
    { title: 'Profile', pageName: 'ProfilePage', tabComponent: 'ProfilePage', index: 1, icon: 'person' },
    { title: 'Special', pageName: 'SpecialPage', icon: 'shuffle' },
    { title: 'New Case', pageName: 'NewcasePage', icon: 'shuffle' },
  ];
 
  constructor(public navCtrl: NavController,  private storage:Storage, public events: Events, private fcm: FCM,) { 
    this.getmydata();
    this.imgUrl = globalData.imagesUrl;
  }
 
  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }
 
  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

getmydata(){
  this.storage.get('userObject').then((val)=>{
        if(val != null || val != undefined){
          this.name = val.name + ' ' + val.last_name;
          this.pic = val.profile;
        }
    })

  this.events.subscribe('user:created', (data) => {   // update from login
     console.log(data);
       this.name = data.name + ' ' + data.last_name;
          this.pic = data.profile; 
});
}
  logOut(){
    this.storage.clear();
    this.rootPage = 'LoginPage';
    this.fcm.unsubscribeFromTopic('all');
  }
 
}