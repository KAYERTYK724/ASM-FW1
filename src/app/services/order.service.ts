import { Injectable } from '@angular/core';
import axios from 'axios';
import { API_URL } from '../enviroment/enviroment';
import { API_ENDPOINTS } from '../configs/end-point.config';

@Injectable({ providedIn: 'root' })
export class OrderService {
  getAll() {
    return axios.get(`${API_URL}${API_ENDPOINTS.ORDER.LIST}`);
  }

  checkout(data: any) {
    return axios.post(`${API_URL}${API_ENDPOINTS.ORDER.CHECKOUT}`, data);
  }

  // 🔍 LẤY CHI TIẾT ĐƠN HÀNG
  getById(id: number) {
    return axios.get(`${API_URL}${API_ENDPOINTS.ORDER.GET_BY_ID(id)}`);
  }
}
