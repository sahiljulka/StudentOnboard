import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "../models/Student";
import { StudentCategory } from "../enums/StudentCategory";

/**
 * This pipe is used for searching and filtering user on base of category
 */
@Pipe({
  name: "searchpipe"
})
export class SearchpipePipe implements PipeTransform {
  transform(value: Student[], searchstring?: any, category?: any): any {
    let students = value;
    if (searchstring && searchstring.length > 0) {
      let text = searchstring.toString();
      text = text.toLocaleLowerCase();
      if (text && text.length == 0) return value;
      students = value.filter(a => a.name.toLocaleLowerCase().startsWith(text));
    }
    if (
      category == StudentCategory.Domestic ||
      category == StudentCategory.International
    )
      students = students.filter(st => st.category == category);
    return students;
  }
}
