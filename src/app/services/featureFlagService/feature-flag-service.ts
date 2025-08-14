import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';


@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  constructor(private rc: RemoteConfig) { }
  async loadFlags() {
    await fetchAndActivate(this.rc);
  }

  isCategoriesEnabled(): boolean {
    // Usar getValue(...).asBoolean() evita problemas de import
    return getValue(this.rc, 'showCategories').asBoolean();
  }

  getItemBackgroundColor(): string {
    // rc.getValue() es el método en la instancia inyectada.
    // Asegúrate de que 'item_background_color' sea la clave que usarás en la consola de Firebase.
    return getValue(this.rc, 'item_background_color').asString();

  }

}
