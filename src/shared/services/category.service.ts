import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    private apiUrl = 'http://localhost:3000/categories';
    // private apiUrl = 'https://empowering-reverence-project.up.railway.app/categories';


    constructor(private http: HttpClient) { }

    // קבלת כל הקטגוריות
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}`);
    }

    // קבלת כל הקטגוריות עם המתכונים שלהן
    getAllCategoriesWithRecipes(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/withRecipes`);
    }

    // קבלת קטגוריה לפי מזהה או תיאור
    getCategoryWithRecipes(value: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${value}`);
    }
}
