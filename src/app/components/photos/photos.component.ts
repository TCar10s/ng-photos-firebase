import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
  url: string;
}

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styles: [`
    .grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr))
    }
  `],
})
export class PhotosComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {}
}
