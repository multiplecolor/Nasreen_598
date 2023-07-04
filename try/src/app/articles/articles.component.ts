import { Component, OnInit,ViewChild } from '@angular/core';
import { ArticleService } from '../service/article.service';
import { SearchService } from '../search.service';
import * as moment from 'moment';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit   {
  @ViewChild(ArticlesComponent) articlesComponent!: ArticlesComponent;

  filterArticlesByLanguage(language: string) {
    throw new Error('Method not implemented.');
  }
  public articles: any[] = [
 
    // More articles...
  ];
  
  filteredArticles: any[] = [];
  searchKeyword: string = '';
  keyword:any[]=[];
  public searchQuery: string = '';




  constructor(private articleService: ArticleService,private searchService: SearchService,private newsService: NewsService) {}

  ngOnInit() {
    this.articleService.selectedCountry$.subscribe(selectedCountry => {
      this.fetchArticles(selectedCountry, this.articleService.getSelectedCategory());
      
    });

    this.articleService.selectedCategory$.subscribe(selectedCategory => {
      this.fetchArticles(this.articleService.getSelectedCountry(), selectedCategory);
    });
    this.articleService.getArticles(this.articleService.getSelectedCountry(),this.articleService.getSelectedCategory()).subscribe((data: any) => {
      this.articles = data.articles;
      this.filterArticles();
    });
    this.searchService.getSearchKeyword().subscribe(keyword => {
      this.searchKeyword = keyword;
      this.filterArticles();

    });
  }
  

  fetchArticles(country: string, category: string) {
    this.articleService.getArticles(country, category).subscribe((data: any) => {
      this.articles = data.articles;
      this.filterArticles();
    });
  }
  filterArticles() {
    if (this.searchKeyword) {
      this.filteredArticles = this.articles.filter(article =>
        article.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.filteredArticles = this.articles;
    }
  }
  formatDate(dateString: string): string {
    const dateObj = moment(dateString);
    if (dateObj.isValid()) {
      return dateObj.format('YYYY-MM-DD'); // Customize the format as per your requirements
    } else {
      return 'Invalid Date';
    }
  }
  public performSearch(): void {
    // Filter the articles based on the search query
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      article.date.toISOString().includes(this.searchQuery) ||
      article.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
  public truncateTitle(title: string, limit: number): string {
    const words = title.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return title;
    }
  }
  
  public truncateDescription(description: string, limit: number): string {
    const words = description.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return description;
    }
  }
  

}
