import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  isEdit = false;
  contactId: number | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(20)]],
      mobile: ['', [Validators.maxLength(20)]],
      address: [''],
      company: ['', [Validators.maxLength(100)]],
      position: ['', [Validators.maxLength(100)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.contactId = +params['id'];
        this.loadContact();
      }
    });
  }

  loadContact(): void {
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId).subscribe({
        next: (contact) => {
          this.contactForm.patchValue(contact);
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.error = 'Error al cargar el contacto';
          console.error('Error loading contact:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      this.error = null;
      
      const contactData: Contact = this.contactForm.value;

      const operation = this.isEdit && this.contactId
        ? this.contactService.updateContact(this.contactId, contactData)
        : this.contactService.createContact(contactData);

      operation.subscribe({
        next: (contact) => {
          this.loading = false;
          alert(this.isEdit ? 'Contacto actualizado correctamente' : 'Contacto creado correctamente');
          this.router.navigate(['/contacts']);
        },
        error: (error) => {
          this.loading = false;
          this.error = this.getErrorMessage(error);
          console.error('Error saving contact:', error);
        }
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Error de conexión con el servidor';
    } else if (error.status === 400) {
      return 'Datos inválidos: ' + (error.error?.email?.[0] || error.error?.non_field_errors?.[0] || 'Verifica los datos ingresados');
    } else if (error.status === 401) {
      return 'Sesión expirada. Por favor, inicia sesión nuevamente';
    } else if (error.status === 403) {
      return 'No tienes permisos para realizar esta acción';
    } else if (error.status === 404) {
      return 'Recurso no encontrado';
    } else {
      return 'Error del servidor. Por favor, intenta más tarde';
    }
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}