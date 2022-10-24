export default class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || 'Must be a valid UUID');
        this.name = 'InvalidUuidError';
    }
}