import { Injectable } from "@angular/core";
import { RegisterRequest } from "../models/requests/RegisterRequest";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { RegisterResponse } from "../models/responses/RegisterResponse";
import { DefaultResponse } from "../models/responses/DefaultResponse";

@Injectable({
    providedIn: 'root',

})

export class RegisterService {

    private baseApi = "https://localhost:7107";
    private apiRoutes = {
        register: `${this.baseApi}/register`
    }


    constructor(private http: HttpClient) { }


    register(request: RegisterRequest): Observable<DefaultResponse> {
        return this.http.post(this.apiRoutes.register, request)
            .pipe(map((response:any) => response));
    }

    getToken(): string | null {
        return localStorage.getItem("tokenAPI");
    }
    setToken(token:string): void{
         localStorage.setItem("tokenAPI",token);
    }
}