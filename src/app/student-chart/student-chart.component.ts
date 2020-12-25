import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType, ChartOptions } from 'chart.js';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  styleUrls: ['./student-chart.component.css'],
})
export class StudentChartComponent {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['grade1', 'grade2', 'grade3'];
  public pieChartData: SingleDataSet = [
    this.getStudentsWithGrade('grade1'),
    this.getStudentsWithGrade('grade2'),
    this.getStudentsWithGrade('grade3'),
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private router: Router, private studentService: StudentService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  getStudentsWithGrade(grade: String): number {
    return this.studentService.studentsData.filter((item) => {
      let avgScore =
        (item.english + item.maths + item.science + item.socialStudies) / 4;
      if (grade === 'grade1') {
        return avgScore >= 60;
      } else if (grade === 'grade2') {
        return avgScore >= 40 && avgScore < 60;
      } else {
        return avgScore < 40;
      }
    }).length/this.studentService.studentsData.length *100;
  }

  chartClicked(event: any) {
    this.router.navigate(['students', event.active[0]._view.label]);
  }
}
