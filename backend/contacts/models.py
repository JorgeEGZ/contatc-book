from django.db import models

class Contact(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Nombre")
    last_name = models.CharField(max_length=100, verbose_name="Apellido")
    email = models.EmailField(verbose_name="Correo electrónico", unique=True)
    phone = models.CharField(max_length=20, verbose_name="Teléfono", blank=True, null=True)
    mobile = models.CharField(max_length=20, verbose_name="Celular", blank=True, null=True)
    address = models.TextField(verbose_name="Dirección", blank=True, null=True)
    company = models.CharField(max_length=100, verbose_name="Empresa", blank=True, null=True)
    position = models.CharField(max_length=100, verbose_name="Cargo", blank=True, null=True)
    notes = models.TextField(verbose_name="Notas", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    class Meta:
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"