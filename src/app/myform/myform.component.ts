import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-myform',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './myform.component.html',
  styleUrl: './myform.component.css',
})
export class MyformComponent implements OnInit {
  myformgrp: FormGroup;
  constructor(private fb: FormBuilder) {
    //initilaise form arry
    this.myformgrp = this.fb.group({
      items: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.additems(0);
  }

  get items(): FormArray {
    return this.myformgrp.get('items') as FormArray;
  }
  getitem() {
    const item = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
    return item;
  }
  additems(index: number) {
    // this.items.splice(index, 0, item);
    const item = this.getitem();
    this.items.insert(index + 1, item);
  }
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.myformgrp);
    // Handle form submission logic
  }
}
