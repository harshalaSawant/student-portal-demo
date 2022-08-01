import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material Imports */
import { MatTableModule } from '@angular/material/table';
import { GradesDashboardComponent } from './components/grades-dashboard/grades-dashboard.component';
import { GradesDetailComponent } from './components/grades-detail/grades-detail.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableWithFormComponent } from './table-with-form/table-with-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GradesDashboardComponent,
    GradesDetailComponent,
    TableWithFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
