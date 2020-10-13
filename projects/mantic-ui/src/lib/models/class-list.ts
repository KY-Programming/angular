import { ClassListEntry, ClassListEntryAction } from './class-list-entry';

export class ClassList {
    private readonly entries: ClassListEntry[] = [];

    public register(key: string, sort?: number, defaultClasses?: string): ClassList {
        return this.registerInternal(key, sort, defaultClasses, true, (entry, value) => entry.classes = value === undefined ? undefined : value.toString());
    }

    public registerBoolean(key: string | string[], classes?: string, sort?: number, isActive = false): ClassList {
        if (Array.isArray(key)) {
            key.forEach(k => this.registerBoolean(k, classes, sort, isActive));
        }
        else {
            this.registerInternal(key, sort, classes === undefined ? key : classes, isActive, (entry, value) => entry.isActive = !!value);
        }
        return this;
    }

    public registerFixed(classes: string, sort?: number): ClassList {
        return this.register('', sort, classes);
    }

    public registerAction(key: string, action: ClassListEntryAction, sort?: number, defaultClasses?: string): ClassList {
        return this.registerInternal(key, sort, defaultClasses, true, action);
    }

    private registerInternal(key: string, sort: number, classes: string, isActive: boolean, action: ClassListEntryAction): ClassList {
        this.entries.push(new ClassListEntry(key, classes, isActive, sort === undefined ? this.entries.length : sort, action));
        return this;
    }

    public ignore(key: string): ClassList {
        this.entries.push(new ClassListEntry(key, undefined, undefined, undefined, undefined, true));
        return this;
    }

    public set(key: string, value: unknown): ClassList {
        this.entries.filter(x => x.key === key && x.action).forEach(entry => {
            entry.action(entry, value);
        });
        return this;
    }

    public setActive(key: string, value = true): ClassList {
        this.entries.filter(x => x.key === key).forEach(x => x.isActive = value);
        return this;
    }

    public contains(key: string): boolean {
        return this.entries.some(entry => entry.key === key);
    }

    public find(key: string): ClassListEntry {
        return this.entries.find(entry => entry.key.toLowerCase() === key.toLowerCase());
    }

    public refresh(data: unknown): ClassList {
        this.entries.filter(entry => entry.key).forEach(entry => this.set(entry.key, data[entry.key]));
        return this;
    }

    public toString(): string {
        return this.entries.filter(x => x.classes && x.isActive)
            .filter(x => x.ignored !== true)
            .sort((a, b) => a.sort > b.sort ? 1 : a.sort < b.sort ? -1 : 0)
            .map(x => x.classes)
            .join(' ');
    }
}
