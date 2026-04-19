import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";

interface LoginResponse {
  message: string;
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // LOGIN
  login(form: { email: string; password: string }) {
    return this.http.post<LoginResponse>(
      API_URL + API_ENDPOINTS.auth.login,
      {
        email: form.email?.trim(),
        password: form.password,
      }
    );
  }

  // SAVE AUTH
  saveAuth(token: string, user: any) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUser() {
    if (this.isBrowser()) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken() {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  isAdmin() {
    const user = this.getUser();
    return user?.role?.toLowerCase() === 'admin';
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}