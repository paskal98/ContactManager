import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContactManagerService, Contacts} from "../contactmanager.service";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  @Output() setEditContacts= new EventEmitter<Contacts>()
  @Output() setDispalyButtonBackToMain = new EventEmitter<void>()
  @Output() setDispalyButtonBackToMainWithUpdate = new EventEmitter<number>()
  @Output() setDeleteContact = new EventEmitter<void>()

  @Input() contactdata:Contacts

  fullname:string
  work:string

  constructor(private  contactManagerService: ContactManagerService) {

  }

  ngOnInit(): void {
    this.fullname=this.setElementText(this.contactdata.name,this.contactdata.surname,this.contactdata.lastname)
    this.work=this.setElementText(this.contactdata.companyName,this.contactdata.department,this.contactdata.job)
  }

  setElementText(elem1:string,elem2:string,elem3:string,){
    let temp = elem1 + " " + elem2 + " " + elem3
    temp=temp.replace("null null null","")
    temp=temp.replace("null null","")
    temp=temp.replace("null","")
    if(temp.charAt(1)===" ") {temp=temp.replace(" ",'')}
    return temp
  }

  setButtonEditContacts() {
    this.setEditContacts.emit(this.contactdata)
  }

  dispalyButtonBackToMain() {
    this.setDispalyButtonBackToMain.emit()
  }

  isExists(obj: any[]) {
    if ( obj!=undefined && Object.keys(obj).length>0) {  return true}
    return false
  }



  setButtonDeleteContact() {
    this.setDispalyButtonBackToMainWithUpdate.emit(this.contactdata.id)

  }
}
