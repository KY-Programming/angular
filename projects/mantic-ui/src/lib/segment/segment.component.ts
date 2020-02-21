import { Component, ElementRef, Input } from '@angular/core';
import { DimmableComponent } from '../base/dimmable.component';
import { DimmableService } from '../services/dimmable.service';

@Component({
  selector: 'm-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  providers: [DimmableService]
})
export class SegmentComponent extends DimmableComponent {

  public static readonly defaults = { raised: false };

  @Input()
  public inverted: boolean;

  @Input()
  public raised: boolean;

  @Input()
  public vertical: boolean;

  @Input()
  public placeholder: boolean;

  @Input()
  public attached: 'top' | 'bottom';

  public constructor(
    elementRef: ElementRef<HTMLElement>,
    dimmableService: DimmableService
  ) {
    super(elementRef, dimmableService);
    this.raised = SegmentComponent.defaults.raised;
    this.classList
      .registerBoolean('inverted')
      .registerBoolean('raised')
      .registerBoolean('vertical')
      .registerBoolean('placeholder')
      .registerAction('attached', (entry, value) => entry.classes = value ? value + ' attached' : '')
      .registerFixed('segment', Number.MAX_VALUE - 1);
  }
}
