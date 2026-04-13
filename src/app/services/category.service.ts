import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
// lấy tất cả danh sách
// gọi API GET /categories/list
  list(){
    return axios.get(API_URL + API_ENDPOINTS.CATEGORY.LIST);
  }
// lấy 1 category theo id
// gọi API GET /categories/{id}
  getById(id: number){
    return axios.get(API_URL + API_ENDPOINTS.CATEGORY.GET_BY_ID(id));
  }
// thêm mới category
// gọi API POST /categories/add
// data là dữ liệu gửi lên server (vd: { name: "Áo" })
  add(data: any){
    return axios.post(API_URL + API_ENDPOINTS.CATEGORY.ADD, data);
  }
// cập nhật category theo id
// gọi API PUT /categories/update/{id}
// data là dữ liệu mới
  update(id: number, data: any){
    return axios.put(API_URL + API_ENDPOINTS.CATEGORY.UPDATE(id), data);
  }
// xóa category theo id
// gọi API DELETE /categories/delete/{id}
  delete(id: number){
    return axios.delete(API_URL + API_ENDPOINTS.CATEGORY.DELETE(id));
  }
}
