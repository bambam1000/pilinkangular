import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FormResponse {
  message: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  passport: string = '';
  delivreeLe: string = '';
  lieu: string = '';
  domicilie: string = '';
  tel: string = '';
  confirmationMessage: string = '';
  success: boolean = false;
  error: boolean = false;

  constructor(private http: HttpClient) {
    this.success = false;
    this.error = false;
   }

  allFieldsFilled(): boolean {
    return (
    !!this.nom &&
    !!this.prenom &&
    !!this.email &&
    !!this.passport &&
    !!this.delivreeLe &&
    !!this.lieu &&
    !!this.domicilie &&
    !!this.tel
    );
  }

  submitForm() {
    // Vérifier si tous les champs sont remplis
    if (!this.allFieldsFilled()) {
      this.confirmationMessage = 'Veuillez remplir tous les champs du formulaire.';
      this.error = true;
      return; // Arrêter l'exécution de la méthode si des champs sont manquants
    }

    const formData = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      passport: this.passport,
      delivreeLe: this.delivreeLe,
      lieu: this.lieu,
      domicilie: this.domicilie,
      tel: this.tel
    };

    this.http.post<FormResponse>('http://localhost:3000/submit-form', formData).subscribe(
      response => {
        console.log(response);
        this.confirmationMessage = response.message; // Mettre à jour le message de confirmation
        this.success = true; // Afficher le message de confirmation avec succès
        this.error = false; // Cacher le message d'erreur
      },
      error => {
        console.error(error);
        this.confirmationMessage =
          "Une erreur s'est produite lors de l'envoi du formulaire."; // Afficher un message d'erreur en cas d'erreur
        this.success = false; // Cacher le message de confirmation avec succès
        this.error = true; // Afficher le message d'erreur
      }
    );
  }
}
