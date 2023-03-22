import {Validators} from '@angular/forms';
import {Loader} from "./helper";

export function GenerateForm(formData: any, formService: any) {
  let data: any = {
    extraInputs: formData.extraInputs,
    formCode: formData.formCode,
    formName: formData.formName,
    formUrl: formData.formUrl,
    permissions: formData.permissions,
    sections: [],
  };
  if (formData.sections && formData.sections.length > 0) {
    formData.sections.forEach((el: any) => {
      if (el.isMultiple) {
        GetDataFromApi(el, formService);
        let x = {
          isMultiple: el.isMultiple,
          sectionWidth: el.sectionWidth,
          conditional: el.conditional,
          conditionalModelName: el.conditionalModelName,
          conditionalModelValue: el.conditionalModelValue,
          conditionalSectionId: el.conditionalSectionId,
          sectionArray: [
            // this.fb.group(data)
            el
          ],
        };
        data.sections.push(x);
      } else {
        GetDataFromApi(el, formService);
        data.sections.push(el)
      }
    });
  }
  return data;
}


export function GetDataFromApi(data: any, formService: any) {
  if (data.inputFields && data.inputFields.length > 0) {
    data.inputFields.forEach((el: any) => {
      if (el.optionType == 'API') {
        formService.getDataFromApi(el.apiUrl).subscribe((response: any) => {
          Loader(false);
          el.options = response;
        }, (error: any) => {
          Loader(false);
          el.options = [];
        });
      }
    });
  }
}

export function BindValidations(validations: any, section: any){
  let index;
  if (section.conditional) {
    // index = this.fields.sections.findIndex((e: any) => e.id === section.conditionalSectionId);
  }
  if (validations.length > 0) {
    const validList: any = [];
    // console.log(this.form.controls);
    validations.forEach((valid: any) => {
      switch (valid.type) {
        case 'required':
          validList.push(Validators.required);
          // validList.push(this.requiredIfValidator(() => this.form.controls.sections['controls'][index].get(section.conditionalModelName).value == section.conditionalModelValue));
          break;
        case 'pattern':
          validList.push(Validators.pattern(valid.value));
          break;
        case 'email':
          validList.push(Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'));
          break;
        case 'minlength':
          validList.push(Validators.minLength(valid.value));
          break;
        case 'maxlength':
          validList.push(Validators.maxLength(valid.value));
          break;
        case 'max':
          validList.push(Validators.max(valid.value));
          break;
        case 'min':
          validList.push(Validators.min(valid.value));
          break;
        default:
          break;
      }
    });
    return Validators.compose(validList);
  }
  return null;
}

