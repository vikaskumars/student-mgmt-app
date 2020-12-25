import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ChartsModule } from 'ng2-charts';
import { StudentService } from '../student.service';

import { StudentListComponent } from './student-list.component';

describe('StudentListComponent', () => {
    let component: StudentListComponent;
    let fixture: ComponentFixture<StudentListComponent>;
    let studentService = {
        studentsData: [{
            "_id": "5fddd95afc6a99910cd89e3c",
            "name": "Olson Lopez",
            "age": 40,
            "email": "olsonlopez@amril.com",
            "english": 66,
            "maths": 35,
            "science": 85,
            "socialStudies": 64
        },
        {
            "_id": "5fddd95a9cac7043fe1abb5f",
            "name": "Guzman Stevenson",
            "age": 20,
            "email": "guzmanstevenson@amril.com",
            "english": 99,
            "maths": 30,
            "science": 0,
            "socialStudies": 66
        },
        {
            "_id": "5fddd95a70d115241eecf8be",
            "name": "Bethany Bryant",
            "age": 33,
            "email": "bethanybryant@amril.com",
            "english": 100,
            "maths": 29,
            "science": 10,
            "socialStudies": 8
        },
        {
            "_id": "5fddd95ac04329ac441a3797",
            "name": "Juanita Brennan",
            "age": 38,
            "email": "juanitabrennan@amril.com",
            "english": 57,
            "maths": 17,
            "science": 54,
            "socialStudies": 0
        }]
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudentListComponent],
            imports: [RouterTestingModule, ChartsModule, ReactiveFormsModule],
            providers: [{ provide: StudentService, useValue: studentService }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate controls formArrya', () => {
        component.grade = 'grade1';
        component.init();
        component.grade = 'grade2';
        component.init();
        expect(component.controls.length).toBeTruthy();
    });

    it('should set enableEdit[index] to true on invoking editRecord(index)', () => {
        component.editRecord(1);
        expect(component.enableEdit[1]).toBeTrue();
    });

    it('should set enableEdit[index] to false on invoking cancelRecord(index)', () => {
        component.cancelRecord(1);
        expect(component.enableEdit[1]).toBeFalse();
    });

    it('should set enableEdit[index] to false on invoking saveRecord(index)', () => {
        const controls = ((component.controls.controls[1]) as any).controls;
        component.saveRecord(1);
        controls['name'].enable();
        controls['name'].setValue('');
        component.saveRecord(1);
        expect(component.enableEdit[1]).toBeFalse();
    });

});
