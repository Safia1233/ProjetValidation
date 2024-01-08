import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
@Input() coursInput:any
  constructor() { }

  ngOnInit(): void {
  }

}
