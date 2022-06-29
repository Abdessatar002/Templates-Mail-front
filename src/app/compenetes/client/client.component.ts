import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public page = 1;
  public size = 15;
  public totalElements = 0;
  public searchValue = '';


  clients: Client[] = [];
  listEmails: string[] = this.clientService.emails.value;
  client = new Client();
  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  addClient(form: NgForm) {
    console.log(form.value);
    this.clientService.addClient(form.value).subscribe((data: Client) => {
      this.getClients();
      form.reset();
      document.getElementById('close-module-add-client')?.click()
      console.log('Added Successfuly');
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
    }
    )
  }
  updateClient(form: NgForm) {
    this.clientService.updateClient(this.client).subscribe(data => {
      console.log('Recipient Updated successfully.');
      this.listEmails = [];
      this.client = new Client();
      document.getElementById('close-update-modal')?.click()
      this.getClients();

    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    }
    )
  }

  delteClient(clientId: any) {
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
        this.clientService.deleteClient(clientId).subscribe(data => {
          this.getClients();
          Swal.fire(
            'Deleted!',
            'Recipient has been deleted.',
            'success'
          )
        }, (error: HttpErrorResponse) => {
          console.log(error.error.message);
          Swal.fire(
            'Error!',
            error.error.message,
            'error'
          )
        }
        )

      }
    })
  }


  public getClients() {
    this.clientService.getClients(this.searchValue, this.page - 1, this.size).subscribe((data: any) => {
      console.log(data);
      this.totalElements = data.totalElements
      this.clients = data.content;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    }
    )
  }
  getRecipientBySearchValue(searchValue: string) {
    this.searchValue = searchValue;
    this.getClients();
    console.log(searchValue)
  }

  getEmails(client: Client) {
    if (!this.listEmails.includes(client.recipientEmail))
      this.listEmails.push(client.recipientEmail);
    else
      this.listEmails.splice(this.listEmails.indexOf(client.recipientEmail), 1);
  }
  removeEmailFromList(index: number) {
    this.listEmails.splice(index, 1);
    console.log(index);
  }
  clearEmailList() {
    this.listEmails = []
  }

  valider() {
    this.clientService.emails.next(this.listEmails);
    console.log(this.clientService.emails.value);
  }
  onEditClient(client: Client) {
    this.client = client;
  }
  changePageSize(pageSize: any) {
    this.size = pageSize;
    this.getClients();
  }

}
