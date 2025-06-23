import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../shared/services/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService); //inject במקום בנאי שימוש ב 
    const token = authService.getToken(); // אם קיים הטוקן, הוא יוחזר כאן

    // אם יש טוקן, נוסיף אותו לכותרת Authorization של הבקשה
    if (token) {
        const clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}` // הוספת הטוקן לכותרת Authorization
            }
        });
        return next(clonedReq); // שולח את הבקשה עם הטוקן
    }

    // אם אין טוקן, נמשיך עם הבקשה המקורית
    return next(req);
}
