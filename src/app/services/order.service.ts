import { Injectable } from '@angular/core';
import axios from 'axios';
import { API_URL } from '../enviroment/enviroment';
import { API_ENDPOINTS } from '../configs/end-point.config';

@Injectable({ providedIn: 'root' })
export class OrderService {
  checkout(data: any) {
    return axios.post(`${API_URL}${API_ENDPOINTS.ORDER.CHECKOUT}`, data);
  }
}
