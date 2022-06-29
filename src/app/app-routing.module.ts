import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './compenetes/client/client.component';
import { TemplateComponent } from './compenetes/add-template/template.component';
import { ValidateEmailComponent } from './compenetes/validate-email/validate-email.component';
import { TemplatesComponent } from './compenetes/templates/templates.component';
import { EmailsComponent } from './compenetes/emails/emails.component';
import { EmailDetailsComponent } from './compenetes/email-details/email-details.component';
import { ClientDetailsComponent } from './compenetes/client-details/client-details.component';
import { PageNotFoundComponent } from './compenetes/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'client', component: ClientComponent },
  { path: 'validate-email', component: ValidateEmailComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'add-template', component: TemplateComponent },
  { path: 'edit-template/:id', component: TemplateComponent },
  { path: 'emails', component: EmailsComponent },
  { path: 'email/:emailId', component: EmailDetailsComponent },
  { path: 'client/:email', component: ClientDetailsComponent },
  { path: '', component: ClientComponent },
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
