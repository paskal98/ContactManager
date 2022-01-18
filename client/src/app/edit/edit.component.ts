import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
  Address,
  ContactManagerService,
  Contacts,
  Emails,
  Phones,
  SoclialLinks,
  Tags,
  User
} from "../contactmanager.service";

enum TypeInput{
  PHONE,
  EMAIL,
  SOCIAL_LINK,
  ADDRESS,
  TAG
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Output()   setBackButtonShowProfile = new EventEmitter<number>()
  @Output()   setCreatedContact = new EventEmitter<Contacts>()

  @Input() editData:Contacts

  @ViewChild("nameRef",{static:false}) name: ElementRef
  @ViewChild("surnameRef",{static:false}) surname: ElementRef
  @ViewChild("lastnameRef",{static:false}) lastname: ElementRef
  @ViewChild("companyNameRef",{static:false}) companyName:  ElementRef
  @ViewChild("departmentRef",{static:false}) department:  ElementRef
  @ViewChild("jobRef",{static:false}) job:  ElementRef
  @ViewChild("birthdayRef",{static:false}) birthday:  ElementRef


  isDataExists:boolean=false

  inputsCountPhones:number=0;
  inputsCountEmails:number=0;
  inputsCountSocial:number=0;
  inputsCountAddr:number=0;
  inputsCountTags:number=0;


  phones:Phones[]=[]
  emails:Emails[]=[]
  socialLinks:SoclialLinks[]=[]
  address:Address[]=[]
  tags:Tags[]=[]

  phonesToUpdate:Phones[]=[]
  emailsToUpdate:Emails[]=[]
  socialLinksToUpdate:SoclialLinks[]=[]
  addressToUpdate:Address[]=[]
  tagsToUpdate:Tags[]=[]


  constructor(private  contactManagerService: ContactManagerService) { }


  ngOnInit(): void {
   this.setIsDataExist()
    this.setDataToUpdate()
  }


  backButtonShowProfile($event:number) {
    this.setBackButtonShowProfile.emit($event)
  }

  setIsDataExist(){
    if(Object.keys(this.editData).length!=0){this.isDataExists=true}
    else {this.isDataExists=false}
  }

  setDataToUpdate(){
    if(Object.keys(this.editData).length>0)
    {
      this.editData.phones.forEach(val => this.phonesToUpdate.push(Object.assign({}, val)))
      this.editData.emails.forEach(val => this.emailsToUpdate.push(Object.assign({}, val)))
      this.editData.socialLinks.forEach(val => this.socialLinksToUpdate.push(Object.assign({}, val)))
      this.editData.address.forEach(val => this.addressToUpdate.push(Object.assign({}, val)))
      this.editData.tags.forEach(val => this.tagsToUpdate.push(Object.assign({}, val)))
    }
  }


  createRange(range:number){
    let arr:number[]=[]
    for (let i=0;i<=range;i++){
      arr.push(i);
    }
    return arr
  }

  addNewInput(type: number, count:number,$event: any) {
    switch (type) {
      case TypeInput.PHONE:
        if($event.target.value && count==this.inputsCountPhones){
          this.phones.push({phone:$event.target.value})
          this.inputsCountPhones++
        } else if($event.target.value=="" ){
          this.phones.splice($event.target.getAttribute("data-index"),1)
          this.inputsCountPhones--
        }
        break;
      case TypeInput.EMAIL:
        if($event.target.value && count==this.inputsCountEmails){
          this.emails.push({email:$event.target.value})
          this.inputsCountEmails++
        } else if($event.target.value=="" ){
          this.emails.splice($event.target.getAttribute("data-index"),1)
          this.inputsCountEmails--
        }
        break;
      case TypeInput.SOCIAL_LINK:
        if($event.target.value && count==this.inputsCountSocial){
          this.socialLinks.push({socialLink:$event.target.value})
          this.inputsCountSocial++
        } else if($event.target.value=="" ){
          this.socialLinks.splice($event.target.getAttribute("data-index"),1)
          this.inputsCountSocial--
        }
        break;
      case TypeInput.ADDRESS:
        if($event.target.value && count==this.inputsCountAddr){

          let elm = $event.target.closest(".app-edit__main__content__row__wrap").getElementsByClassName("closest")

          this.address.push({addressLink:$event.target.value, addressName:elm[elm.length-1].value})

          this.inputsCountAddr++
        } else if($event.target.value=="" ){
          this.address.splice($event.target.getAttribute("data-index"),1)
          this.inputsCountAddr--
        }
        break;
      case TypeInput.TAG:
        if($event.target.value && count==this.inputsCountTags){
          this.tags.push({tag:$event.target.value, color:$event.target.closest(".app-edit__main__content__row__wrap__tagwrap").children[0].value})
          this.inputsCountTags++
        } else if($event.target.value=="" ){
          this.tags.splice($event.target.getAttribute("data-index"),1)
          this.inputsCountTags--
        }
        break;

    }

  }

  changeEditInput(type:number,index:number,$event: any) {

      let c=0

      switch (type) {
        case TypeInput.PHONE:

            for (let i of this.phonesToUpdate) {
              if (c == index) {
                if ($event.target.value == "") {
                  this.phonesToUpdate = this.phonesToUpdate.filter(f => f.id != i.id)
                  console.log(this.phonesToUpdate)
                } else {
                  // @ts-ignore
                  (this.phonesToUpdate.find(f=>f.id == i.id)).phone = $event.target.value
                }
                c = 0
                break;
              }
              c++;
            }

          break;
        case TypeInput.EMAIL:
          for (let i of this.emailsToUpdate) {
            if (c==index){
              if ($event.target.value == "") {
                this.emailsToUpdate = this.emailsToUpdate.filter(f => f.id != i.id)
              } else {
                // @ts-ignore
                (this.emailsToUpdate.find(f=>f.id == i.id)).email = $event.target.value
              }
              c=0
              break;
            }
            c++;
          }
          break;
        case TypeInput.SOCIAL_LINK:
          for (let i of this.socialLinksToUpdate) {
            if (c==index){
              if ($event.target.value == "") {
                this.socialLinksToUpdate = this.socialLinksToUpdate.filter(f => f.id != i.id)
              }else {
                // @ts-ignore
                (this.socialLinksToUpdate.find(f=>f.id == i.id)).socialLink = $event.target.value
              }
              c=0
              break;
            }
            c++;
          }
          break;
        case TypeInput.ADDRESS:
          for (let i of this.addressToUpdate) {
            if (c==index){
              if ($event.target.value == "") {
                this.addressToUpdate=this.addressToUpdate.filter(f=> f.id!=i.id)
              }else {

                if($event.target.classList[1]==="closest"){
                  // @ts-ignore
                  (this.addressToUpdate.find(f=>f.id == i.id)).addressName = $event.target.value
                } else {
                  // @ts-ignore
                  (this.addressToUpdate.find(f=>f.id == i.id)).addressLink = $event.target.value
                }

              }
              c=0
              break;
            }
            c++;
          }
          break;
        case TypeInput.TAG:
          for (let i of this.tagsToUpdate) {
            if (c==index){
              if ($event.target.value == "") {
                this.tagsToUpdate=this.tagsToUpdate.filter(f=> f.id!=i.id)
              }else {

                if($event.target.classList[0]==="app-edit__main__content__row__wrap__tagwrap__pallette"){
                  // @ts-ignore
                  (this.tagsToUpdate.find(f=>f.id == i.id)).color = $event.target.value
                } else {
                  // @ts-ignore
                  (this.tagsToUpdate.find(f=>f.id == i.id)).tag = $event.target.value
                }

              }
              c=0
              break;
            }
            c++;
          }
          break;
      }





  }



  saveOrUpdateDataContact($event: any) {
    if(!$event.target.value){
      //post

      if (!this.name.nativeElement.value && !this.surname.nativeElement.value && !this.lastname.nativeElement.value){
        alert("cant create contact without name")
        return
      }

      let data= {} as Contacts
      data= {
        name: this.name.nativeElement.value,
        surname: this.surname.nativeElement.value,
        lastname: this.lastname.nativeElement.value,
        companyName: this.companyName.nativeElement.value,
        department: this.department.nativeElement.value,
        job: this.job.nativeElement.value,
        birthday: this.birthday.nativeElement.value,
        phones: this.phones,
        emails: this.emails,
        socialLinks: this.socialLinks,
        address: this.address,
        tags: this.tags
      }




      this.setCreatedContact.emit(data);


    } else {
      this.editData.name= this.name.nativeElement.value
      this.editData.surname= this.surname.nativeElement.value
      this.editData.lastname= this.lastname.nativeElement.value
      this.editData.companyName= this.companyName.nativeElement.value
      this.editData.department= this.department.nativeElement.value
      this.editData.job= this.job.nativeElement.value
      this.editData.birthday= this.birthday.nativeElement.value

      this.editData.phones=this.phonesToUpdate
      this.editData.emails=this.emailsToUpdate
      this.editData.socialLinks=this.socialLinksToUpdate
      this.editData.address=this.addressToUpdate
      this.editData.tags=this.tagsToUpdate

      for (let item of this.phones) { this.editData.phones.push(item) }
      for (let item of this.emails) { this.editData.emails.push(item) }
      for (let item of this.socialLinks) { this.editData.socialLinks.push(item) }
      for (let item of this.address) { this.editData.address.push(item) }
      for (let item of this.tags) { this.editData.tags.push(item) }


      this.contactManagerService.updateContact(this.editData)




    }
  }
}
