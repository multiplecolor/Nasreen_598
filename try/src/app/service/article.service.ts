import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  filterArticles() {
    throw new Error('Method not implemented.');
  }
  private apiKey = 'bbf4d1c813f544f591a622ec2b758a9f';
  private apiUrl = 'https://newsapi.org/v2';
  private selectedCountrySubject = new BehaviorSubject<string>('us');
  private selectedCategorySubject = new BehaviorSubject<string>('general');

  selectedCountry$ = this.selectedCountrySubject.asObservable();
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor(private http: HttpClient) {}

  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }

  getSelectedCountry(): string {
    return this.selectedCountrySubject.value;
  }

  setSelectedCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  getSelectedCategory(): string {
    return this.selectedCategorySubject.value;
  }

  getCountries() {
    const url = `${this.apiUrl}/countries?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getCategories() {
    const url = `${this.apiUrl}/categories?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getArticles(country: string, category: string) {
    const url = `${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
