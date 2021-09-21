import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkMood: boolean = false;
  authenticated: boolean = false;
  constructor(
    public translate: TranslateService,
    private languageService: LanguageService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
    private rendrer: Renderer2
  ) {}

  ngOnInit(): void {}
  switchTheme() {
    this.isDarkMood = !this.isDarkMood;
    const themeClass = this.isDarkMood ? 'theme-dark' : 'theme-light';
    this.rendrer.setAttribute(this.document.body, 'class', themeClass);
    localStorage.setItem('darkMood', this.isDarkMood.toString());
  }
  changeLanguage(lang: string) {
    this.languageService.changeLocale(lang);
    localStorage.setItem('currentLanguage', lang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang === 'ar') {
        this.document.documentElement.dir = 'rtl';
      } else {
        this.document.documentElement.dir = 'ltr';
      }
    });
  }
}
