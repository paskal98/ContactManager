import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LeftbarComponent } from './leftbar/leftbar.component';
import { ContentComponent } from './content/content.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentItemComponent } from './content-item/content-item.component';
import { LeftbarTagitemComponent } from './leftbar-tagitem/leftbar-tagitem.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftbarComponent,
    ContentComponent,
    NavigationComponent,
    ContentItemComponent,
    LeftbarTagitemComponent,
    ShowComponent,
    EditComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
