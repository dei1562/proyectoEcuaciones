import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms' ;

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';

//Angular Material Modules
import{
  MatToolbarModule,
  MatButtonModule,  
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
