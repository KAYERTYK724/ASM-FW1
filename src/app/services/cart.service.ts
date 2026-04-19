import { Injectable } from '@angular/core';
import axios from 'axios';
import { API_URL } from '../enviroment/enviroment';
import { API_ENDPOINTS } from '../configs/end-point.config';

@Injectable({ providedIn: 'root' })
export class CartService {

  add(data: any) {
    return axios.post(API_URL + API_ENDPOINTS.ORDER_DETAIL.ADD, data);
  }

  getCart(userId: number) {
    return axios.get(API_URL + API_ENDPOINTS.ORDER_DETAIL.GET_BY_USER(userId));
  }

  remove(id: number) {
    return axios.delete(API_URL + API_ENDPOINTS.ORDER_DETAIL.DELETE(id));
  }

  update(id: number, quantity: number) {
    return axios.put(API_URL + API_ENDPOINTS.ORDER_DETAIL.UPDATE(id), { quantity });
  }
}
