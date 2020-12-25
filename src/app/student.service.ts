import { Injectable } from '@angular/core';

import * as studentsData from '../assets/students-data.json';
import { Student } from './student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentsData:Student[];
  grade: String = '';
  constructor() {
    this.studentsData = (studentsData as any).default as [Student];
  }
}
