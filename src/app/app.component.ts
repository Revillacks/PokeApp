import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // Ensure this path is correct and the component is properly exported
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokeApp';
  deferredPrompt: any;
  showInstallButton = false;
  isAppInstalled = false;

  constructor(private http: HttpClient) {
    // Escucha el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      if (!this.isAppInstalled) {
        this.showInstallButton = true;
      }
    });

    // Evento de instalación
    window.addEventListener('appinstalled', () => {
      this.isAppInstalled = true;
      this.showInstallButton = false;
    });
  }

    // Método para instalar la PWA
    installPWA() {
      if (this.isAppInstalled) {
        alert('La aplicación ya está instalada.');
      } else if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult: any) => {
          this.deferredPrompt = null;
        });
      }
    }
    
}
