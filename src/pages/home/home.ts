import { Component } from '@angular/core';
import { IonicPage, NavController, Platform,  NavParams,ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
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
    public loadingCtrl:LoadingController,
    private document: DocumentViewer,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform
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


  downloadAndOpenPdf(name) {
    let path = null;
 
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
 
    const transfer = this.transfer.create();
    transfer.download(globalData.imagesUrl + name, path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
  }


  viewDoc(name){
    this.downloadAndOpenPdf(name);
  }

  deleteCase(id){
    console.log(id);
    this.headers = {'Content-Type':'application/json'};
      this.http.get(globalData.serviceUrl + 'delete/'+ id, {headers: this.headers})
       .map(res => res.json())
       .subscribe(data => {
         console.log(data);
          if (data.status == true) {
            this.presentToast(data.message);
            this.getAllCases();
          }
          else{
            this.presentToast(data.message);
          }
      });
  }

  editCase(id){



  }
}
