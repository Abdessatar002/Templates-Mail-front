import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email } from 'src/app/model/email';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  emails: Email[] = [];
  routeEmail = '';

  constructor(private emailService: EmailService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.has('email'))
      this.routeEmail = this.activatedRoute.snapshot.paramMap.get('email')!;

    this.getEmailsByRecipientEmail(this.routeEmail);
  }


  getEmailsByRecipientEmail(email: string) {
    this.emailService.getEmailByRecipientEmail(email).subscribe(data => {
      if (data.length == 0) {
        this.router.navigate(['client']);
        console.log('no details for ' + this.routeEmail);
      }
      this.emails = data;
      console.log(this.emails)
    })
  }

}
