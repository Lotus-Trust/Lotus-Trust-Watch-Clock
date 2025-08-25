import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-fondo-editor',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './fondo-editor.html',
  styleUrls: ['./fondo-editor.css'],
})
export class FondoEditor {
  modoEditor: 'react' | 'angular' = 'angular'; // Ya estás en Angular

  indiceFondo = 0;

  fondos = Array(12).fill(null).map(() => ({
    nombre: '',
    gestor: '',
    retorno: '',
    perdidaMax: '',
    descripcionPeriodo: '',
    fechaDesde: '',
    fechaHasta: '',
    estadoSubscripcion: '',
    fechaSubscripcionDesde: '',
    fechaSubscripcionHasta: '',
    fundId: '',
  }));

  constructor(private http: HttpClient) {
    this.cargarFondos();
  }

  get fondo() {
    return this.fondos[this.indiceFondo];
  }

  set fondo(valor) {
    this.fondos[this.indiceFondo] = valor;
  }

  anterior() {
    this.indiceFondo = this.indiceFondo === 0 ? 11 : this.indiceFondo - 1;
  }

  siguiente() {
    this.indiceFondo = this.indiceFondo === 11 ? 0 : this.indiceFondo + 1;
  }

  cargarFondos() {
    this.http.get<any[]>('http://localhost:3000/fondos').subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);  // <--- Aquí
        if (Array.isArray(data) && data.length === 12) {
          this.fondos = data;
        } else {
          console.warn('Datos de backend inválidos');
        }
      },
      error: (err) => {
        console.error('Error al cargar fondos desde backend:', err);
      },
    });
  }

  actualizar() {
    // Enviar solo el fondo actual al backend para actualizarlo individualmente con PUT
    this.http
      .put(`http://localhost:3000/fondos/${this.indiceFondo}`, this.fondo)
      .subscribe({
        next: (res: any) => {
          if (res?.status === 'OK') {
            alert('Fondo actualizado correctamente desde Angular');
            // Actualiza el arreglo local también para reflejar cambios
            this.fondos[this.indiceFondo] = { ...this.fondo };
          } else {
            alert('Error al actualizar desde Angular');
          }
        },
        error: () => {
          alert('Error de conexión con el backend');
        },
      });
  }
}








