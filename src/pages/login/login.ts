import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  loginError = '';

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: any) {
    if (form.invalid) {
      return
    }

    this.userService.signin(this.loginData).subscribe({
      next: (res) => {
        // הכניסה הצליחה, ניווט לדף המתכונים
        this.loginError = '';
        this.router.navigate(['/recipes']);
      },
      error: () => {
        // הכניסה נכשלה, הצגת הודעת שגיאה
        this.loginError = 'שם משתמש או סיסמה שגויים';
      }
    })
  }

  goToRegister() {
    // ניווט לדף ההרשמה
    this.router.navigate(['/register'], {
      state: { email: this.loginData.email, password: this.loginData.password }
    })
  }
}
