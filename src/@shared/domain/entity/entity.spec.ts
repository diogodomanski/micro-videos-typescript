import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity, { EntityProperties } from "./entity";
import { validate as uuidValidate } from 'uuid';

type StubEntityProperties = EntityProperties & {
    prop1: string;
    prop2: number;
}

class StubEntity extends Entity<StubEntityProperties> {
    public readonly prop1: string;
    public readonly prop2: number;

    constructor(props: StubEntityProperties, id?: UniqueEntityId) {
        super(props, id);
        this.prop1 = props.prop1;
        this.prop2 = props.prop2;
    }

    toJSON(): StubEntityProperties {
        return {
            id: this.id,
            prop1: this.prop1,
            prop2: this.prop2
        };
    }
}

describe('Entity Unit Tests', () => {
    it('should set props and id', () => {
        const entity = new StubEntity({ id: undefined, prop1: 'value1', prop2: 10 });
        expect(entity.id).toBeDefined();
        expect(uuidValidate(entity.id)).toBeTruthy()
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.prop1).toBe('value1');
        expect(entity.prop2).toBe(10);
    });

    it('should accept a valid uuid', () => {
        const uniqueEntityId = new UniqueEntityId();
        const props = { prop1: 'value1', prop2: 10 };
        const entity = new StubEntity(props, uniqueEntityId);
        expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(entity.id).toBe(uniqueEntityId.value);
    });

    it('should convert an entity to json', () => {
        const uniqueEntityId = new UniqueEntityId();
        const props = { prop1: 'value1', prop2: 10 };
        const entity = new StubEntity(props, uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual({ id: uniqueEntityId.value, ...props });
    });
});