import { Injectable } from "@angular/core";
import { AdminuseCoreService } from "../core/adminuse-core.service";
import { StudentCategory } from "../../enums/StudentCategory";
import { DocumentModel } from "../../models/DocumentModel";
import { Observable, zip, of, combineLatest, pipe } from "rxjs";
import { Student } from "../../models/Student";
import { filter, map } from "rxjs/operators";
@Injectable()
export class AdminuseUiService {
  private domesticDocs: Array<DocumentModel> = [];
  private internationalDocs: Array<DocumentModel> = [];
  private keyvaluepairs;

  /**
   * To format data returned by core service for component
   * @param _adminUseCoreService Service that makes http call and give data to ui service to format data
   */
  constructor(private _adminUseCoreService: AdminuseCoreService) {
    combineLatest(
      this._adminUseCoreService.getDocumentsPair(),
      this._adminUseCoreService.getDomesticDocs(),
      this._adminUseCoreService.getInternatinalDocs()
    ).subscribe(([docPairs, domesticDocs, internationalDocs]) => {
      /**
       * To prepare domestic docs considering if the document is mandatory
       */

      this.keyvaluepairs = docPairs;
      this.domesticDocs = docPairs.map(docPair => {
        let mandatoryInDomestic = domesticDocs.indexOf(docPair.key) != -1;
        let newDoc = new DocumentModel(
          docPair.key,
          docPair.value,
          mandatoryInDomestic
        );
        return newDoc;
      });

      /**
       * To prepare international docs considering if the document is mandatory
       */
      this.internationalDocs = docPairs.map(docPair => {
        let mandatoryInInternational =
          internationalDocs.indexOf(docPair.key) != -1;
        let newDoc = new DocumentModel(
          docPair.key,
          docPair.value,
          mandatoryInInternational
        );
        return newDoc;
      });
    });
  }

  /**
   * Returns the documents depending upon the category of student
   * @param category Category of student can be domestic or international
   */
  getDocs(category: StudentCategory): Observable<Array<DocumentModel>> {
    if (category === StudentCategory.Domestic) {
      return of(this.domesticDocs);
    } else if (category === StudentCategory.International) {
      return of(this.internationalDocs);
    }
  }

  addStudent(student: Student) {
    this._adminUseCoreService.addStudent(student);
  }

  getStudents(): Observable<Array<Student>> {
    return this._adminUseCoreService.getStudentObs();
  }

  deleteStudent(id: number) {
    this._adminUseCoreService.deleteStudent(id);
  }

  editStudent(student: Student) {
    this._adminUseCoreService.editStudent(student);
  }
}
