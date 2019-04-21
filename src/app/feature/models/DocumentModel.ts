export class DocumentModel {
  key: number;
  value: string;
  isMandatory: boolean;
  isChecked: boolean;
  /**
   *
   */
  constructor(key, value, isMandatory, isChecked = false) {
    this.key = key;
    this.value = value;
    this.isMandatory = isMandatory;
    this.isChecked = isChecked;
  }
}
