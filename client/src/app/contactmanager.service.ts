

import {Injectable, OnChanges, OnInit} from "@angular/core";
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";



export interface Address{
  id?:number
  addressLink:string
  addressName:string
}

export interface Tags{
  id?:number
  tag:string
  color:string
}

export interface Phones{
  id?:number
  phone:string
}

export interface Emails{
  id?:number
  email:string
}

export interface SoclialLinks{
  id?:number
  socialLink:string
}

export interface Contacts{
  id?:number,
  name:string,
  surname:string,
  lastname:string,
  companyName: string,
  department: string,
  job: string,
  birthday: string,
  address:Address[],
  tags:Tags[],
  phones:Phones[],
  emails:Emails[],
  socialLinks:SoclialLinks[]

}

export interface User{
  id?:number
  username:string
  password:string
  roles?:string
  firstName?:string
  emailId?:string
  isEnabled?:boolean
}




export interface MainData{
  id?:number,
  name:string,
  surname:string,
  lastname:string,
  companyName: string,
  department: string,
  job: string,
  phones:Phones[],
  emails:Emails[],
  socialLinks:SoclialLinks[]

}

@Injectable({providedIn:'root'})
export class ContactManagerService implements OnInit{


   httpOptions = {}

  private currentUser: User;
   private  isUserLOged:boolean=false

  constructor(private http:HttpClient, ) {

  }


  ngOnInit(): void {

  }


  getCurrentUser(){
    this.http.get<User>("http://localhost:8080/auth/user",this.httpOptions)
      .subscribe(user=>{
        console.log(user)
      })
  }

  setCurrentUser(user:string, pass:string){
     this.httpOptions={
       headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'Authorization': 'Basic ' + btoa(`${user}:${pass}`),
         'Access-Control-Allow-Origin':'*',
         'Access-Control-Allow-Methods':'DELETE, POST, GET, PUT,OPTIONS',
         'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'

       })
     }


    return this.http.get<User>("http://localhost:8080/auth/user",this.httpOptions)
      .pipe(
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )


  }

  getAllContacts(): Observable<Contacts[]>{
    return this.http.get<Contacts[]>("http://localhost:8080/api/contacts",this.httpOptions)

  }

  addNewContact(body:Contacts): Observable<any>{
    return this.http.post("http://localhost:8080/api/contacts", body,this.httpOptions)

  }

  updateContact(body:Contacts){
    this.http.put("http://localhost:8080/api/contacts", body,this.httpOptions).subscribe();
  }

  deleteContact(id:number| undefined){
    if(typeof (id)!=undefined){
      this.http.delete("http://localhost:8080/api/contacts/"+id,this.httpOptions).subscribe();
    }
  }

  logOut():Observable<any>{
    return this.http.get<any>("http://localhost:8080/auth/logout",this.httpOptions)

      .pipe(
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )
  }

  signUp(body:User): Observable<any>{

     console.log(this)
    return this.http.post("http://localhost:8080/auth/signup", body)
      .pipe(
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )

  }

  signUpVerif(token:string): Observable<any>{


    return this.http.get("http://localhost:8080/auth/confirm-account/"+token)
      .pipe(
        catchError(err => {
          console.log(err)
          return throwError(err)
        })
      )

  }



}
