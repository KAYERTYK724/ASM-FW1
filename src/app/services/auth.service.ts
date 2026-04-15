import { Injectable } from "@angular/core";
import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // LOGIN 
  login(form: any) {
    return axios.post(API_URL + API_ENDPOINTS.auth.login, {
      email: form.email.trim(),
      password: form.password,
    }).then(res => res.data); // 🔥 trả về { message, token }
  }

  //SAVE AUTH
  saveAuth(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // GET USER 
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  //  GET TOKEN 
  getToken() {
    return localStorage.getItem('token');
  }

  //CHECK LOGIN 
  isLoggedIn() {
    return !!this.getToken();
  }

  // CHECK ADMIN
  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  }

  //  LOGOUT 
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}