import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export type EntityProperties = {
    id?: string | null;
}

export interface EntityInterface<Props extends EntityProperties> {
    toJSON(): Props;
}

export default abstract class Entity<Props extends EntityProperties> implements EntityInterface<Props> {
    public readonly uniqueEntityId!: UniqueEntityId;

    constructor(props: Props, id?: UniqueEntityId) {
        this.uniqueEntityId = id || new UniqueEntityId();
    }
    
    get id(): string {
        return this.uniqueEntityId.value;
    }

    toJSON(): Props {
        return {
            id: this.id
        } as Props;
    }
}