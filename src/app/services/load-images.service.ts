import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root',
})
export class LoadImagesService {
  private FOLDER_IMAGES: string;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.FOLDER_IMAGES = 'img';
  }

  private saveImage = (image: { name: string; url: string }) => {
    this.db.collection(`/${this.FOLDER_IMAGES}`).add(image);
  };

  loadImagesFirebase = (images: FileItem[]) => {

    for (const item of images) {
      item.charging = true;
      if (item.progress >= 100) continue;

      const file = item.file;
      const filePath = `${this.FOLDER_IMAGES}/${item.nameFile}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      // Con esta función nos suscribimos a los cambios en el progreso.
      uploadTask
        .percentageChanges()
        .subscribe((resp) => (item.progress = resp));

      // Obtenemos la url de descarga cuando este disponible.
      uploadTask
        .snapshotChanges()
        .pipe(finalize(() =>
            fileRef.getDownloadURL().subscribe((url:string) => {
              console.log('Imagen cargada con exito');
              item.url = url;
              item.charging = false;
              this.saveImage({name: item.nameFile, url: item.url,});
            })
          )
        ).subscribe();
    }
  };
}
