import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { EditDetailModalPageModule } from './components/edit-detail-modal/edit-detail-modal.module';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), EditDetailModalPageModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideRemoteConfig(() => {
    const remoteConfig = getRemoteConfig();
    remoteConfig.defaultConfig = {
      "showCategories": false, // Asegúrate de que este coincida con tu clave real
      "item_background_color": "#f0f0f0" // <-- ¡AÑADE ESTE VALOR POR DEFECTO AQUÍ!
    };

    remoteConfig.settings.minimumFetchIntervalMillis = 0;
    return remoteConfig;
  })],
  bootstrap: [AppComponent],
})
export class AppModule { }
