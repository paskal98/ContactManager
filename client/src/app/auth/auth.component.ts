import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../contactmanager.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Output() logIn= new EventEmitter<User>()
  @Output() signUp =new  EventEmitter<any>()
  @Output() signUpVerif =new  EventEmitter<string>()

  @ViewChild("usernameRef",{static:false}) username: ElementRef
  @ViewChild("passwordRef",{static:false}) password: ElementRef
  @ViewChild("emaildRef",{static:false}) email: ElementRef
  @ViewChild("namedRef",{static:false}) name: ElementRef
  @ViewChild("verifRef",{static:false}) verifCode: ElementRef

  isSignUp:boolean=false
  isSignUpVerif:boolean=false

  constructor() { }

  ngOnInit(): void {
  }

  setLogIn() {
    this.isSignUpVerif=false
    this.logIn.emit({
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value,
      roles: "ROLE_USER"
    })

  }


  setPreSignUp() {
    this.isSignUp=true
  }

  setVerifSignUp() {
    this.isSignUp=false

    this.signUp.emit( {
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value,
      emailId:this.email.nativeElement.value,
      firstName:this.name.nativeElement.value,
      roles: "ROLE_USER"
    } as User )

    this.isSignUpVerif=true


  }


  setSignUp(){
      this.signUpVerif.emit(this.verifCode.nativeElement.value)
      this.isSignUpVerif=false
  }


}
