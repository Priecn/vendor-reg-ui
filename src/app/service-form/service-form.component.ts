import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Province } from '../models/province-model';
import { Category } from '../models/category-model';
import { FilterSubCategoriesPipe } from '../filter-sub-categories.pipe';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {

  serviceForm: FormGroup;

  provinces: Province[];
  categories: Category[];
  subCategories: Category[];
  filteredSubCategories: Category[];
  selectedSubCategories: Category[];
  currentSearchText: string;
  selectedCategoryId: number;
  vendorAdded: boolean;
  errorOccured: boolean;
  savedVendor = null;

  constructor(private fetch: FetchDataService, private searchFilter: FilterSubCategoriesPipe) { }

  ngOnInit() {
    this.vendorAdded = false;
    this.errorOccured = false;
    this.selectedSubCategories = [];
    this.fetch.getAllProvinces()
        .subscribe(
          res => this.provinces = res,
          //err => console.log(`ERROR: ${err}`)
        );

    this.fetch.getAllCategories()
        .subscribe(
          res => this.categories = res,
          //err => console.log(`ERROR: ${err}`)
        );
    
    this.serviceForm = new FormGroup({
      'firstName': new FormControl(null),
      'lastName': new FormControl(null),
      'gender': new FormControl(null),
      'dateOfBirth': new FormControl(null),
      'vendorRegDate': new FormControl((new Date()).toISOString().substr(0,10)),
      'mobileNumber': new FormControl(null),
      'phoneNumber': new FormControl(null),
      'email': new FormControl(null),
      'address' : new FormGroup({
        'addressLine1': new FormControl(null),
        'addressLine2': new FormControl(null),
        'state': new FormControl('Telangana'),
        'city': new FormControl('Hyderabad'),
        'provinceId': new FormControl(null),
        'pincode': new FormControl(null)
      }),
      'company': new FormGroup({
         'name': new FormControl(null),
         'address': new FormGroup({
            'addressLine1': new FormControl(null),
            'addressLine2': new FormControl(null),
            'state': new FormControl('Telangana'),
            'city': new FormControl('Hyderabad'),
            'provinceId': new FormControl(null),
            'pincode': new FormControl(null)
          }),
         'businessCategoryId': new FormControl(null)
      }),
    });

  }


  getAllSubCategoriesForSelectedCategory(categoryId: number) {
    this.fetch.getSubCategoriesByCategoyId(categoryId)
        .subscribe(
          res => {
                    this.subCategories = res;
                    this.filteredSubCategories = this.subCategories;
          },
          err => console.log(`ERROR: ${err}`)
        );
  }

  onSelectCategory(id: number) {
    this.selectedCategoryId = id;
    this.getAllSubCategoriesForSelectedCategory(id);
  }

  searchSubCategory(searchText: string) {
    this.currentSearchText = searchText;
    this.filteredSubCategories = this.searchFilter.transform(this.subCategories, searchText);
    //console.log(this.filteredSubCategories);
  }

  getDropdownSize() {
    return this.filteredSubCategories.length > 5 ? 5: this.filteredSubCategories.length+1;
  }

  subCategorySelected(subCategoryId) {
    if(subCategoryId != "choose" && subCategoryId != -1) {
      let selectedSubCategory = this.filteredSubCategories.find(s => s.id == subCategoryId);
      if(this.selectedSubCategories.indexOf(selectedSubCategory) == -1)
          this.selectedSubCategories.push(selectedSubCategory);
    } else if(subCategoryId == -1){
      this.fetch.addSubCategoryToGivenCategoryId(
                    this.selectedCategoryId, {'name': this.currentSearchText}
                ).subscribe(
                  res => this.selectedSubCategories.push(res),
                  err => console.log(`ERROR: ${err}`)
                );
    }
  }

  saveVendor() {
    let vendorObject = this.serviceForm.value
    //console.log(vendorObject);
    let selectedSubCatIds = this.selectedSubCategories.map(
      subCat => subCat.id
    );
    vendorObject.company['subCategoryIds'] = selectedSubCatIds;
    //console.log(vendorObject);
    let savedVendor= null;
    this.fetch.addVendor(vendorObject)
        .subscribe(
          res => {
            this.savedVendor = res;
            this.vendorAdded = true;
          },
          err => {
            console.log(`ERROR: ${err}`);
            this.errorOccured = true;
          }
        );
  }
}
