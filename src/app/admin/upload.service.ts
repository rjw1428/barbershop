import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../models/appState';
import { GalleryImg } from '../models/galleryImg';
import { AdminActions } from './admin.action-types';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private storage: AngularFireStorage,
    private store: Store<AppState>
  ) { }

  async pushUpload(item: File, folder: string, callback: (value) => void) {
    const nameParts = item.name.split('.')
    const ext = nameParts.splice(nameParts.length - 1).join('')
    const name = nameParts.join('.')
    const fileName = `${name}-${new Date().getTime()}.${ext}`
    let storageRef = this.storage.ref(`${folder}/${fileName}`)
    let uploadTask = storageRef.put(item);

    uploadTask.percentageChanges().subscribe(
      percent => callback(percent),
      err => console.log(err),
      () => console.log('complete')
    )

    // On Complete
    try {
      const response = await uploadTask
      if (response.state !== 'success')
        return false

      return `${folder}/${fileName}`

    } catch (e) {
      console.error(e);
      return false
    }
  }


  getImage(image: string): Promise<string> {
    return this.storage.ref(image).getDownloadURL().toPromise()
  }
}