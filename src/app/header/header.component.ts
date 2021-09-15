import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/product/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  total: number = 0;
  totalSubscription!: Subscription;
  isDarkMood: boolean = false;
  authenticated: boolean = false;
  constructor(
    public translate: TranslateService,
    public router: Router,
    private productService: ProductsService,
    @Inject(DOCUMENT) private document: Document,
    private rendrer: Renderer2
  ) {}

  ngOnInit(): void {
    this.totalSubscription = this.productService.totalItemsObservable.subscribe(
      (res) => {
        this.total = res;
      }
    );
  }
  switchTheme() {
    this.isDarkMood = !this.isDarkMood;
    const themeClass = this.isDarkMood ? 'theme-dark' : 'theme-light';
    this.rendrer.setAttribute(this.document.body, 'class', themeClass);
    localStorage.setItem('darkMood', 'true');
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('currentLanguage', lang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang === 'ar') {
        this.document.documentElement.dir = 'rtl';
      } else {
        this.document.documentElement.dir = 'ltr';
      }
    });
  }

  ngOnDestroy() {
    this.totalSubscription.unsubscribe();
  }
}
