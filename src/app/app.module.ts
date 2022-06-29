import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './compenetes/nav-bar/nav-bar.component';
import { ClientComponent } from './compenetes/client/client.component';
import { FormsModule } from '@angular/forms';
import { ValidateEmailComponent } from './compenetes/validate-email/validate-email.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { TemplateComponent } from './compenetes/add-template/template.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { TemplatesComponent } from './compenetes/templates/templates.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmailsComponent } from './compenetes/emails/emails.component';
import { EmailDetailsComponent } from './compenetes/email-details/email-details.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientDetailsComponent } from './compenetes/client-details/client-details.component';
import { PageNotFoundComponent } from './compenetes/page-not-found/page-not-found.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderInterceptor } from './interceptor/loader.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ClientComponent,
    ValidateEmailComponent,
    SafeHtmlPipe,
    TemplateComponent,
    TemplatesComponent,
    EmailsComponent,
    EmailDetailsComponent,
    ClientDetailsComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    NgbPaginationModule,
    MatProgressBarModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
