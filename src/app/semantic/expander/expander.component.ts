import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.scss']
})
export class SemanticExpanderComponent implements OnInit {
  public readonly code1 = `<m-expander header="A header">Content goes here</m-expander>`;
  public readonly code2 = `<m-expander header="A header" expanded>Content goes here</m-expander>`;

  constructor() { }

  ngOnInit(): void {
  }

}