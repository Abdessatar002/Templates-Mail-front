import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../model/email';
import { EmailDto } from '../model/email-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url = environment.url
  constructor(private http: HttpClient) { }


  public sendEmail(email: EmailDto): Observable<any> {
    return this.http.post(`${this.url}/email`, email, { responseType: 'text' })
  }

  public getEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.url}/email`)
  }
  public getEmailsPagenation(searchValue: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.url}/email?searchValue=${searchValue}&page=${page}&size=${size}`)
  }
  public getEmail(emailId: number): Observable<Email> {
    return this.http.get<Email>(`${this.url}/email/${emailId}`)
  }

  public getEmailByRecipientEmail(email: string): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.url}/email/findby/${email}`)
  }
}
