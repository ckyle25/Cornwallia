import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'food-home',
  templateUrl: './food-home.component.html',
  styleUrls: ['./food-home.component.scss']
})
export class FoodHomeComponent implements OnInit {

  myControl = new FormControl();
  filteredFoodOptions: Observable<string[]>;
  foodOptions: string[] = ['Salad', 'Green Beans', 'Tater Tots', 'Fat Boys', 'Chicken Noodle Soup', 'Cream of Chicken Soup', 'Tomatoes', 'Pork Shoulder', 'Pork Ribs', 'Frozen Pizza'];

  constructor() { }

  ngOnInit() {
    this.filteredFoodOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.foodOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
