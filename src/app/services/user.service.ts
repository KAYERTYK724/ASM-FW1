import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  list(){
    return axios.get(API_URL + API_ENDPOINTS.USER)
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
