import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private sidenav: MatSidenav | undefined;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public toggle() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
}
