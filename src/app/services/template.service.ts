import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailDto } from '../model/email-dto';
import { HttpResponse } from '../model/http-response';
import { Template } from '../model/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  url = environment.url
  constructor(private http: HttpClient) { }


  saveTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(`${this.url}/template`, template)
  }

  updateTemplate(template: Template): Observable<Template> {
    return this.http.put<Template>(`${this.url}/template`, template)
  }

  getTemplate(templateId: number): Observable<Template> {
    return this.http.get<Template>(`${this.url}/template/${templateId}`)
  }
  deleteTemplate(templateId: number): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(`${this.url}/template/${templateId}`)
  }

  getTemplatesPagnating(searchValue: string, page: number, size: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/template?searchValue=${searchValue}&page=${page}&size=${size}`)
  }
  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.url}/template/all`)
  }

  reviewTemplate(emailDto: EmailDto): Observable<any> {
    return this.http.post(`${this.url}/template/review`, emailDto, { responseType: 'text' })
  }
}
