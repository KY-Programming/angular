import { DestroyableDirective } from './destroyable.directive';
import { Directive, ElementRef, inject, Inject, OnInit, Optional } from '@angular/core';
import { ClassList } from '../models/class-list';
import { takeUntil } from 'rxjs/operators';
import { BooleanLike } from '../models/boolean-like';

@Directive()
export abstract class BaseDirective extends DestroyableDirective implements OnInit {
    private noClassesValue = false;
    private initialized = false;
    protected readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    protected tag: string;
    protected readonly classList: ClassList;

    protected get noClasses(): boolean {
        return this.noClassesValue;
    }

    protected set noClasses(value: boolean) {
        this.noClassesValue = value;
        this.refreshClasses();
    }

    protected constructor(
        useUiClass = true
    ) {
        super();
        this.tag = this.elementRef.nativeElement.tagName.toLowerCase();
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

    protected refreshClasses(): void {
        if (!this.initialized) {
            return;
        }
        this.classList.update(this.elementRef.nativeElement.classList);
    }

    protected toBoolean(value: BooleanLike): boolean {
        return value === '' || value === true || value?.toString().toLowerCase() === 'true';
    }

}

