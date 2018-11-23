import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { globalData } from '../../helper/helper';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the ProfilephotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilephoto',
  templateUrl: 'profilephoto.html',
})
export class ProfilephotoPage {
imgUrl :any;
loader:any;
headers:any;
proPic:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public http: Http,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController,
    private storage:Storage,
    private camera: Camera,
    private transfer: FileTransfer,
    private file: File,
    ) {
    this.imgUrl = globalData.imagesUrl;
	  	this.storage.get('userObject').then((val)=>{
	  		this.proPic = val.profile;
	  	})
  	}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilephotoPage');
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
      content: "Please wait...",
    });
    this.loader.present();
  }

  takePhoto(){
  	const options: CameraOptions = {
	  quality: 80,
	  destinationType: this.camera.DestinationType.FILE_URI,
	  encodingType: this.camera.EncodingType.JPEG,
	  mediaType: this.camera.MediaType.PICTURE,
	  sourceType: this.camera.PictureSourceType.CAMERA
	}

	this.camera.getPicture(options).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64 (DATA_URL):
	 this.proPic = imageData;
	 this.imageUpload(this.proPic);
	 //let base64Image = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {
	 // Handle error
	});
  }

  chosePhoto(){
  	const options: CameraOptions = {
	  quality: 80,
	  destinationType: this.camera.DestinationType.FILE_URI,
	  encodingType: this.camera.EncodingType.JPEG,
	  mediaType: this.camera.MediaType.PICTURE,
	  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
	}

	this.camera.getPicture(options).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64 (DATA_URL):
	 this.proPic = imageData;
	 this.imageUpload(this.proPic);
	 //let base64Image = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {
	 // Handle error
	});
  }

imageUpload(path) {
  const fileTransfer: FileTransferObject = this.transfer.create();
  let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: '.png',
      chunkedMode: false,
      //mimeType: "image/jpeg",
    }

    this.presentLoading();
    fileTransfer.upload(path, globalData.serviceUrl+'update_profile_pic', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      console.log(JSON.parse(data.response));
      let res = JSON.parse(data.response);
      if (res.success == true) {
      	this.storage.set('userObject', res.data);
      	this.loader.dismiss();
      }      
    }, (err) => {
      console.log(err);
      this.loader.dismiss();
      this.presentToast(err);
    });
}

}
