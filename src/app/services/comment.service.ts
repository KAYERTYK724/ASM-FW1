import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  list(){
    return axios.get(API_URL + API_ENDPOINTS.COMMENT.LIST);
  }

  getById(id: number){
    return axios.get(API_URL + API_ENDPOINTS.COMMENT.GET_BY_ID(id));
  }

  add(data: any){
    return axios.post(API_URL + API_ENDPOINTS.COMMENT.ADD, data);
  }

  update(id: number, data: any){
    return axios.put(API_URL + API_ENDPOINTS.COMMENT.UPDATE(id), data);
  }

  delete(id: number){
    return axios.delete(API_URL + API_ENDPOINTS.COMMENT.DELETE(id));
  }

  // THÊM HÀM NÀY
  getByProduct(productId: number){
    return axios.get(API_URL + API_ENDPOINTS.COMMENT.LIST + '?product_id=' + productId);
  }
}