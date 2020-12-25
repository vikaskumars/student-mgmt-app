import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { StudentChartComponent } from './student-chart.component';

describe('StudentChartComponent', () => {
  let component: StudentChartComponent;
  let fixture: ComponentFixture<StudentChartComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentChartComponent ],
      imports: [ChartsModule, ReactiveFormsModule],
      providers:[{ provide: Router, useValue: router }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router navigate method on click of chart', () => {
    component.chartClicked({active:[{_view:{label:"grade1"}}]});
    expect(router.navigate).toHaveBeenCalledWith(['students','grade1']);
  });

});
