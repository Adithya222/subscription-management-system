export class CForm {
  formCode: string = '';
  formName: string = '';
  sections: FormSection[] = [] = [];
}

export class FormSection {
  sectionCode: string = '';
  sectionName: string = '';
  inputFields: FieldConfig[] = [];
}

export class FieldConfig {
  inputClass: string = '';
  label: string = '';
  name: string = '';
  inputType?: string = '';
  options?: any[] = [];
  collections?: any;
  fieldType: string = '';
  value?: any;
  validations?: Validator[] = [];
  columnSize: string = '';
  disclaimer: string = '';
  modelNameToLoadData: string = '';
  parameter: string = '';
  helpTipEn: string = '';
  helpTipSi: string = '';
  helpTipTa: string = '';

  constructor() {
    this.validations = [] = [];
  }
}

export class Validator {
  name: string = '';
  validator: any;
  message: string = '';
}

