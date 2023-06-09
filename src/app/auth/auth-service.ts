import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthResponse } from "./model/auth-response";
import { JwtToken } from "./model/jwt-token";



@Injectable()
export class AuthService {
    

    constructor(private http: HttpClient) {
    
    }
    
    register(email: string, password: string) {
        return this.http.post<AuthResponse>('/api/v1/auth/register', {email, password});
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>('/api/v1/auth/authenticate', {email, password});
    }

    setSession(token: JwtToken) {
        localStorage.setItem('id_token', token.token);
        localStorage.setItem("expires_at", token.expiration);
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        const expiration = localStorage.getItem("expires_at");
        if(expiration == null) {
            return false;
        }

        return new Date() < new Date(expiration);
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

}
