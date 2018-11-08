import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts : Contact[];
  newContact: Contact;
  first_name : String;
  last_name : String;
  phone : String;
  UpdateVisible = false;
  constructor(private contactService: ContactService) {
  
  }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.first_name = '';
    this.last_name = '';
    this.phone = '';
    this.contactService.getContacts()
      .subscribe(data => this.contacts = data,
      () => console.log("Contacts" + this.contacts));
  }

  addContact() {
    const newContact = {
      first_name : this.first_name,
      last_name : this.last_name,
      phone : this.phone 
    };

    this.contactService.addContact(newContact)
      .subscribe( data =>{
        console.log(data);
        this.getContacts();
      });
  }

  deleteContact(id: any) {
    this.contactService.deleteContact(id)
      .subscribe( data => {
        if(data.n == 1){
          for(var i =0; i<this.contacts.length; i++){
            if(this.contacts[i]._id == id)
              this.contacts.splice(i,1);
              this.getContacts();
          }
        }
      });
  }

  onUpdateContactClick(id: any){
    this.UpdateVisible = true;
    this.newContact = this.contacts.find(i => i._id === id);
  }

  updateContact(id: any) {
    this.contactService.updateContact(id, this.newContact)
      .subscribe(data =>{
        if(data.indexOf('Successfully') >= 1){
        this.UpdateVisible = false;
        this.getContacts();
        }
        else{
          alert('Error Updating Contact');
        }
      });
  }
}
