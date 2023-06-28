import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Pills {
  name: string;
  color: string;
}

@Component({
  selector: 'app-occupation-area',
  templateUrl: './occupation-area.component.html',
  styleUrls: ['./occupation-area.component.scss']
})
export class OccupationAreaComponent {
  public algumaOpcaoSelecionada = false;

  entretenimento: Pills = { name: 'Entretenimento', color: '#ffcc80' };

  areas: Pills[] = [
    { name: 'Moda', color: '#ff8a80' },
    { name: 'Estética', color: '#64b5f6' },
    this.entretenimento,
  ];

  opcoesEntretenimento: Pills[] = [
    { name: 'Viagem', color: '#b5d3e7' },
    { name: 'Fitness', color: '#f1b8d8' },
    { name: 'Trabalho', color: '#b8f1d8' },
    { name: 'Restaurantes', color: '#ffd8b8' },
  ];

  areasSelecionadas: Pills[] = [];

  constructor(private router: Router) { }

  selecionarArea(area: Pills): void {
    if (this.areasSelecionadas.includes(area)) {
      this.areasSelecionadas = this.areasSelecionadas.filter(a => a !== area);
    } else {
      this.areasSelecionadas.push(area);
      if (area === this.entretenimento) {
        const optionsContainer = document.querySelector('.options-container');
        if (optionsContainer !== null) {
          optionsContainer.classList.add('show');
        }
      }
    }
    this.atualizarEstadoSalvar();
  }

  selecionarOpcao(opcao: Pills): void {
    // Implementar lógica para selecionar opção de entretenimento
  }

  public atualizarEstadoSalvar() {
    this.algumaOpcaoSelecionada = this.areasSelecionadas.length > 0;
  }

  onClickBack() {
    this.router.navigate(["/profile-config"])
  }
}

