import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
// lấy tất cả danh sách
// gọi API GET /blogs/list
  list(){
    return axios.get(API_URL + API_ENDPOINTS.BLOG.LIST);
  }
// lấy 1 blog theo id
// gọi API GET /blogs/{id}
  getById(id: number){
    return axios.get(API_URL + API_ENDPOINTS.BLOG.GET_BY_ID(id));
  }
// thêm mới blog
// gọi API POST /blogs/add
// data là dữ liệu gửi lên server (vd: { name: "Áo" })
  add(data: any){
    return axios.post(API_URL + API_ENDPOINTS.BLOG.ADD, data);
  }
// cập nhật blog theo id
// gọi API PUT /blogs/update/{id}
// data là dữ liệu mới
  update(id: number, data: any){
    return axios.put(API_URL + API_ENDPOINTS.BLOG.UPDATE(id), data);
  }
// xóa blog theo id
// gọi API DELETE /blogs/delete/{id}
  delete(id: number){
    return axios.delete(API_URL + API_ENDPOINTS.BLOG.DELETE(id));
  }
}
