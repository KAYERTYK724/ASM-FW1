import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
// lấy tất cả danh sách
// gọi API GET /products/list
  list(){
    return axios.get(API_URL + API_ENDPOINTS.PRODUCT.LIST);
  }
// lấy 1 product theo id
// gọi API GET /products/{id}
  getById(id: number){
    return axios.get(API_URL + API_ENDPOINTS.PRODUCT.GET_BY_ID(id));
  }
// thêm mới products
// gọi API POST /products/add
// data là dữ liệu gửi lên server
  add(data: any){
    return axios.post(API_URL + API_ENDPOINTS.PRODUCT.ADD, data);
  }
// cập nhật products theo id
// gọi API PUT /products/update/{id}
// data là dữ liệu mới
  update(id: number, data: any){
    return axios.put(API_URL + API_ENDPOINTS.PRODUCT.UPDATE(id), data);
  }
// xóa products theo id
// gọi API DELETE /products/delete/{id}
  delete(id: number){
    return axios.delete(API_URL + API_ENDPOINTS.PRODUCT.DELETE(id));
  }
}
