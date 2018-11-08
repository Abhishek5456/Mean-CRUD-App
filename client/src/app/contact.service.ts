import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Contact } from './contact';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  ApiUrl: string = "http://localhost:3000/api/";

  constructor(private http: Http) { }

  getContacts() : Observable<Contact[]>
  {
    return this.http.get(this.ApiUrl + 'contacts')
      .pipe(map(res => res.json()));
  }

  addContact(newContact: Contact)
  {
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.post(this.ApiUrl + 'contacts', newContact, {headers: headers})
      .pipe(map(res => res.json()));
  }

  deleteContact(id :string)
  {
    return this.http.delete(this.ApiUrl + 'contacts/'+ id)
    .pipe(map(res => res.json()));
  }

  updateContact(id:string, contact: Contact): Observable<string>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.ApiUrl + 'contacts/'+ id, contact, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
