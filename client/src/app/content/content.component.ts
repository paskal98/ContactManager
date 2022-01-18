import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Contacts, MainData} from "../contactmanager.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnChanges {



  @Output() setShowContact = new EventEmitter<number>()

  @Input() contacts:Contacts[]



  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  updateData(){



  }

  setButtonShowContact(id:number|undefined) {
    this.setShowContact.emit(id)
  }
}
