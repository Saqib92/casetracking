import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { globalData } from '../../helper/helper';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the CaseinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-caseinformation',
  templateUrl: 'caseinformation.html',
})
export class CaseinformationPage {
myData:any;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	private document: DocumentViewer,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform
    ) {
  	this.myData = this.navParams.get('data');
  	console.log(this.myData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseinformationPage');
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

}
