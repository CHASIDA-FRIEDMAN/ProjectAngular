// ניהול הרשאות
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// מסמן את השירות כזמין לשימוש בכל האפליקציה
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'user';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // json שמירת משתמש כמחרוזת 
  // localStorage או sessionStorage (אם מעדיפים) ב
  setUser(user: { username: string; token: string }) {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  // קבלת משתמש
  getUser(): { username: string; token: string } | null {
    if (!this.isBrowser()) {
      return null;
    }
    const userJson = localStorage.getItem(this.storageKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  // קבלת הטוקן של המשתמש
  getToken(): string | null {
    return this.getUser()?.token || null;
  }

  // בדיקת האם המשתמש מחובר
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // יציאה מהמערכת - מחיקת המשתמש מהאחסון
  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }
}
