import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    {
      name: "Men's Cut",
      price: 40
    },
    {
      name: "Beard Trim",
      price: 40
    },
    {
      name: "Men's Cut and Beard Trim",
      price: 40
    },
    {
      name: "Men's Cut and Shave",
      price: 40
    },
    {
      name: "Shave",
      price: 40
    },
    {
      name: "Clipper Cut",
      price: 40
    },
    {
      name: "Kid's Cut (10 and under)",
      price: 40
    },
    {
      name: "Women's Cut",
      price: 40
    },
    {
      name: "Clipper Cut and Beard Trim",
      price: 40
    },
    {
      name: "Men's Long Hair Cut",
      price: 40
    },
    {
      name: "Head Shave and Face Shave",
      price: 40
    },
    {
      name: "Men's Long Hair and Beard Trim",
      price: 40
    },
    {
      name: "Head Shave and Beard Trim",
      price: 40
    }
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
