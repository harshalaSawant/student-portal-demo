import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableHoverDirective } from './directives/table-hover.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';

/* Angular Material Imports */
import { MatTableModule } from '@angular/material/table';
import { GradesDashboardComponent } from './components/grades-dashboard/grades-dashboard.component';
import { GradesDetailComponent } from './components/grades-detail/grades-detail.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    AppComponent,
    TableHoverDirective,
    MainComponent,
    GradesDashboardComponent,
    GradesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
