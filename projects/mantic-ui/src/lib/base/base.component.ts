﻿import { Component, ElementRef, Inject, OnInit, Optional } from '@angular/core';
import { DestroyableComponent } from './destroyable.component';
import { ClassList } from '../models/class-list';
import { takeUntil } from 'rxjs/operators';

@Component({
    template: ''
})
export class BaseComponent extends DestroyableComponent implements OnInit {
    private noClassesValue = false;
    private initialized = false;

    protected tag: string;
    protected readonly classList: ClassList;

    protected get noClasses(): boolean {
        return this.noClassesValue;
    }

    protected set noClasses(value: boolean) {
        this.noClassesValue = value;
        this.refreshClasses();
    }

    // protected readonly eventQueue = new EventQueue();

    public constructor(
        private readonly element: ElementRef<HTMLElement>,
        @Optional() @Inject('none') useUiClass = true
    ) {
        super();
        this.tag = this.element.nativeElement.tagName.toLowerCase();
        this.classList = new ClassList(this.tag);
        this.classList.refresh.pipe(takeUntil(this.destroy)).subscribe(() => this.refreshClasses());
        if (useUiClass) {
            this.classList.register('ui');
            this.classList.set('ui', true, false);
        }
        this.classList.register('title');
    }

    public ngOnInit(): void {
        this.initialized = true;
        this.readPropertiesFromAttributes();
        this.refreshClasses();
    }

    private readPropertiesFromAttributes(): void {
        for (let index = 0; index < this.element.nativeElement.attributes.length; index++) {
            const attribute = this.element.nativeElement.attributes[index];
            if (attribute.name.indexOf('_ng') === 0 || attribute.name.indexOf('ng-') === 0 || attribute.name.indexOf('m-') === 0 || attribute.name === 'class') {
                continue;
            }
            if (!this.classList.has(attribute.name)) {
                console.warn(`Unknown attribute '${attribute.name}' on <${this.tag}> found.`, this.element.nativeElement);
            }
        }
    }

    // TODO: Check usage
    protected refreshClasses(): void {
        if (!this.initialized) {
            return;
        }
        this.classList.update(this.element.nativeElement.classList);
    }

    protected toBoolean(value: boolean | string): boolean {
        return value === '' || value === true || value?.toString().toLowerCase() === 'true';
    }
}