﻿import { Directive, HostBinding, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { BooleanLike } from '../models/boolean-like';
import { ColorDirective } from '../directives/color.directive';
import { BasicDirective } from '../directives/basic.directive';
import { InvertedDirective } from '../directives/inverted.directive';

@Directive()
export abstract class ButtonBaseComponent extends BaseComponent {
    public static override readonly providers = [...BaseComponent.providers];
    public static readonly directives = [ColorDirective.default, BasicDirective.default, InvertedDirective.default];
    private sizeValue: string;
    private isPrimary: boolean;
    private isSecondary: boolean;
    private isPositive: boolean;
    private isNegative: boolean;
    private isActive: boolean;
    private isDisabled: boolean;
    private isLoading: boolean;
    private isCircular: boolean;
    private isAttachedLeft: boolean;
    private isAttachedTop: boolean;
    private isAttachedRight: boolean;
    private isAttachedBottom: boolean;

    @Input()
    @HostBinding('class.primary')
    public get primary(): boolean {
        return this.isPrimary;
    }

    public set primary(value: BooleanLike) {
        this.isPrimary = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.secondary')
    public get secondary(): boolean {
        return this.isSecondary;
    }

    public set secondary(value: BooleanLike) {
        this.isSecondary = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.positive')
    public get positive(): boolean {
        return this.isPositive;
    }

    public set positive(value: BooleanLike) {
        this.isPositive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.negative')
    public get negative(): boolean {
        return this.isNegative;
    }

    public set negative(value: BooleanLike) {
        this.isNegative = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.active')
    public get active(): boolean {
        return this.isActive;
    }

    public set active(value: BooleanLike) {
        this.isActive = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.disabled')
    public get disabled(): boolean {
        return this.isDisabled;
    }

    public set disabled(value: BooleanLike) {
        this.isDisabled = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.loading')
    public get loading(): boolean {
        return this.isLoading;
    }

    public set loading(value: BooleanLike) {
        this.isLoading = this.toBoolean(value);
    }

    public get size(): string {
        return this.sizeValue;
    }

    @Input()
    public set size(value: string) {
        this.sizeValue = value;
        this.classList.set('size', value);
    }

    @Input()
    @HostBinding('class.circular')
    public get circular(): boolean {
        return this.isCircular;
    }

    public set circular(value: BooleanLike) {
        this.isCircular = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-left')
    public get attachedLeft(): boolean {
        return this.isAttachedLeft;
    }

    public set attachedLeft(value: BooleanLike) {
        this.isAttachedLeft = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-top')
    public get attachedTop(): boolean {
        return this.isAttachedTop;
    }

    public set attachedTop(value: BooleanLike) {
        this.isAttachedTop = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-right')
    public get attachedRight(): boolean {
        return this.isAttachedRight;
    }

    public set attachedRight(value: BooleanLike) {
        this.isAttachedRight = this.toBoolean(value);
    }

    @Input()
    @HostBinding('class.attached-bottom')
    public get attachedBottom(): boolean {
        return this.isAttachedBottom;
    }

    public set attachedBottom(value: BooleanLike) {
        this.isAttachedBottom = this.toBoolean(value);
    }

    @HostBinding('class.button')
    public button = true;

    protected constructor() {
        super();
        this.elementRef.nativeElement.setAttribute('tabindex', '0');
        this.classList.register('size', 'inverted', 'primary', 'secondary', 'positive', 'negative', 'circular', 'color', 'basic', 'active', 'disabled', 'loading', 'tabindex', 'attachedLeft', 'attachedRight', 'attachedTop', 'attachedBottom');
    }
}
