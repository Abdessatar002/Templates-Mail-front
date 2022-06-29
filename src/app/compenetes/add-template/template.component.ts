import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from 'src/app/model/template';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  template = '';
  isRoutHasTemplateId = this.activeRout.snapshot.paramMap.has('id');

  editTemplate = new Template();
  constructor(private templateService: TemplateService,
    private activeRout: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getTemplate();
  }


  public saveTemplate(form: NgForm) {
    let template = new Template();
    template = form.value
    this.templateService.saveTemplate(template).subscribe(data => {
      this.template = data.htmlTemplate;
      console.log("saved successfuly. tepmlate");
      this.router.navigate(['/templates']);
    })
  }

  editeTemplate(editeForm: NgForm) {
    this.templateService.updateTemplate(editeForm.value).subscribe(data => {
      console.log('bien modifier');
      this.router.navigate(['/templates']);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message)
    }
    )
  }

  getTemplate() {
    if (!this.isRoutHasTemplateId)
      return
    const templateId = +this.activeRout.snapshot.paramMap.get('id')!;

    this.templateService.getTemplate(templateId).subscribe(data => {
      console.log('success')
      this.editTemplate = data;
      console.log(data.id)
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message)
    }
    )
  }



}
