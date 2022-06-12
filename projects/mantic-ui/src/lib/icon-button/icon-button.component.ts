import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { ButtonBaseComponent } from '../base/button-base.component';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';

@Component({
    selector: 'm-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent extends ButtonBaseComponent {
    
    @Input()
    public icon: IconType;
    
    @Input()
    public iconSize: IconSize;

    @Input()
    @HostBinding('class.social')
    public social: string;

    public constructor() {
        super();
        this.classList.register('icon', 'iconSize', 'social').registerFixed('icon');
    }
}
