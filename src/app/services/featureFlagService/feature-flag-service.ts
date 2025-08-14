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
    return getValue(this.rc, 'showCategories').asBoolean();
  }

  getItemBackgroundColor(): string {
    return getValue(this.rc, 'item_background_color').asString();

  }

}
