import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  screenWidth: number;

  @ViewChild('sidenav', { static: true }) public sidenav:
    | MatSidenav
    | undefined;

  constructor(private layoutService: LayoutService) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }
  ngOnInit() {
    if (this.sidenav) {
      this.layoutService.setSidenav(this.sidenav);
    }
  }

  toggleSidenav() {
    if (this.sidenav && this.screenWidth <= 768) {
      this.sidenav.close();
    }
  }
}
