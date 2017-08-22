import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Upload } from './upload';
import { CardService } from './card.service';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  private basePath = '/images';
  private uploadTask: firebase.storage.UploadTask;

  constructor(private db: AngularFireDatabase, private cs: CardService) { }

  pushUpload(id, value, upload: Upload) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (success) => {
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.cs.addCard(id, value, upload);
        // console.log(upload);
      },
      (snapshot) => {
        console.log(snapshot);
        // upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },

    );
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then( () => {
        this.deleteFileStorage(upload.name)
      })
      .catch(error => console.log(error))
  }

  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`);
  }

}
