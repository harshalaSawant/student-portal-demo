import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradesDashboardComponent } from './components/grades-dashboard/grades-dashboard.component';
import { GradesDetailComponent } from './components/grades-detail/grades-detail.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: GradesDashboardComponent },
      { path: 'gradesDetail/:id', component: GradesDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
