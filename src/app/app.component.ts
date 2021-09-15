import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'store';
  isDarkMood: boolean = false;
  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    //apply language
    this.translate.use(localStorage.getItem('currentLanguage') || 'en');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang === 'ar') {
        this.document.documentElement.dir = 'rtl';
      } else {
        this.document.documentElement.dir = 'ltr';
      }
    });
    //apply theme
    this.isDarkMood = !!localStorage.getItem('darkMood') || false;

    const themeClass = this.isDarkMood ? 'theme-dark' : 'theme-light';

    this.document.body.setAttribute('class', themeClass);
  }
}
