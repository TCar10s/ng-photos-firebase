import { FileItem } from '../models/file-item';
import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';

/*
  - El event emmiter permite comunicarse con el componente padre e indicarle
    que realicec algún evento.

  - El elementRef sirve para tener una relación directa con el elemento HTML que
    contiene la dorectiva.

  - El HostListener permite crear eventos o callbacks cuando algo suceda, es decir,
    cuando alguien haga click, focus, blur... etc. 
    En este caso escucharemos el evento drag cuando el raton este sobre el div 
    que contiene la directiva.

  - Con el Input recibimos información del elemento padre.
  - El Output junto con el EventEmitter permite indicarle al elemente padre que realice
    alguna acción con alguna respuesta que tengamos.
*/

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  @Input() files: FileItem[];
  @Output() mouseHover: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.files = [];
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    this.mouseHover.emit(true);
    this._preventOpenFile(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseHover.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transfer = this._getTransfer(event);

    if (!transfer) return;

    this._extractFiles(transfer.files);
    this._preventOpenFile(event);

    this.mouseHover.emit(false);
  }

  private _getTransfer = (event: any) => {
    /* 
      Esto nos ayudará con la compatibilidad de los navegadores
      ya que muchos lo interpretan de manera diferente.
      Así que el siguiente algoritmo nos ayudará a extender
      la compatibilidad.
    */

    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  };

  private _extractFiles = (fileList: FileList) => {
    // Convertimos los valores del objeto en un array.
    const arrayFiles = Object.values(fileList);

    arrayFiles.forEach((file) => {
      // Validamos si ya fueron dropeados y si son imagenes.
      if (!this._fileCanUploaded(file)) return;

      const newFile = new FileItem(file);
      this.files.push(newFile);
    });

    console.log(this.files);
  };

  // Validaciones
  private _fileCanUploaded = (file: File): boolean => {
    return !this._fileAlreadyDropped(file.name) && this._isImage(file.type);
  };

  private _preventOpenFile = (event) => {
    // Prevenir que el navegador abra la imagen
    event.preventDefault();
    event.stopPropagation();
  };

  private _fileAlreadyDropped = (nameFile: string): boolean => {
    // Cuando el archivo ya fue soltado.
    return this.files.some((file) => {
      if (file.nameFile === nameFile) {
        console.log('El archivo', nameFile, 'ya fue agregado');
        return true;
      }
      return false;
    });
  };

  private _isImage = (typeFile: string) => {
    console.log({ typeFile });

    return typeFile === '' || typeFile === undefined
      ? false
      : typeFile.startsWith('image');
  };
}
