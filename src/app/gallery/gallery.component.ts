import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images = [
    "assets/media/gallery1.jpg",
    "assets/media/gallery3.jpg",
    "assets/media/gallery4.jpg",
    "assets/media/gallery5.jpg",
    "assets/media/gallery6.jpg",
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
