import { Category, CategoryProperties } from "./category";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";

describe("Category Unit Tests", () => {
    test("constructor with all properties", () => {
        const props: CategoryProperties = {
            name: "Movie", 
            description: 'This movie is fantastic',
            isActive: false, 
            createdAt: new Date() 
        };
        const uniqueEntityId = new UniqueEntityId();
        const category = new Category(props, uniqueEntityId);
        expect(category.toJSON()).toStrictEqual({
            id: uniqueEntityId.value,
            name: "MOVIE",
            description: props.description,
            isActive: props.isActive,
            createdAt: props.createdAt
        });
    });

    test("constructor only with mandatory properties", () => {
        const props: CategoryProperties = {
            name: "Movie", 
        };
        const category = new Category(props);
        expect(category.name).toBe("MOVIE");
        expect(category.description).toBeNull();
        expect(category.isActive).toBeTruthy();
        expect(category.createdAt).toBeInstanceOf(Date);
    });

    test('getter of name prop', () => {
        const category = new Category({
            name: 'movie1'
        });
        expect(category.name).toBe('MOVIE1');
    });

    test('getter and setter of description prop', () => {
        let category = new Category({
            name: 'Movie',
            description: 'Nice movie'
        });
        expect(category.description).toBe('Nice movie');

        category = new Category({
            name: 'Movie',
            description: undefined
        });
        expect(category.description).toBeNull();

        category = new Category({
            name: 'Movie',
            description: 'some description'
        });
        category['description'] = 'other description';
        expect(category.description).toBe('other description');

        category['description'] = undefined;
        expect(category.description).toBeNull();
    });

    test('getter and setter of isActive prop', () => {
        let category = new Category({
            name: 'Movie'
        });
        expect(category.isActive).toBeTruthy();

        category = new Category({
            name: 'Movie',
            isActive: true
        });
        expect(category.isActive).toBeTruthy();

        category = new Category({
            name: 'Movie',
            isActive: false
        });
        expect(category.isActive).toBeFalsy();
    });

    test('getter of createdAt prop', () => {
        let category = new Category({
            name: 'Movie'
        });
        expect(category.createdAt).toBeInstanceOf(Date);

        const createdAt = new Date();
        category = new Category({
            name: 'Movie',
            createdAt
        });
        expect(category.createdAt).toBe(createdAt);
    });

    test('id value', () => {
        let category = new Category({
            name: 'movie'
        });
        expect(category.id).not.toBeNull();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

        category = new Category({
            name: 'movie'
        }, undefined);
        expect(category.id).toBeDefined();
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

        category = new Category({
            name: 'movie'
        }, new UniqueEntityId('390eb90f-0dcb-4d70-a6db-3b1b974e7eee'));
        expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        expect(category.id).toBe('390eb90f-0dcb-4d70-a6db-3b1b974e7eee');
    });

    it('should update name and description', () => {
        const category = new Category({
            name: 'Movie 1',
            description: 'Great movie'
        });
        expect(category.id).toBeDefined();
        expect(category.name).toBe('MOVIE 1');
        expect(category.description).toBe('Great movie');

        category.update('Movie One', 'Not so great movie');
        expect(category.name).toBe('MOVIE ONE');
        expect(category.description).toBe('Not so great movie');
    });

    it('should activate category', () => {
        const category = new Category({
            name: 'Movie 1'
        });
        expect(category.isActive).toBeTruthy();
        category.activate();
        expect(category.isActive).toBeTruthy();
    });

    it('should deactivate category', () => {
        const category = new Category({
            name: 'Movie 1'
        });
        expect(category.isActive).toBeTruthy();
        category.deactivate();
        expect(category.isActive).toBeFalsy();
        category.activate();
        expect(category.isActive).toBeTruthy();
    });
});