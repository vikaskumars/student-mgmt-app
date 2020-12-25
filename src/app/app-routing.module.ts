import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentChartComponent } from './student-chart/student-chart.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  { path: 'chart', component: StudentChartComponent },
  { path: 'students/:grade', component: StudentListComponent },
  { path: '**',   redirectTo: '/chart', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
