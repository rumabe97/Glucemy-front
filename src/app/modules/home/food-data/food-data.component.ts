import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-data',
  templateUrl: './food-data.component.html',
  styleUrls: ['./food-data.component.scss']
})
export class FoodDataComponent implements OnInit {

  foodItems: any[] = [
    { name: 'Apple', gi: 36 },
    { name: 'White Bread', gi: 75 },
    { name: 'Chicken Breast', gi: 0 },
    { name: 'Lentils', gi: 32 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
