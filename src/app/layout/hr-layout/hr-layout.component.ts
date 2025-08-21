import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { HrSidebarComponent } from '../../sidebars/hr-sidebar/hr-sidebar.component';

@Component({
  selector: 'app-hr-layout',
  standalone: true,
    imports: [HrSidebarComponent, RouterOutlet, NavbarComponent, ],
  templateUrl: './hr-layout.component.html',
  styleUrl: './hr-layout.component.css'
})
export class HrLayoutComponent {

}
