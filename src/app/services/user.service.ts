import axios from 'axios';
import { API_URL } from '../enviroment/enviroment';
import { API_ENDPOINTS } from '../configs/end-point.config';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  list() {
    return axios.get(API_URL + API_ENDPOINTS.USER.LIST);
  }

  getProfile() {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.reject('SSR environment');
    }

    const token = localStorage.getItem('access_token');

    if (!token) {
      return Promise.reject('No token found');
    }

    return axios.get(API_URL + API_ENDPOINTS.USER.PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Register a new user
  register(data: any) {
    return axios.post(API_URL + API_ENDPOINTS.USER.REGISTER, data);
  }
  // Login và lưu token
  async login(data: any) {
    const response = await axios.post(API_URL + API_ENDPOINTS.USER.LOGIN, data);
    if (response.data && response.data.token) {
      localStorage.setItem('access_token', response.data.token);
    }
    return response.data;
  }
}
