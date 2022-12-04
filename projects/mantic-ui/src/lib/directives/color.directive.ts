import { Directive, inject, Input } from '@angular/core';
import { ColorName } from '../models/color';
import { SortedClassesService } from '../services/sorted-classes.service';

@Directive({
    selector: '[-m-color]',
    standalone: true
})
export class ColorDirective {
    public static readonly color = 'color';
    public static readonly default = { directive: ColorDirective, inputs: [ColorDirective.color] };
    private readonly classes = inject(SortedClassesService);
    private colorValue: ColorName;

    public constructor() {
        this.classes.register(ColorDirective.color);
    }

    public get color(): ColorName {
        return this.colorValue;
    }

    @Input()
    public set color(value: ColorName) {
        this.colorValue = value;
        this.classes.set(ColorDirective.color, value);
    }

}
