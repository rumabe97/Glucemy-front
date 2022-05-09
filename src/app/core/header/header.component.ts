import { Component, OnInit } from '@angular/core';
import {navConfig} from "./config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  config = navConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
