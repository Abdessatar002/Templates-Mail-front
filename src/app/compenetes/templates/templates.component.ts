import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailDto } from 'src/app/model/email-dto';
import { Template } from 'src/app/model/template';
import { TemplateService } from 'src/app/services/template.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  page = 1;
  size = 15;
  totalElements = 0;
  searchValue = '';
  templates: Template[] = [];
  htmlTemplate: any

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.getTemplates();
  }


  getTemplates() {
    this.templateService.getTemplatesPagnating(this.searchValue, this.page - 1, this.size).subscribe((data: any) => {
      console.log(data)
      this.templates = data.content;
      this.totalElements = data.totalElements;
    })
  }

  rewieTemplate(template: Template) {
    let email = new EmailDto();
    email.templateId = template.id
    email.title = template.title
    email.body = template.body
    this.templateService.reviewTemplate(email).subscribe((data: any) => {
      this.htmlTemplate = data;
    })

  }

  public deleteTemplate(templateId: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.templateService.deleteTemplate(templateId).subscribe(data => {
          this.getTemplates();
          console.log(JSON.stringify(data))
          Swal.fire(
            'Deleted!',
            'Template has been deleted.',
            'success'
          )

        }, (error: HttpErrorResponse) => {
          console.log(error.error.message)
        })

      }
    })
  }

  getTemplateBySearchValue(searchValue: string) {
    console.log(searchValue);
    this.searchValue = searchValue;
    this.getTemplates();

  }

  changePageSize(size: any) {
    this.size = size;
    this.getTemplates();
  }

}
