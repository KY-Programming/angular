﻿import { Directive, inject, Input } from '@angular/core';
import { SortedClassesService } from '../services/sorted-classes.service';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';

@Directive({
    selector: '[m-basic]',
    standalone: true
})
export class BasicDirective {
    public static readonly basic = 'basic';
    public static readonly default = { directive: BasicDirective, inputs: [BasicDirective.basic] };
    private readonly classes = inject(SortedClassesService);
    private isBasic: boolean;

    public constructor() {
        this.classes.register(BasicDirective.basic);
    }

    public get basic(): boolean {
        return this.isBasic;
    }

    @Input()
    public set basic(value: BooleanLike) {
        this.isBasic = toBoolean(value);
        this.classes.set(BasicDirective.basic, this.isBasic);
    }
}
