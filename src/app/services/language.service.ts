import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  localeLang = new Subject<string>();
  constructor(public translate: TranslateService) {}

  changeLocale(lang: string) {
    this.translate.use(lang);
    this.localeLang.next(lang);
  }
}
