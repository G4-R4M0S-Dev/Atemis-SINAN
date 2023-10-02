import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import { IbgeService } from '../../services/ibge.service';
import { CnesService } from '../../services/cnes.service';
import { CepService } from '../../services/cep.service';

@Component({
  selector: 'app-dengue2',
  templateUrl: './dengue2.component.html',
  styleUrls: ['./dengue2.component.scss']
})
export class Dengue2Component {
  form!: FormGroup;
  submitted = false;

  estados: string[] = [];
  municipios: string[] = [];
  ibgeCode: number = 0;
  estabelecimentos: any[] = [];
  selectedCnes: number = 0;
  hasError: boolean = false;


  constructor(
    private fb: FormBuilder,
    private ibgeService: IbgeService,
    private cnesService: CnesService,
    private cepService: CepService
    ) {
    this.createForm();
    this.loadEstados();
    }

  loadEstados() {
    this.ibgeService.getEstados().subscribe(response => {
      this.estados = response.map((estado:any) => estado.sigla);
    });
  }

  loadMunicipios(uf: string) {
    this.ibgeService.getMunicipios(uf).subscribe(response => {
      this.municipios = response.map((municipio:any) => municipio.nome);
    });
  }

  loadIbgeCode(municipioNome: string, controlName: string) {
    const formattedName = this.formatStringForAPI(municipioNome);
    this.ibgeService.getMunicipioId(formattedName).subscribe(response => {
      this.ibgeCode = parseInt(response.id.toString().slice(0, -1), 10);
      this.form.get(controlName)?.setValue(this.ibgeCode);
      this.loadEstabelecimentosSaude(this.ibgeCode);
    });
  }

  loadEstabelecimentosSaude(codigo_municipio: number) {
    this.cnesService.getEstabelecimentosSaude(codigo_municipio).subscribe((response:any) => {
      this.estabelecimentos = response.flatMap((estabelecimento: any) => {
        return estabelecimento;
      });
    });
  }

  updateCnesValue(event: any, controlName: string) {
    const selectedNomeFantasia = event.target.value;
    const selectedEstabelecimento = this.estabelecimentos.find(estabelecimento => estabelecimento.nome_fantasia === selectedNomeFantasia);
    if (selectedEstabelecimento) {
        this.selectedCnes = selectedEstabelecimento.codigo_cnes;
        this.form.get(controlName)?.setValue(this.selectedCnes);
    }
  }

  onCepChange(cep: string) {
    this.cepService.getCepDetails(cep).subscribe(details => {
        this.form.get('Texto19')?.setValue(details.stateShortname);
        this.form.get('Texto20')?.setValue(details.city);
        this.form.get('Texto21')?.setValue(details.ibgeId);
        this.form.get('Texto23')?.setValue(details.district);
        this.form.get('Texto24')?.setValue(details.street);
        this.form.get('Texto27')?.setValue(details.complement);
        this.hasError = false;
    },
    error => {
      this.hasError = true;
    });
  }


  private dependenciesMap: Record<string, string> = {
    'Texto4': 'Texto3',
    'Texto5': 'Texto4',
    'Texto6': 'Texto5',
    'Texto7': 'Texto6',
    'Texto78': 'Texto77',
    'Texto79': 'Texto78',
    'Texto86': 'Texto84',
    'Texto87': 'Texto86',
  };

  private createForm() {
    const controls: Record<string, FormControl> = {};

    for (let i = 1; i <= 127; i++) {
      let validators = [];
      const requiredFields = [1,3,4,6,9,10,13,19,20,34];

      if (requiredFields.includes(i)) {
        validators.push(Validators.required);
      }

      const checkboxIndices = this.generateIndices([37, 57], [96, 104], [106, 120]);
      checkboxIndices.delete(116);

      if (Object.keys(this.dependenciesMap).includes(`Texto${i}`)) {
        if (checkboxIndices.has(i)) {
          controls[`Texto${i}`] = new FormControl({value: false, disabled: true}, validators);
        } else {
          controls[`Texto${i}`] = new FormControl({value: '', disabled: true}, validators);
        }
      } else {
        if (checkboxIndices.has(i)) {
          controls[`Texto${i}`] = new FormControl(false, validators);
        } else {
          if (i == 34 || i == 85){
            controls[`Texto${i}`] = new FormControl('Brasil', validators);
          }else{
            controls[`Texto${i}`] = new FormControl('', validators);
          }
        }
      }
    }

    this.form = this.fb.group(controls);

    for (const dependentField in this.dependenciesMap) {
      const fieldToObserve = this.dependenciesMap[dependentField];
      this.form.get(fieldToObserve)?.valueChanges.subscribe(value => {
        const control = this.form.get(dependentField);
        if (value) {
          control?.enable();
        } else {
          control?.disable();
        }
      });
    }

    //Específico para calcular a idade
    this.form.get('Texto10')?.valueChanges.subscribe(date => {
      if (date) {
        const age = this.calculateAge(new Date(date));
        this.form.get('Texto11')?.setValue(age);
      }
    });

  }


  async onSubmit() {
    this.submitted = true;

    this.form.markAllAsTouched();

    if (this.form.invalid) {
        return; // Sai da função se o formulário for inválido.
    }

    const formValues = this.form.value;

      // Carregue seu PDF
      const pdfUrl = '../../../assets/formularios/dengue-chik.pdf'; // Altere isso para o caminho do seu PDF
      const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pdfForm = pdfDoc.getForm();

      // Obter todos os campos do PDF
      const fields = pdfForm.getFields();

      // Aqui, pegue os campos do seu PDF e defina os valores
      // O nome do campo é o que está definido no seu PDF interativo
      for (let i = 1; i <= 127; i++) {
        const fieldName = `Text${i}`;
        let fieldValue = formValues[`Texto${i}`];

        // definindo o campo 11 (tipo de idade) para 4 que é em anos.
        if (i === 12){
            fieldValue = 4;
        }

        // Verifique se o valor é booleano (campo checkbox)
        if (typeof fieldValue === 'boolean') {
            fieldValue = fieldValue ? '1' : '2';
        }

        // Converta o valor para uma string, se necessário
        if (typeof fieldValue === 'number') {
            fieldValue = fieldValue.toString();
        } else if (typeof fieldValue === 'string' && fieldValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = fieldValue.split('-');
            fieldValue = `${day}/${month}/${year}`;
        }

        const field = pdfForm.getTextField(fieldName);
        field.setText(fieldValue);
      }

      // Definir todos os campos como somente leitura
      fields.forEach(field => {
        field.enableReadOnly();
      });

      // Serialize o PDF modificado para bytes e salve-o
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'modified_document.pdf');
    }

    generateIndices(...ranges: [number, number][]): Set<number> {
      const indices = new Set<number>();
      for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
          indices.add(i);
        }
      }
      return indices;
    }

    formatStringForAPI(str: string): string {
      // Normalizar a string para a forma de decomposição da Unicode e remover caracteres não ASCII
      const noAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Substituir espaços por hífens
      const withHyphens = noAccents.replace(/\s+/g, '-');

      return withHyphens;
    }

    private calculateAge(birthDate: Date): number {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

}
