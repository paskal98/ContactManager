import {Component, Input, OnInit} from '@angular/core';
import {Contacts} from "../contactmanager.service";

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})
export class ContentItemComponent implements OnInit {

  @Input() info:Contacts

  fullname:string
  work:string

  phone:string

  constructor() { }

  ngOnInit(): void {
    this.updateData()
  }

  updateData(){
    this.fullname=this.setElementText(this.info.name,this.info.surname,this.info.lastname)
    this.work=this.setElementText(this.info.companyName,this.info.department,this.info.job)
    if(Object.keys(this.info.phones).length>0) { this.phone = this.info.phones[0].phone}
  }

  setElementText(elem1:string,elem2:string,elem3:string,){
    let temp = elem1 + " " + elem2 + " " + elem3
    temp=temp.replace("null null null","")
    temp=temp.replace("null null","")
    temp=temp.replace("null","")
    if(temp.charAt(1)===" ") {temp=temp.replace(" ",'')}
    if(temp.length>28){temp=temp.substring(0,27); temp+="..."}
    return temp
  }



}
