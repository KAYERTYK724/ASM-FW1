import { Injectable } from "@angular/core";
import axios from "axios";
import { API_URL } from "../enviroment/enviroment";
import { API_ENDPOINTS } from "../configs/end-point.config";

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    login(form: any) {
        return axios.post(API_URL + API_ENDPOINTS.auth.login, {
            email: form.email.trim(),
            password: form.password,
        });
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }
}

