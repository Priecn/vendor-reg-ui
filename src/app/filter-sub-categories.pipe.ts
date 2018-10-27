import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './models/category-model';

@Pipe({
  name: 'filterSubCategories'
})
export class FilterSubCategoriesPipe implements PipeTransform {

  transform(value: Category[], search: string): Category[] {
    let output = value;
    if(search.length > 1) {
      //console.log(search);
      output = value.filter(
        cat => cat.name.toLowerCase().indexOf(search.toLowerCase()) != -1
      );
    }
    if(output.length == 0)
      output.push(new Category(-1, search));
    return output;
  }

}
