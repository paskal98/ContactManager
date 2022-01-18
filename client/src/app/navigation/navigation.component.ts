import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Output() setShowAllContacts = new EventEmitter<number>()
  @Output() setNewContacts = new EventEmitter<number>()
  @Output() setSettings = new EventEmitter<void>()

  @Input() user:string

  constructor() { }

  ngOnInit(): void {
  }

  setButtonShowAllContacts() {
    this.setShowAllContacts.emit(0);
  }

  setButtonNewContacts() {
    this.setNewContacts.emit(3)
  }

  setButtonSettings() {
        this.setSettings.emit()
  }


}
