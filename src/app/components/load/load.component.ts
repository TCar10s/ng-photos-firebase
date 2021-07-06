import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoadImagesService } from 'src/app/services/load-images.service';
import { FileItem } from '../../models/file-item';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [
    `
      .f-g-1 {
        flex-grow: 1;
      }
      .f-g-2 {
        flex-grow: 2;
      }
      table {
        width: 100%;  
      }
      thead th {
        font-weight: 400;
      }
    `,
  ],
})
export class LoadComponent implements OnInit {

  displayedColumns: string[] = ['name', 'size', 'charging'];

  files: FileItem[];
  dropElement: boolean;

  constructor(public _loadImgs: LoadImagesService) {
    this.files = [];
    this.dropElement = false;
  }

  ngOnInit(): void {}

  loadImages = () => {
    console.log(this.files);
    this._loadImgs.loadImagesFirebase(this.files);
  }

  testInElement = (event) => {
    console.log(event);
  }

  cleanFiles = () => {
    this.files = [];
  };
}
