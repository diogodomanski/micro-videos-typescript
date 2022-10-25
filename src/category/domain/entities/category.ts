import UniqueEntityId from "@shared/domain/value-objects/unique-entity-id.vo";
import Entity, { EntityProperties } from "../../../@shared/domain/entity/entity";

export type CategoryProperties = EntityProperties & {
    name: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date;
}

export class Category extends Entity<CategoryProperties> {
    protected _name!: string;
    protected _description?: string | null;
    protected _isActive?: boolean;
    protected _createdAt?: Date;

    constructor(props: CategoryProperties, id?: UniqueEntityId) {
        super(props, id);
        this.name = props.name;
        this.description = props.description;
        this.isActive = props.isActive ?? true;
        this.createdAt = props.createdAt ?? new Date();
    }

    protected set name(value: string) {
        this._name = value.toUpperCase();
    }

    get name(): string {
        return this._name;
    }

    protected set description(value: string | undefined | null) {
        this._description = value ?? null;
    }

    get description(): string | undefined | null {
        return this._description;
    }

    protected set isActive(value: boolean | undefined) {
        this._isActive = value;
    }

    get isActive(): boolean | undefined {
        return this._isActive;
    }

    protected set createdAt(value: Date | undefined) {
        this._createdAt = value;
    }

    get createdAt(): Date | undefined {
        return this._createdAt;
    }

    update(name: string, description: string): void {
        this.name = name;
        this.description = description;
    }

    activate(): void {
        this.isActive = true;
    }

    deactivate(): void {
        this.isActive = false;
    }
    
    toJSON(): CategoryProperties {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
            createdAt: this.createdAt
        };
    }

}