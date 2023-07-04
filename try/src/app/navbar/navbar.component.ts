import { Component,EventEmitter, Output ,OnInit  } from '@angular/core';
import { SharedServiceService } from '../service/shared-service.service';
import { ArticleService } from '../service/article.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  countries: any[] = [];
  categories: any[] = [];
  selectedCountry: string | any;
  selectedCategory: string | any;
  searchKeyword: string = '';
  public searchQuery: string = '';
 
  constructor(private articleService: ArticleService,private searchService: SearchService) {}

  ngOnInit() {
    this.fetchCountries();
    this.fetchCategories();
  }

  fetchCountries() {
    this.articleService.getCountries().subscribe((data: any) => {
      this.countries = data.countries;
      this.selectedCountry = this.countries[0].code; // Select the first country by default
      this.onCountryChange();
    });
  }

  fetchCategories() {
    this.articleService.getCategories().subscribe((data: any) => {
      this.categories = data.categories;
      this.selectedCategory = this.categories[0]; // Select the first category by default
      this.onCategoryChange();
    });
  }

  onCountryChange() {
    this.articleService.setSelectedCountry(this.selectedCountry);
  }

  onCategoryChange() {
    this.articleService.setSelectedCategory(this.selectedCategory);
  }
  filterArticles() {
    this.searchService.setSearchKeyword(this.searchKeyword);
  }
 public performSearch(){
  this.searchService.setSearchKeyword(this.searchQuery);
 }
 
}
