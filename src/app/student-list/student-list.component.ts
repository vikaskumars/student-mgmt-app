import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {

  enableEdit: Boolean[] = [];
  selected: number;
  controls: FormArray = new FormArray([]);
  grade: any;
  students: Student[] = [];
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.grade = this.route.snapshot.paramMap.get('grade');
    this.init();
  }

  init() {
    this.students = this.studentService.studentsData.filter((item) => {
      let avgScore =
        (item.english + item.maths + item.science + item.socialStudies) / 4;
      if (this.grade === 'grade1') {
        return avgScore >= 60;
      } else if (this.grade === 'grade2') {
        return avgScore >= 40 && avgScore < 60;
      } else {
        return avgScore < 40;
      }
    });

    const record = this.students.map((student) => {
      this.enableEdit.push(false)
      return new FormGroup({
        _id: new FormControl(student._id),
        name: new FormControl({ value: student.name, disabled: true }, Validators.required),
        age: new FormControl({ value: student.age, disabled: true }, [Validators.required, Validators.min(15), Validators.max(50)]),
        email: new FormControl({ value: student.email, disabled: true }, [Validators.required, Validators.email]),
        english: new FormControl({ value: student.english, disabled: true }, [Validators.required, Validators.min(0), Validators.max(100)]),
        maths: new FormControl({ value: student.maths, disabled: true }, [Validators.required, Validators.min(0), Validators.max(100)]),
        science: new FormControl({ value: student.science, disabled: true }, [Validators.required, Validators.min(0), Validators.max(100)]),
        socialStudies: new FormControl({ value: student.socialStudies, disabled: true }, [Validators.required, Validators.min(0), Validators.max(100)]),
      });
    });
    this.controls = new FormArray(record);
  }

  getControl(index: number, field: string): FormControl {
    return this.controls.at(index).get(field) as FormControl;
  }

  editRecord(index) {
    this.enableEdit[index] = true;
    const controls = ((this.controls.controls[index]) as any).controls;
    for (const field in controls) {
      controls[field].enable();
    }
  }

  cancelRecord(index) {
    const controls = ((this.controls.controls[index]) as any).controls;
    for (const field in controls) {
      controls[field].setValue(this.students[index][field]);
      controls[field].disable();
    }
    this.enableEdit[index] = false;
  }

  saveRecord(index) {
    let flag = true;
    let temp: Student = {} as Student;
    const controls = ((this.controls.controls[index]) as any).controls;

    for (const field in controls) {
      temp[field] = controls[field].value;
      if (controls[field].invalid) {
        flag = false;
        alert("invalid input");
        break;
      } else {
        temp[field] = controls[field].value;
      }
    }

    if (flag) {
      for (const field in controls) {
        controls[field].disable();
      }
      this.studentService.studentsData.forEach((item, i) => {
        if (item._id === temp._id) {
          this.studentService.studentsData[i] = temp;
        }
      });
      this.enableEdit[index] = false;
      // this.init();
    }
  }
}
