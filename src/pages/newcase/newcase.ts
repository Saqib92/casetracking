import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { globalData } from '../../helper/helper';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
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
  loader:any;
  confirmPdf :any;
    constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public http: Http,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    private storage:Storage,
    private transfer: FileTransfer,
    private file: File,
    private fileChooser: FileChooser
    ) {
  
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
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }


  choseFile(){
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        this.pdfUpload(uri)
      })
      .catch(e => console.log(e));
  }


  pdfUpload(path) {
  const fileTransfer: FileTransferObject = this.transfer.create();
  let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: '.pdf',
      chunkedMode: false,
      //mimeType: "image/jpeg",
    }

    this.presentLoading();
    fileTransfer.upload(path, globalData.serviceUrl+'file_upload', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.presentToast('PDF Uploaded Successfully');
      console.log(JSON.parse(data.response));
      let res = JSON.parse(data.response);
      if (res.status == true) {
        this.confirmPdf = res.data;
        this.loader.dismiss();
      }      
    }, (err) => {
      console.log(err);
      this.loader.dismiss();
      this.presentToast(err);
    });
} 
  newCase(customer_name, start_date,description) {
    
    if (customer_name == undefined || customer_name == '') {
        this.presentToast('Please Enter Customer Name');
        return false;
    }
    if (start_date == undefined || start_date == '') {
        this.presentToast('Please Enter Start Date');
        return false;
    }
    if (description == undefined || description == '') {
      this.presentToast('Please Enter Dsescription');
      return false;
    }
    if (this.confirmPdf == undefined || this.confirmPdf == '') {
        this.presentToast('Please Upload PDF First');
        return false;
    }
    let caseObj = {
      customer_name: customer_name,
      start_date: start_date,
      description: description,
      file: this.confirmPdf
    };

    this.presentLoading();
    this.headers = {'Content-Type': 'application/json'}; 
    this.http.post(globalData.serviceUrl + 'case', JSON.stringify(caseObj), {headers: this.headers})
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
        if (data.status == true) {
          this.loader.dismiss();
          this.presentToast(data.message);
          this.navCtrl.setRoot('HomePage');
        }
        else{
          this.loader.dismiss();
          this.presentToast(data.message)
        }
    });
  }

}
