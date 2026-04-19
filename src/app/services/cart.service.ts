import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  // 📌 Lấy danh sách giỏ hàng (order_details)
  list() {
    return axios.get(API_URL + API_ENDPOINTS.ORDER_DETAIL.LIST);
  }

  // 📌 Lấy theo ID
  getById(id: number) {
    return axios.get(API_URL + API_ENDPOINTS.ORDER_DETAIL.GET_BY_ID(id));
  }

  // 📌 Thêm sản phẩm vào giỏ (thực chất là thêm order_detail)
  add(data: any) {
    return axios.post(API_URL + API_ENDPOINTS.ORDER_DETAIL.ADD, data);
  }

  // 📌 Cập nhật số lượng
  update(id: number, data: any) {
    return axios.put(API_URL + API_ENDPOINTS.ORDER_DETAIL.UPDATE(id), data);
  }

  // 📌 Xóa sản phẩm khỏi giỏ
  delete(id: number) {
    return axios.delete(API_URL + API_ENDPOINTS.ORDER_DETAIL.DELETE(id));
  }
}
