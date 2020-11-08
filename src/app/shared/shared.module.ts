import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { CommonModule, LOCATION_INITIALIZED } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptors } from './interceptors/loader.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

// Environment
import { environment } from 'src/environments/environment';
import { LoadImageDirective } from './directives/load-image.directive';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export function appInitializerFactory(translateService: TranslateService, injector: Injector): () => Promise<any> {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translateService.setDefaultLang(environment.appLang);
      resolve(null);
    });
  });
}

@NgModule({
  declarations: [LoadImageDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [
    TranslateModule,
    LoadImageDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptors, multi: true },
    { provide: APP_INITIALIZER, useFactory: appInitializerFactory, deps: [TranslateService, Injector], multi: true },
  ]
})
export class SharedModule { }
