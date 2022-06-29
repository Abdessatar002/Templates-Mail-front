import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/model/email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {
  templates: any
  emails: Email[] = [];
  constructor(private emailService: EmailService) { }
  page: number = 1;
  size: number = 15;
  totalElements = 0;
  searchValue: string = '';

  ngOnInit(): void {
    this.getEmailsPagenation();
  }


  public getEmailsPagenation() {
    this.emailService.getEmailsPagenation(this.searchValue, this.page - 1, this.size).subscribe(data => {
      console.log(data);
      this.emails = data.content;
      this.totalElements = data.totalElements;

    })
  }
  changePageSize(pageSize: any) {
    this.size = pageSize;
    this.getEmailsPagenation();
  }

  getRecipientBySearchValue(serchValue: string) {
    console.log(this.searchValue)
    this.searchValue = serchValue;
    this.getEmailsPagenation();
  }

}
