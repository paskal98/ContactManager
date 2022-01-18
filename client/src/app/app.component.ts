import {Component, OnChanges, OnInit} from '@angular/core';
import {
  Contacts,
  Address,
  Emails,
  Phones,
  SoclialLinks,
  Tags,
  MainData,
  ContactManagerService, User
} from "./contactmanager.service";
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from "@angular/common/http";
import {catchError, delay, throwError} from "rxjs";


export enum Window {
  DEFAULT,
  SHOW,
  EDIT,
  NEW
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  isUserLoged:boolean=false




  contact:Contacts[]=[]

  window=Window.DEFAULT

  showContact:Contacts
  toEdit:Contacts

  statusDataLoaded:boolean=false

  username:string


  constructor(private  contactManagerService: ContactManagerService, private cookiesService: CookieService) {

    if(this.cookiesService.get("user")!="" && this.cookiesService.get("pass")!=""){

      this.contactManagerService.setCurrentUser(this.cookiesService.get( 'user' ),this.cookiesService.get( 'pass' ))
        .subscribe(user=>{
          console.log("this.currentUser")
          console.log(user)
          this.isUserLoged=true
          this.updateData()
        }, error => {
          this.isUserLoged=false
        })

    }

    console.log(this.cookiesService.get("user"))


  }

  ngOnInit(): void {



    if(this.isUserLoged){
      this.updateData()
    }

  }




  onSetShowAllContacts($event: number) {
    this.setWindowStatus($event)
  }


  onSetNewContact($event: number) {
    this.setWindowStatus($event)
    this.toEdit = {} as Contacts
  }


  onSetShowContact($event: number) {
    this.showContact=this.contact.filter(map=>map.id===$event)[0]
    this.setWindowStatus(1)
  }

  updateData(){

    this.statusDataLoaded=false;
    this.contactManagerService.getAllContacts()
      .subscribe(res=>{
        this.contact=res
        this.statusDataLoaded=true
      })

  }

  setWindowStatus(status:number){

    switch (status) {
      case 0:
        this.window=Window.DEFAULT
        break;
      case 1:
        this.window=Window.SHOW
        break;
      case 2:
        this.window=Window.EDIT
        break;
      case 3:
        this.window=Window.NEW
        break;
    }


  }


  onSetEditContacts($event: Contacts) {
    this.toEdit=$event
    this.setWindowStatus(3)
  }

  onSetBackButtonShowProfile($event: number) {
    this.setWindowStatus($event)
  }

  onCreatedContact($event: Contacts) {

    this.statusDataLoaded=false;
    this.contactManagerService.addNewContact($event)
      .pipe(
      catchError(error=>{
        console.log(error)
        return throwError(error)
      })
    ).subscribe(res=>{

      $event.id=parseInt(res.msg)

      this.contact.push($event)
      this.statusDataLoaded=true
      this.setWindowStatus(0)
    })





  }

  onDeleteContact($event: number) {
    this.contact=this.contact.filter(f=> f.id!=$event)
    this.contactManagerService.deleteContact($event);
    this.setWindowStatus(0)
  }


  getAuthLogIn(usr :User){
    this.contactManagerService.setCurrentUser(usr.username,usr.password)
      .subscribe(user=>{
        console.log("this.currentUser")
        console.log(user)
        this.username=user.username
        this.isUserLoged=true

        const date:Date=new Date()
        date.setSeconds(date.getSeconds()+600)

        this.cookiesService.set( 'user', user.username,date )
        this.cookiesService.set( 'pass', user.password,date )
        this.updateData()
      }, error => {
        this.isUserLoged=false
      })
  }

  onLogIn($event: User) {
    this.getAuthLogIn($event)
  }

  onSignUp($event: User) {


    this.contactManagerService.signUp($event)
      .subscribe( res=>{

        console.log(res)

        if(res.status==200){

         console.log("ok")

        } else {
          console.log(res.msg)
        }

        })

  }


  onSetSettings() {

    this.cookiesService.deleteAll();
    this.contact={} as Contacts[]
    this.isUserLoged=false
    this.contactManagerService.logOut()
      .subscribe(res=>{

      })
  }


  onSignUpVerif($event: string) {
      this.contactManagerService.signUpVerif($event).subscribe(
        res=>{
         console.log(res)
        })
  }


}
