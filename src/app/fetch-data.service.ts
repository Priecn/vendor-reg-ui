import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Province } from './models/province-model';
import { Category } from './models/category-model';

@Injectable()
export class FetchDataService {

  provinceUrl = "http://localhost:8080/v1/province/";
  vendorUrl = "http://localhost:8080/v1/vendor/";
  categoryUrl = "http://localhost:8080/v1/company/category/"

  constructor(private http: HttpClient) { }

  getAllProvinces(): Observable<Province[]> {

    return this.http.get<Province[]>(this.provinceUrl+"all");

  }

  getVendorById(id: number): Observable<any> {

    return this.http.get<any>(this.vendorUrl+id);

  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl+'all');
  }

  getSubCategoriesByCategoyId(categoryId: number): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl+categoryId+'/subcategory/all');
  }

  addSubCategoryToGivenCategoryId(categoryId: number, category: any): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl+categoryId+'/subcategory/add', category);
  }

  addVendor(vendor: any): Observable<any> {
    return this.http.post<any>(this.vendorUrl+'add', vendor);
  }
}
