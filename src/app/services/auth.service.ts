import { Injectable } from "@angular/core";
import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // login
  login(form: any) {
    return axios.post(API_URL + API_ENDPOINTS.auth.login, {
      email: form.email.trim(),
      password: form.password,
    }).then(res => res.data); // quan trọng
  }

  // lưu token + user
  saveAuth(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // lấy user
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // check login
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  // logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}