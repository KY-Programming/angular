import { Component, ElementRef, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'm-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent extends BaseComponent {

  @Input()
  public ignored: boolean;

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.classList
      .registerBoolean('ignored')
      .registerFixed('info', Number.MAX_VALUE - 2)
      .registerFixed('message', Number.MAX_VALUE - 1);
  }

}
