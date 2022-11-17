﻿import { Directive, ElementRef, inject, Inject, OnInit, Optional } from '@angular/core';
import { DestroyableComponent } from './destroyable.component';
import { ClassList } from '../models/class-list';
import { takeUntil } from 'rxjs/operators';
import { BooleanLike } from '../models/boolean-like';
import { toBoolean } from '../helpers/to-boolean';

@Directive()
export abstract class BaseComponent extends DestroyableComponent implements OnInit {
    private noClassesValue = false;
    private initialized = false;
    protected readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    protected tag: string;
    protected readonly classList: ClassList;
    protected validateAttributes = true;

    protected get noClasses(): boolean {
        return this.noClassesValue;
    }

    protected set noClasses(value: boolean) {
        this.noClassesValue = value;
        this.refreshClasses();
    }

    // protected readonly eventQueue = new EventQueue();

    protected constructor(
        @Optional() @Inject('none') useUiClass = true
    ) {
        super();
        this.tag = this.elementRef.nativeElement.tagName.toLowerCase();
        this.classList = new ClassList(this.tag);
        this.classList.refresh.pipe(takeUntil(this.destroy)).subscribe(() => this.refreshClasses());
        if (useUiClass) {
            this.classList.register('ui');
            this.classList.set('ui', true, false);
        }
        this.classList.register('title', 'style');
    }

    public ngOnInit(): void {
        this.initialized = true;
        if (this.classList) {
            this.readPropertiesFromAttributes();
            this.refreshClasses();
        }
    }

    private readPropertiesFromAttributes(): void {
        if (!this.validateAttributes) {
            return;
        }
        for (let index = 0; index < this.elementRef.nativeElement.attributes.length; index++) {
            const attribute = this.elementRef.nativeElement.attributes[index];
            if (attribute.name.indexOf('_ng') === 0 || attribute.name.indexOf('ng-') === 0 || attribute.name.indexOf('m-') === 0 || attribute.name === 'class') {
                continue;
            }
            if (!this.classList.has(attribute.name)) {
                console.warn(`Unknown attribute '${attribute.name}' on <${this.tag}> found.`, this.elementRef.nativeElement);
            }
        }
    }

    // TODO: Check usage
    protected refreshClasses(): void {
        if (!this.initialized || !this.classList) {
            return;
        }
        this.classList.update(this.elementRef.nativeElement.classList);
    }

    protected toBoolean(value: BooleanLike): boolean {
        return toBoolean(value);
    }
}
