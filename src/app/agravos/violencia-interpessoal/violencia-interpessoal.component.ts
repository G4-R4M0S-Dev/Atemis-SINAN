import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import { IbgeService } from '../../services/ibge.service';
import { CnesService } from '../../services/cnes.service';
import { CepService } from '../../services/cep.service';

@Component({
  selector: 'app-violencia-interpessoal',
  templateUrl: './violencia-interpessoal.component.html',
  styleUrls: ['./violencia-interpessoal.component.scss']
})
export class ViolenciaInterpessoalComponent {
  form!: FormGroup;
  submitted = false;

  estados: string[] = [];
  municipiosByUF: { [key: string]: string[] } = {};
  estabelecimentosByCodigo: { [codigo: number]: any[] } = {};
  ibgeCode: number = 0;
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

  loadMunicipios(uf: string): string[] {
    if (!this.municipiosByUF[uf]) {
      this.ibgeService.getMunicipios(uf).subscribe(response => {
        this.municipiosByUF[uf] = response.map((municipio: any) => municipio.nome);
      });
    }
    return this.municipiosByUF[uf] || [];
  }

  loadIbgeCode(municipioNome: string, controlName: string) {
    const formattedName = this.formatStringForAPI(municipioNome);
    this.ibgeService.getMunicipioId(formattedName).subscribe(response => {
      this.ibgeCode = parseInt(response.id.toString().slice(0, -1), 10);
      this.form.get(controlName)?.setValue(this.ibgeCode);
    });
  }

  loadEstabelecimentosSaude(codigo_municipio: string): any[] {
    // Verifique se codigo_municipio pode ser convertido em um número
    const codigo = parseInt(codigo_municipio.toString());
    if (isNaN(Number(codigo))) {
      return [];
    }

    if (!this.estabelecimentosByCodigo[codigo]) {
      this.cnesService.getEstabelecimentosSaude(codigo).subscribe((response:any) => {
        this.estabelecimentosByCodigo[codigo] = response.flatMap((estabelecimento: any) => {
          return estabelecimento;
        });
      });
    }
    return this.estabelecimentosByCodigo[codigo] || [];
  }


  updateCnesValue(event: any, controlName: string) {
    const selectedNomeFantasia = event.target.value;

    // Obter todos os estabelecimentos em um array
    const allEstabelecimentos = Object.values(this.estabelecimentosByCodigo).flat();

    const selectedEstabelecimento = allEstabelecimentos.find(estabelecimento => estabelecimento.nome_fantasia === selectedNomeFantasia);
    if (selectedEstabelecimento) {
        this.selectedCnes = selectedEstabelecimento.codigo_cnes;
        this.form.get(controlName)?.setValue(this.selectedCnes);
    }
  }

  onCepChange(cep: string) {
    this.cepService.getCepDetails(cep).subscribe(details => {
        this.form.get('Texto18')?.setValue(details.stateShortname);
        this.form.get('Texto19')?.setValue(details.city);
        this.form.get('Texto20')?.setValue(details.ibgeId);
        this.form.get('Texto22')?.setValue(details.district);
        this.form.get('Texto23')?.setValue(details.street);
        this.form.get('Texto26')?.setValue(details.complement);
        this.hasError = false;
    },
    error => {
      this.hasError = true;
    });
  }


  private dependenciesMap: Record<string, { observe: string, value?: any }> = {
    'Texto3':  { observe:'Texto2'},
    'Texto4':  { observe:'Texto3'},
    'Texto5':  { observe:'Texto4'},
    'Texto6':  { observe:'Texto5'},
    'Texto60':  { observe:'Texto61'},
    'Texto62':  { observe:'Texto61'},
    'Texto74':  { observe:'Texto72', value:'1'},
    'Texto81':  { observe:'Texto80', value:'1'},
    'Texto82':  { observe:'Texto80', value:'1'},
  };

  private createForm() {
    const controls: Record<string, FormControl> = {};

    for (let i = 1; i <= 107; i++) {
      let validators = [];
      const requiredFields = [2,3,5,6,8,9,12,18,19,33];

      if (requiredFields.includes(i)) {
        validators.push(Validators.required);
      }

      if (Object.keys(this.dependenciesMap).includes(`Texto${i}`)) {
        controls[`Texto${i}`] = new FormControl({value: '', disabled: true}, validators);
      } else {
        if (i == 33){
          controls[`Texto${i}`] = new FormControl('Brasil', validators);
        }else{
          controls[`Texto${i}`] = new FormControl('', validators);
        }
      }
    }

    this.form = this.fb.group(controls);

    for (const dependentField in this.dependenciesMap) {
      const fieldData = this.dependenciesMap[dependentField];
      this.form.get(fieldData.observe)?.valueChanges.subscribe(value => {
        const control = this.form.get(dependentField);
        if (fieldData.value !== undefined) {
          if (value == fieldData.value) {
            control?.enable();
          } else {
            control?.disable();
          }
        } else {
          if (value) {
            control?.enable();
          } else {
            control?.disable();
          }
        }
      });
    }

    //Específico para calcular a idade
    this.form.get('Texto9')?.valueChanges.subscribe(date => {
      if (date) {
        const age = this.calculateAge(new Date(date));
        this.form.get('Texto10')?.setValue(age);
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
      const pdfUrl = '../../../assets/formularios/Raiva.pdf'; // Altere isso para o caminho do seu PDF
      const pdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pdfForm = pdfDoc.getForm();

      // Obter todos os campos do PDF
      const fields = pdfForm.getFields();

      // Aqui, pegue os campos do seu PDF e defina os valores
      // O nome do campo é o que está definido no seu PDF interativo
      for (let i = 1; i <= 107; i++) {
        const fieldName = `Texto${i}`;
        let fieldValue = formValues[`Texto${i}`];

        // definindo o campo 11 (tipo de idade) para 4 que é em anos.
        if (i === 11){
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
