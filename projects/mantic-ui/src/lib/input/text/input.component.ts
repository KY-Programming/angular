import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputBaseComponent } from '../input-base.component';

export declare type InputIconPosition =
    'left'
    | 'right';

export declare type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'urlweek';

@Component({
    selector: 'm-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent extends InputBaseComponent {
    private typeValue: InputType;

    @Input()
    public value: string | undefined;

    @Input()
    public defaultValue: string | undefined;

    @Input()
    public get type(): InputType {
        return this.typeValue;
    }

    public set type(value: InputType) {
        this.typeValue = value;
        this.isColor = value === 'color';
        if (this.isColor) {
            this.label = { position: 'right' };
        }
    }

    @Input()
    public maxlength: string | number | undefined;

    @Output()
    public readonly valueChange = new EventEmitter<string | undefined>();

    @ContentChild('input')
    protected set contentInputElement(input: ElementRef<HTMLInputElement>) {
        this.unbindEvents();
        this.inputElement = input;
        this.refreshInput();
        this.bindEvents();
        this.refreshFocus();
    }

    @ViewChild('input')
    protected set viewInputElement(input: ElementRef<HTMLInputElement>) {
        this.unbindEvents();
        this.inputElement = input;
        this.bindEvents();
        this.refreshFocus();
    }

    public constructor() {
        super();
        this.classList.register('maxlength');
    }

    public onChange(): void {
        this.value ??= this.defaultValue;
        this.valueChange.emit(this.value);
    }
}
