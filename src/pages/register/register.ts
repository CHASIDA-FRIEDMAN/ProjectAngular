import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  registerForm!: FormGroup;
  errorMessage: string = '';

  ngOnInit(): void {
    // קבלת פרטי המשתמש מהניווט הקודם (אם קיימים)
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as { email?: string, password?: string };
    const email = sessionStorage.getItem('registerEmail') || '';
    const password = sessionStorage.getItem('registerPassword') || '';

    // יצירת הטופס עם הערכים המתקבלים (אם קיימים) בצורה שך reactive form
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: [email || '', [Validators.required, Validators.email]],
      password: [password || '', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required]],
      role: ['registered_user']
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const userData = this.registerForm.value;
    this.userService.signup(userData).subscribe({
      next: (res) => {
        // ההרשמה הצליחה, ניווט לדף הכניסה
        // שמירה ב localStorage
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        // ההרשמה נכשלה, הצגת הודעת שגיאה
        this.errorMessage = err.error?.message || 'שגיאה בעת ההרשמה';
      }
    });
  }
}
