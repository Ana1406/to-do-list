import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';


@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  constructor(private rc: RemoteConfig) { }

  async loadFlags() {
    return this._fetchAndActivate();
  }

  private _fetchAndActivate() {
    return fetchAndActivate(this.rc);
  }

  isCategoriesEnabled(): boolean {
    return this._getValue('showCategories').asBoolean();
  }

  getItemBackgroundColor(): string {
    return this._getValue('item_background_color').asString();
  }

  private _getValue(key: string) {
    return getValue(this.rc, key);
  }
}



