import { ApplicationRef, Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { BooleanLike } from '../models/boolean-like';

@Component({
    selector: 'm-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent extends BaseComponent {
    private textareaElement: HTMLTextAreaElement;
    private readonlyValue: boolean;
    private disabledValue: boolean;

    @ContentChild('textarea')
    public set contentTextareaElement(textarea: HTMLTextAreaElement) {
        this.textareaElement = textarea;
        this.refreshTextarea();
    }

    @Input()
    public name: string;

    public get disabled(): boolean {
        return this.disabledValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set disabled(value: BooleanLike) {
        this.disabledValue = this.toBoolean(value);
        this.refreshTextarea();
    }

    public get readonly(): boolean  {
        return this.readonlyValue;
    }

    @Input()
    @HostBinding('class.disabled')
    public set readonly(value: BooleanLike) {
        this.readonlyValue = this.toBoolean(value);
        this.refreshTextarea();
    }

    @Input()
    @HostBinding('class.error')
    public hasError: boolean;

    @Input()
    public placeholder: string | undefined;

    @Input()
    public value: string | undefined;

    @Input()
    public defaultValue: string | undefined;

    @Output()
    public readonly valueChange = new EventEmitter<string | undefined>();

    @HostBinding('class.textarea')
    // HACK: Currently I do not know a other way to style a textarea with semantic ui
    @HostBinding('class.form')
    public readonly textarea = true;

    public constructor(
        private readonly applicationRef: ApplicationRef
    ) {
        super();
        this.classList.register('disabled', 'readonly', 'hasError');
    }

    public onChange(): void {
        this.value ??= this.defaultValue;
        this.valueChange.emit(this.value);
    }

    public forceChange(): void {
        const value = this.value;
        // Currently no other way available to force rebind.
        // eslint-disable-next-line no-null/no-null
        const tempValue = value === undefined ? null : this.defaultValue;
        this.valueChange.emit(tempValue);
        this.applicationRef.tick();
        this.valueChange.emit(value);
    }

    private refreshTextarea(): void {
        if (!this.textareaElement) {
            return;
        }
        this.textareaElement.disabled = this.disabledValue;
        this.textareaElement.readOnly = this.readonlyValue;
    }
}
