import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private layoutService: LayoutService // private authService: AuthService, //
  ) {}

  logout() {
    // this.authService.logout();
  }

  toggleSidebar() {
    this.layoutService.toggle();
  }

  get user() {
    // if (this.authService.user) {
    //   return this.authService.user;
    // }
    return 'Admin';
  }
}
