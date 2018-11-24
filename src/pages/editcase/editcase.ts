import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { globalData } from '../../helper/helper';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
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
newfile:any;

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
    private fileChooser: FileChooser
    ) {
  	if (this.navParams.get('editObj') !== null) {
  		this.customerName = this.navParams.get('editObj').oldname;
  		this.newDescription = this.navParams.get('editObj').des;
  		this.newDate = this.navParams.get('editObj').date;
  		this.newfile = this.navParams.get('editObj').file;
  	}
  		
  		
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
	        this.newfile = res.data;
	        this.loader.dismiss();
	      }      
	    }, (err) => {
	      console.log(err);
	      this.loader.dismiss();
	      this.presentToast(err);
	    });
    } 

  editCase(){

  	let updateobj = {
  		id: this.navParams.get('editObj').id,
  	  customer_name: this.customerName,
      start_date: this.newDate,
      description: this.newDescription,
      file: this.newfile
  	}

  	this.presentLoading();
    this.headers = {'Content-Type': 'application/json'}; 
    this.http.post(globalData.serviceUrl + 'update', JSON.stringify(updateobj), {headers: this.headers})
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
