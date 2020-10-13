import { Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ElementBase } from '../base/element-base';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { InputComponent } from '../input/input.component';
import { FieldSize, fieldSizes } from '../models/field-size';
import { FormError } from '../models/form-error';
import { FormValidation } from '../models/form-validation';
import { RadioComponent } from '../radio/radio.component';
import { SliderComponent } from '../slider/slider.component';
import { TextareaComponent } from '../textarea/textarea.component';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'm-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent extends ElementBase {
  private labelElementValue: HTMLLabelElement;
  private inputComponentValue: InputComponent;
  private checkboxComponentValue: CheckboxComponent;
  private sliderComponentValue: SliderComponent;
  private toggleComponentValue: ToggleComponent;
  private radioComponentValue: RadioComponent;
  private textareaComponentValue: TextareaComponent;
  private nameValue: string;
  private labelValue: string;
  private sizeValue: FieldSize;
  private disabledValue: boolean;
  private readonlyValue: boolean;
  private errorValue: boolean;
  private hideInitialErrorValue = true;

  public wasAnytimeValid = false;
  public readonly errors: FormError[] = [];

  @ContentChild('labelElement', { static: false })
  public set labelElement(value: HTMLLabelElement) {
    this.labelElementValue = value;
    if (this.labelElementValue) {
      this.labelElementValue.setAttribute('for', this.name);
    }
  }
  public get labelElement(): HTMLLabelElement {
    return this.labelElementValue;
  }

  @ContentChild(InputComponent, { static: false })
  public set inputComponent(value: InputComponent) {
    this.inputComponentValue = value;
    if (this.inputComponentValue) {
      this.inputComponentValue.for = this.name;
      this.inputComponentValue.name = this.name;
      this.inputComponentValue.readonly = this.readonly;
      this.inputComponentValue.disabled = this.disabled;
    }
  }
  public get inputComponent(): InputComponent {
    return this.inputComponentValue;
  }

  @ContentChild(CheckboxComponent, { static: false })
  public set checkboxComponent(value: CheckboxComponent) {
    this.checkboxComponentValue = value;
    if (this.checkboxComponentValue) {
      this.checkboxComponentValue.name = this.name;
      this.checkboxComponentValue.label = this.label;
      this.checkboxComponentValue.readonly = this.readonly;
      this.checkboxComponentValue.disabled = this.disabled;
    }
  }
  public get checkboxComponent(): CheckboxComponent {
    return this.checkboxComponentValue;
  }

  @ContentChild(SliderComponent, { static: false })
  public set sliderComponent(value: SliderComponent) {
    this.sliderComponentValue = value;
    if (this.sliderComponentValue) {
      this.sliderComponentValue.name = this.name;
      this.sliderComponentValue.label = this.label;
      this.sliderComponentValue.readonly = this.readonly;
      this.sliderComponentValue.disabled = this.disabled;
    }
  }
  public get sliderComponent(): SliderComponent {
    return this.sliderComponentValue;
  }

  @ContentChild(ToggleComponent, { static: false })
  public set toggleComponent(value: ToggleComponent) {
    this.toggleComponentValue = value;
    if (this.toggleComponentValue) {
      this.toggleComponentValue.name = this.name;
      this.toggleComponentValue.label = this.label;
      this.toggleComponentValue.readonly = this.readonly;
      this.toggleComponentValue.disabled = this.disabled;
    }
  }
  public get toggleComponent(): ToggleComponent {
    return this.toggleComponentValue;
  }

  @ContentChild(RadioComponent, { static: false })
  public set radioComponent(value: RadioComponent) {
    this.radioComponentValue = value;
    if (this.radioComponentValue) {
      this.radioComponentValue.name = this.name;
      this.radioComponentValue.label = this.label;
      this.radioComponentValue.readonly = this.readonly;
      this.radioComponentValue.disabled = this.disabled;
    }
  }
  public get radioComponent(): RadioComponent {
    return this.radioComponentValue;
  }

  @ContentChild(TextareaComponent, { static: false })
  public set textareaComponent(value: TextareaComponent) {
    this.textareaComponentValue = value;
    if (this.textareaComponentValue) {
      this.textareaComponentValue.name = this.name;
      // this.textareaComponentValue.label = this.label;
      this.textareaComponentValue.readonly = this.readonly;
      this.textareaComponentValue.disabled = this.disabled;
    }
  }
  public get textareaComponent(): TextareaComponent {
    return this.textareaComponentValue;
  }

  @Input()
  public set name(value: string) {
    this.nameValue = value;
    if (this.labelElement) {
      this.labelElement.setAttribute('for', value);
    }
    if (this.inputComponent) {
      this.inputComponent.for = value;
      this.inputComponent.name = value;
    }
    if (this.checkboxComponent) {
      this.checkboxComponent.name = value;
    }
    if (this.sliderComponent) {
      this.sliderComponent.name = value;
    }
    if (this.toggleComponent) {
      this.toggleComponent.name = value;
    }
    if (this.radioComponent) {
      this.radioComponent.name = value;
    }
    if (this.textareaComponent) {
      this.textareaComponent.name = value;
    }
  }
  public get name(): string {
    return this.nameValue;
  }

  @Input()
  public set label(value: string) {
    this.labelValue = value;
    if (this.checkboxComponent) {
      this.checkboxComponent.label = value;
    }
    if (this.sliderComponent) {
      this.sliderComponent.label = value;
    }
    if (this.toggleComponent) {
      this.toggleComponent.label = value;
    }
    if (this.radioComponent) {
      this.radioComponent.label = value;
    }
    if (this.textareaComponent) {
      // this.textareaComponent.label = value;
    }
  }
  public get label(): string {
    return this.labelValue;
  }

  @Input()
  public set size(value: FieldSize) {
    const sizeNumber = value ? parseInt(value.toString()) : undefined;
    if (sizeNumber && !Number.isNaN(sizeNumber)) {
      this.sizeValue = fieldSizes[value];
    } else {
      this.sizeValue = value;
    }
  }
  public get size(): FieldSize {
    return this.sizeValue;
  }

  @Input()
  public set error(value: boolean) {
    if (this.errorValue === value) {
      return;
    }
    this.errorValue = value;
    this.visibleError = value;
    this.errorChange.emit(value);
  }

  public get error(): boolean {
    return this.errorValue;
  }

  public visibleError: boolean;

  @Input()
  public set valid(value: boolean | FormValidation) {
    const oldError = this.error;
    const newError = typeof value === 'boolean' ? !value : value && !value.valid;
    this.errors.length = 0;
    if (newError) {
      const message = typeof value === 'boolean' ? '' : value.message;
      const label = typeof value === 'boolean' ? this.label : value.label === undefined ? this.label : value.label;
      this.errors.push({ message, label });
    }
    if (newError !== oldError) {
      this.error = newError;
      this.refreshClasses();
    }
    if (!this.error) {
      this.wasAnytimeValid = true;
    }
    else if (this.hideInitialError && !this.wasAnytimeValid) {
      this.visibleError = false;
    }
  }

  @Input()
  public set disabled(value: boolean) {
    this.disabledValue = value;
    if (this.inputComponent) {
      this.inputComponent.disabled = value;
    }
    if (this.checkboxComponent) {
      this.checkboxComponent.disabled = value;
    }
    if (this.toggleComponent) {
      this.toggleComponent.disabled = value;
    }
    if (this.sliderComponent) {
      this.sliderComponent.disabled = value;
    }
    if (this.radioComponent) {
      this.radioComponent.disabled = value;
    }
    if (this.textareaComponent) {
      this.textareaComponent.disabled = value;
    }
  }
  public get disabled(): boolean {
    return this.disabledValue;
  }

  @Input()
  public set readonly(value: boolean) {
    this.readonlyValue = value;
    if (this.inputComponent) {
      this.inputComponent.readonly = value;
    }
    if (this.checkboxComponent) {
      this.checkboxComponent.readonly = value;
    }
    if (this.toggleComponent) {
      this.toggleComponent.readonly = value;
    }
    if (this.sliderComponent) {
      this.sliderComponent.readonly = value;
    }
    if (this.radioComponent) {
      this.radioComponent.readonly = value;
    }
    if (this.textareaComponent) {
      this.textareaComponent.readonly = value;
    }
  }
  public get readonly(): boolean {
    return this.readonlyValue;
  }

  @Input()
  public inline: boolean;

  @Input()
  public set hideInitialError(value: boolean) {
    this.hideInitialErrorValue = value;
  }

  public get hideInitialError(): boolean {
    return this.hideInitialErrorValue;
  }

  @Output()
  public readonly errorChange = new EventEmitter<boolean>();

  public constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
    this.ui = false;
    this.classList
      .register('size')
      .registerAction('size', (entry, value) => entry.isActive = !!value, undefined, 'wide')
      .registerBoolean('visibleError', 'error')
      .ignore('error')
      .registerBoolean('disabled')
      .registerBoolean('readonly')
      .registerBoolean('inline')
      .registerFixed('field', Number.MAX_VALUE - 1);
  }

  public forceValidation(): void {
    this.wasAnytimeValid = true;
    this.visibleError = this.error;
    this.refreshClasses();
  }
}
