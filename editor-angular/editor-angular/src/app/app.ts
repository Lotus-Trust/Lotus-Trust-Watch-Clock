import { Component } from '@angular/core';
import { FondoEditor } from './fondo-editor/fondo-editor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FondoEditor],
  template: `<app-fondo-editor></app-fondo-editor>`,
})
export class App {}


