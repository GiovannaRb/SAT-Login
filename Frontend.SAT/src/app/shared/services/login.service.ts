import { Injectable } from "@angular/core";
import { LoginRequest } from "../models/requests/LoginRequest";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../models/responses/LoginResponse";

@Injectable({
    providedIn: 'root',

})

export class LoginService {

    private baseApi = "https://localhost:7107";
    private apiRoutes = {
        Login: `${this.baseApi}/login`
    }


    constructor(private http: HttpClient) { }


    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post(this.apiRoutes.Login, request)
            .pipe(map((response: LoginResponse) => response));
    }

     getToken(): string | null {
        return localStorage.getItem("tokenAPI");
    }
    setToken(token:string): void{
         localStorage.setItem("tokenAPI",token);
    }

    logout(){
        localStorage.clear();

    }
}