import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Recipe } from "../models/recipe.model";

@Injectable({
    providedIn: 'root'
})

export class RecipeService {
    private apiUrl = 'http://localhost:3000/recipes';
    // private apiUrl = 'https://empowering-reverence-project.up.railway.app/recipes';

    constructor(private http: HttpClient) { }

    // קבלת מתכונים לפי חיפוש עם pading
    getBySearch(search: string = '', page: number = 1, limit: number = 10): Observable<{
        data: Recipe[];
        total: number;
        page: number;
        limit: number;
    }> {
        return this.http.get<{
            data: Recipe[];
            total: number;
            page: number;
            limit: number
        }>(
            `${this.apiUrl}?search=${search}&limit=${limit}&page=${page}`
        )
    }

    // קבלת מתכון לפי מזהה
    getById(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
    }

    // קבלת מתכונים לפי זמן הכנה
    getByTime(time: number): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/time/${time}`);
    }

    // הוספת מתכון
    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(this.apiUrl, recipe);
    }

    // עדכון מתכון
    updateRecipe(id: string, recipe: Partial<Recipe>): Observable<Recipe> {
        return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipe);
    }

    // מחיקת מתכון
    deleteRecipe(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}