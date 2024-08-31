import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { routes } from './app.routes';



const firebaseConfig = {
  apiKey: "AIzaSyB7pYFK-MoS2bGFzvqITRycTxOwQXt1BPE",
  authDomain: "possystem-711b5.firebaseapp.com",
  databaseURL: "https://possystem-711b5-default-rtdb.firebaseio.com",
  projectId: "possystem-711b5",
  storageBucket: "possystem-711b5.appspot.com",
  messagingSenderId: "745170978236",
  appId: "1:745170978236:web:7c0929a6c719cd4747d7b9"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  importProvidersFrom([AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ])]
};
