import { Component } from '@angular/core';
import { UserSidebarComponent } from "../../sidebars/user-sidebar/user-sidebar.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserSidebarComponent, NavbarComponent,RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
