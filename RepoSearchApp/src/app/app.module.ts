import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';
import { RepoService } from './services/repo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    RepoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
