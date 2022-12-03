import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Key } from '../../models/key';
import { BooleanLike } from '../../models/boolean-like';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { InvertibleComponent } from '../../base/invertible.component';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'm-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends InvertibleComponent {
    public static readonly defaults = {
        checkIcon: <IconType>'check',
        checkIconSize: <IconSize>'small',
        indeterminateIcon: <IconType>'minus',
        indeterminateIconSize: <IconSize>'small',
        inverted: false,
        invertedChange: new ReplaySubject<boolean>(1)
    };
    private nameValue: string;
    private labelValue: string;
    private isChecked: boolean;
    private isReadonly: boolean;
    private isIndeterminate: boolean;
    private isDisabled: boolean;
    protected readonly defaults = CheckboxComponent.defaults;

    @Input()
    public get value(): boolean {
        return this.isChecked;
    }

    public set value(value: BooleanLike) {
        this.isChecked = this.toBoolean(value);
    }

    @Output()
    public readonly valueChange = new EventEmitter<boolean>();

    @Input()
    public get name(): string {
        return this.nameValue;
    }

    public set name(value: string) {
        this.nameValue = value;
        this.classList.set('name', value);
    }

    @Input()
    public get label(): string {
        return this.labelValue;
    }

    public set label(value: string) {
        this.labelValue = value;
        this.classList.set('label', value);
    }

    @Input()
    @HostBinding('class.checked')
    public get checked(): boolean {
        return this.isChecked;
    }

    public set checked(value: BooleanLike) {
        this.isChecked = this.toBoolean(value);
    }

    @Output()
    public readonly checkedChange = this.valueChange;

    @Input()
    @HostBinding('class.read-only')
    public get readonly(): boolean {
        return this.isReadonly;
    }

    public set readonly(value: BooleanLike) {
        this.isReadonly = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.indeterminate')
    public get indeterminate(): boolean {
        return this.isIndeterminate;
    }

    public set indeterminate(value: BooleanLike) {
        this.isIndeterminate = this.toBoolean(value);
    }

    @Output()
    public readonly indeterminateChange = this.valueChange;

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean {
        return this.isDisabled;
    }

    public set disabled(value: BooleanLike) {
        this.isDisabled = this.toBoolean(value);
    }

    @Input()
    public canUncheck = true;

    @Input()
    public checkIcon?: IconType;

    @Input()
    public checkIconSize?: IconSize;

    @Input()
    public indeterminateIcon?: IconType;

    @Input()
    public indeterminateIconSize?: IconSize;

    @HostBinding('class.checkbox')
    public readonly checkbox = true;

    public constructor() {
        super();
        this.classList.register('readonly', 'indeterminate', 'disabled', 'fitted', 'checked', 'value', 'name', 'label');
        CheckboxComponent.defaults.invertedChange.pipe(takeUntil(this.destroy)).subscribe(value => this.refreshInverted(value));
    }

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        if (event.target instanceof HTMLInputElement || this.readonly || this.disabled) {
            return;
        }
        this.set(!this.value);
    }

    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (this.readonly || this.disabled || !Key.space.is(event)) {
            return;
        }
        event.preventDefault();
        this.set(!this.value);
    }

    public set(value: boolean): void {
        if (!value && !this.canUncheck) {
            return;
        }
        this.indeterminate = false;
        if (this.value !== value) {
            this.value = value;
            this.onChange();
        }
        this.refreshClasses();
    }

    public onChange(): void {
        this.valueChange.emit(this.isChecked);
    }

    public onInputValueChange(event: Event): void {
        this.set((event.target as HTMLInputElement).checked);
    }

}