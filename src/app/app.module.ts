import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { PagesComponent } from './pages/pages.component';
import { ImagePipe } from './pipes/image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    ImagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    AuthModule
  ],
  exports:[
    PagesComponent,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
