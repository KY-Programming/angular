import { Component, Input } from '@angular/core';
import { ElementBase } from '../base/element-base';

@Component({
  selector: 'm-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent extends ElementBase {

  @Input()
  public src: string;

  public constructor() {
    super();
    this.classList
      .registerFixed('item', Number.MAX_VALUE - 1);
  }
}
