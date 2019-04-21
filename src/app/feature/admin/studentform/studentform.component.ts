import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  DoCheck
} from "@angular/core";
import { DocumentModel } from "../../models/DocumentModel";
import { AdminuseUiService } from "../../services/ui/adminuse-ui.service";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { StudentCategory } from "../../enums/StudentCategory";
import { Student } from "../../models/Student";

@Component({
  selector: "app-studentform",
  templateUrl: "./studentform.component.html",
  styleUrls: ["./studentform.component.scss"]
})
export class StudentformComponent implements OnInit {
  @Input("studentInput") student: Student;
  @Input("editFlag") editFlag: boolean;

  @Output("submitform") submitform: EventEmitter<Student> = new EventEmitter();
  form;
  documents: Array<DocumentModel>;

  constructor(
    private _adminUseService: AdminuseUiService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: ["", Validators.required],
      category: [, Validators.required],
      dob: [new Date(), Validators.required],
      fathername: ["", Validators.required],
      mothername: ["", Validators.required],
      lastclassscore: [1, [Validators.min(1), Validators.max(100)]],
      documentslist: new FormArray([], this.mandatorymustbechecked())
    });
  }

  ngOnInit() {
    if (this.student) {
      this.setFormValues();
    }
  }

  get name() {
    return this.form.get("name");
  }

  get fathername() {
    return this.form.get("fathername");
  }

  get mothername() {
    return this.form.get("mothername");
  }

  get lastclassscore() {
    return this.form.get("lastclassscore");
  }

  get studentCategoryElement() {
    return this.form.get("category");
  }

  get dobElement() {
    return this.form.get("dob");
  }

  get documentList() {
    return this.form.controls.documentslist;
  }

  get studentCategory() {
    return StudentCategory;
  }

  /**
   * To get the checkboxes on base of category selected
   * @param category Can be international or domestic
   */
  public onCategoryChanged(category) {
    this._adminUseService.getDocs(category).subscribe(docs => {
      this.documents = docs;
      this.documentList.controls = [];
      this.documents.map(docmnt => {
        this.documentList.push(new FormControl(docmnt.isChecked));
      });
    });
  }

  /**
   * To submit a form in case of add or view button
   */
  public onsubmit() {
    let student = this.form.value;
    student.documentslist = this.getKeysOfSelectedDocs(student.documentslist);
    let studentObj = new Student(student);
    this.student ? (studentObj.id = this.student.id) : this.student;

    this.submitform.emit(studentObj);
    this.resetFormValues();
  }

  /**
   * Helper validator function to validate all the mandatory checkboxes are checked
   */
  private mandatorymustbechecked() {
    const validator: ValidatorFn = (formArray: FormArray) => {
      let controls = formArray.controls;

      for (let i = 0; i < controls.length; i++) {
        if (!controls[i].value && this.documents[i].isMandatory)
          return { NotChecked: true };
      }
      return null;
    };

    return validator;
  }

  /**
   * To get the keys of selected document
   * @param documents
   */
  private getKeysOfSelectedDocs(documents: Array<any>) {
    let index = -1;
    let arr = documents
      .map(doc => {
        index++;
        if (doc) return this.documents[index].key;
      })
      .filter(a => a > 0);
    return arr;
  }

  /**
   * To disable all the controls when only viewing a student form
   */
  private disableControls() {
    let controls = this.form.controls;
    let keys = Object.keys(controls);
    for (let i = 0; i < keys.length; i++) {
      controls[keys[i]].disable();
    }
  }

  /**
   * To set form values when a user clicks on edit or view button
   */
  private setFormValues() {
    if (this.student.documents) {
      this._adminUseService.getDocs(this.student.category).subscribe(docs => {
        this.documents = docs;
        this.documentList.controls = [];
        this.documents.map(docmnt => {
          let flag = false;
          if (this.student.documents.indexOf(docmnt.key) != -1) flag = true;
          this.documentList.push(new FormControl(flag));
        });
      });
    }
    if (!this.editFlag) this.disableControls();
    this.form.patchValue({
      name: this.student.name,
      category: this.student.category,
      fathername: this.student.FatherName,
      mothername: this.student.MotherName,
      lastclassscore: this.student.LastClassScore,
      dob: this.student.DOB,
      documentList: this.documentList
    });
  }

  /**
   * To reset form values after clicking on submit button
   */
  private resetFormValues() {
    this.form.patchValue({
      name: " ",
      mothername: " ",
      fathername: " ",
      lastclassscore: 1,
      dob: new Date()
    });
    this.onCategoryChanged(StudentCategory.International);
  }
}
