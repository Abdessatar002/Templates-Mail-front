import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Pipe, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/model/email';
import { EmailDto } from 'src/app/model/email-dto';
import { Template } from 'src/app/model/template';
import { ClientService } from 'src/app/services/client.service';
import { EmailService } from 'src/app/services/email.service';
import { TemplateService } from 'src/app/services/template.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html',
  styleUrls: ['./validate-email.component.css']
})
export class ValidateEmailComponent implements OnInit {
  htmlTemplate: any
  clientEmail: string[] = [];
  templates: Template[] = [];
  template1: Template = new Template();
  constructor(private templateService: TemplateService, private clientService: ClientService, private router: Router, private emailService: EmailService) { }


  ngOnInit(): void {
    this.getTemplates();
    this.clientService.emails.subscribe(data => {
      if (data.length == 0) {
        this.router.navigate(['/client']);
        console.log("select one client at less")
      }
      this.clientEmail = data
    })

  }



  rewieTemplate(form: NgForm) {
    if (this.template1.id == null || this.template1.id == undefined) {
      console.log('Please select a template')
      return
    }
    let email = new EmailDto();
    email.templateId = this.template1.id
    email.title = form.value.title
    email.body = form.value.body
    console.log(email.templateId)
    this.templateService.reviewTemplate(email).subscribe((data: any) => {
      this.htmlTemplate = data;
    })

  }

  public sendEmail(form: NgForm) {

    if (this.template1.id == null || this.template1.id == undefined) {
      console.log('Please select a template')
      return
    }
    let email = new EmailDto();
    email.from = 'mailtrap'
    email.subject = form.value.subject
    email.to = this.clientEmail

    email.templateId = this.template1.id
    email.title = form.value.title
    email.body = form.value.body


    Swal.fire({
      title: 'Are you sure?',
      text: "You want to send this E-mail?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, send it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.emailService.sendEmail(email).subscribe((data: string) => {
          this.router.navigate(['/client']);
          this.clientService.emails.next([]);
          Swal.fire(
            'E-mail has been sent successfully',
            '',
            'success'
          )
          console.log(data)
        }, (error: HttpErrorResponse) => {
          Swal.fire(
            'Error',
            error.error.message,
            'error'
          )
        }
        )

      }
    })




  }

  public getTemplates() {
    this.templateService.getTemplates().subscribe(data => {
      this.templates = data;
      console.log("get . tepmlates");
    })
  }

}
