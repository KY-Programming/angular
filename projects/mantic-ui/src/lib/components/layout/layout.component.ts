import { Component, Input, TemplateRef } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { IconType } from '../icon/icon-type';
import { IconSize } from '../icon/icon-size';
import { MenuComponent } from '../menu/menu.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { IconComponent } from '../icon/icon.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'm-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [
        CommonModule,
        MenuComponent,
        MenuItemComponent,
        IconComponent,
        FooterComponent
    ]
})
export class LayoutComponent {
    public static readonly defaults = { menuIcon: <IconType>'bars', menuIconSize: <IconSize>undefined };
    protected readonly defaults = LayoutComponent.defaults;

    @Input()
    public showHamburger = false;

    @Input()
    public menuIcon: IconType | undefined;

    @Input()
    public menuIconSize: IconSize;

    public get menuTemplates(): TemplateRef<unknown>[] {
        return this.layoutService.menuTemplates;
    }

    public get footerTemplates(): TemplateRef<unknown>[] {
        return this.layoutService.footerTemplates;
    }

    public constructor(
        private readonly layoutService: LayoutService
    ) {
    }

}
