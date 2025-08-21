
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()), // ✅ Fix NG02801
    provideRouter(routes),
    importProvidersFrom(
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        timeOut: 4000,
        progressBar: true
      })
    )
  ]
});








