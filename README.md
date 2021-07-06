# FirebaseStorageApp

## Overview

### Screenshot uploading files
![screenshot](https://raw.githubusercontent.com/TCar10s/ng-photos-firebase/main/src/assets/img/screenshot-desktop.jpeg)

### Screenshot uploaded files 
![screenshot](https://raw.githubusercontent.com/TCar10s/ng-photos-firebase/main/src/assets/img/screenshot-desktop-photos.jpeg)

## Notas

Antes de correr la app debes crear un proyecto en firebase y proporcionar tus credenciales
en el archivo environment:

```
export const environment = {
    production: false,
    firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',
    },
};
```

Recuerden reconstruir los módulos de Node.

```
npm install
```

Ejecute `ng serve` para un servidor de desarrollo. Vaya a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

```
ng serve
```

## Contact

- Website [www.tutoscarlos.xyz](https://www.tutoscarlos.xyz)
- GitHub [@TCar10s](https://https://github.com/TCar10s)
- Twitter [@Tutos_Carlos11](https://twitter.com/Tutos_Carlos11)
