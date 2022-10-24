import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId Unit Tests', () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    beforeEach(() => {
        validateSpy.mockClear();
    });

    it('should throw error when uuid is invalid', () => {
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should generate uuid when none is passed as input', () => {
        const uniqueEntityId = new UniqueEntityId(); 
        expect(uuidValidate(uniqueEntityId.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should use valid uuid passed as input', () => {
        const uuid = '5eba6fcc-3ef0-4875-aaa1-155785881d73';
        const uniqueEntityId = new UniqueEntityId(uuid); 
        expect(uniqueEntityId.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });
});