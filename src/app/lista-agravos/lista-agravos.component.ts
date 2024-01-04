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
    { id: 2, nome: 'Febre Amarela' },
    { id: 3, nome: 'Hanseníase' },
    { id: 4, nome: 'HIV em Gestante' },
    { id: 5, nome: 'Notificação Geral' },
    { id: 6, nome: 'Sífilis Congênita' },
    { id: 7, nome: 'Sífilis em Gestante' },
    { id: 8, nome: 'Tuberculose' },
    { id: 9, nome: 'Aids Criança' },
  ];

  agravoSelecionado: number = 0;

  selecionaAgravo(id: number) {
    this.agravoSelecionado = id;
    // Abre a modal após selecionar o agravo
    const modal = new bootstrap.Modal(document.getElementById('agravoModal'), {backdrop: 'static', keyboard: true});
    modal.show();
  }
}
