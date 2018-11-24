import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the EditcasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcase',
  templateUrl: 'editcase.html',
})
export class EditcasePage {
loader:any;
headers:any;
customerName:any;
newDate:any;
newDescription:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public http: Http,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    private document: DocumentViewer,
    private transfer: FileTransfer,
    private file: File
    ) {
  		this.customerName = this.navParams.get('editObj').cname;
  		this.newDescription = this.navParams.get('editObj').des;
  		this.newDate = this.navParams.get('editObj').date;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcasePage');
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

  editCase(name, date, description){

  }

}
