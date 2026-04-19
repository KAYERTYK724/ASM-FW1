import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
})
export class Header {

  user = signal<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loadUser();
  }

  loadUser() {
    this.user.set(this.authService.getUser());
  }

  logout() {
    this.authService.logout();
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}