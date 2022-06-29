import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/app/model/email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.css']
})
export class EmailDetailsComponent implements OnInit {
  email = new Email();

  constructor(private emailService: EmailService,
    private activatedRoute: ActivatedRoute,
    private router: Router, public location: Location) { }

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail() {

    const emailId = +this.activatedRoute.snapshot.paramMap.get('emailId')!
    this.emailService.getEmail(emailId).subscribe(data => {
      console.log(data)
      this.email = data;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message)
      this.router.navigate(['/emails'])
    }
    )
  }

}
