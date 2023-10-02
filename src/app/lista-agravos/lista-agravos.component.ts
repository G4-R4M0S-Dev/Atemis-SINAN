import { Component } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-lista-agravos',
  templateUrl: './lista-agravos.component.html',
  styleUrls: ['./lista-agravos.component.scss']
})
export class ListaAgravosComponent {

  agravos = [
    { id: 1, nome: 'Dengue/Chikungunya' },
    { id: 2, nome: 'Hanseníase' },
    { id: 3, nome: 'Tuberculose' },
    { id: 4, nome: 'Sífilis em Gestante' },
    { id: 5, nome: 'HIV em Gestante' },
    { id: 6, nome: 'Febre Amarela' },
  ];

  agravoSelecionado: number = 0;

  selecionaAgravo(id: number) {
    this.agravoSelecionado = id;
    // Abre a modal após selecionar o agravo
    const modal = new bootstrap.Modal(document.getElementById('agravoModal'), {backdrop: 'static', keyboard: true});
    modal.show();
  }
}
