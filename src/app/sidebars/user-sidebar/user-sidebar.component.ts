import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
})
export class UserSidebarComponent {
  userId: number = JSON.parse(localStorage.getItem('userData') || '{}').id || 0;
    profileImageUrl: SafeUrl | null = null;
  // Signal for sidebar expanded/collapsed
  isExpanded = signal(true);
  fullName : string = ''  ;

  // Submenu tracker
  expandedMenus: Set<string> = new Set();


  constructor(private userService: UserService,
      private sanitizer: DomSanitizer
  ) {}


   ngOnInit(): void {
    this.loadProfilePicture();
    this.loadUserInfo();
  }

  // Toggle Sidebar
  toggleSidebar(): void {
    this.isExpanded.set(!this.isExpanded());
  }

  // Toggle Submenu
  toggleSubmenu(label: string): void {
    this.expandedMenus.has(label)
      ? this.expandedMenus.delete(label)
      : this.expandedMenus.add(label);
  }

  // Check if submenu is expanded
  isSubmenuExpanded(label: string): boolean {
    return this.expandedMenus.has(label);
  }


  //! ==>> get profile picture  ================================>>

  loadProfilePicture(): void {
    this.userService.getProfilePicture(this.userId).subscribe({
      next: (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        console.error('Error loading profile picture', err);
      },
    });
  }

  // load user info
 loadUserInfo(): void {
  this.userService.getUserById(this.userId).subscribe({
        next: (res) => {
          this.fullName = `${res.firstName} ${res.lastName}`;

          // console.log('User data loaded:', res);
        },
        error: (err) => {
          console.error('Failed to fetch user data', err);
        }
      });
 }
}


