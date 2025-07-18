import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { userInfo } from "os";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private apiUrl = 'http://localhost:3000/users';
    // private apiUrl = 'https://empowering-reverence-project.up.railway.app/users';


    constructor(private http: HttpClient) { }

    // קבלת כל המשתמשים
    // דורש הרשאות מנהל
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiUrl}`);
    }

    // הרשמת משתמש חדש
    signup(userData: Partial<User>): Observable<{ username: string; userId: string; token: string }> {
        return this.http.post<{ username: string; userId: string; token: string }>(`${this.apiUrl}`, userData);
    }

    // התחברות של משתמש קיים
    signin(credentials: { email: string; password: string }): Observable<{ username: string; userId: string; token: string }> {
        return this.http.post<{ username: string; userId: string; token: string }>(`${this.apiUrl}/signin`, credentials);
    }

    // מחיקת משתמש
    // דורש הרשאות מנהל
    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
