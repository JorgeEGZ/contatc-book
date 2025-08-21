import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: [''],
      last_name: ['']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const userData = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: () => {
          alert('¡Registro exitoso! Ahora puedes iniciar sesión');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          const errorMsg = error.error?.username?.[0] || 
                          error.error?.email?.[0] || 
                          'Error en el registro';
          alert(errorMsg);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}