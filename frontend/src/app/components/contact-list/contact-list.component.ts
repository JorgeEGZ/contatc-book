import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.error = null;
    
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error al cargar los contactos';
        console.error('Error loading contacts:', error);
      }
    });
  }

  createContact(): void {
    this.router.navigate(['/contacts/new']);
  }

  editContact(contact: Contact): void {
    this.router.navigate(['/contacts/edit', contact.id]);
  }

  deleteContact(contact: Contact): void {
    if (confirm(`¿Estás seguro de eliminar a ${contact.first_name} ${contact.last_name}?`)) {
      this.contactService.deleteContact(contact.id!).subscribe({
        next: () => {
          this.loadContacts(); // Recargar la lista
          alert('Contacto eliminado correctamente');
        },
        error: (error) => {
          alert('Error al eliminar el contacto');
          console.error('Error deleting contact:', error);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}