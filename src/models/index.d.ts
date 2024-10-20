import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";

export declare class Recipe {
    readonly [__modelMeta__]: {
        identifier: ManagedIdentifier<Recipe, 'id'>;
        readOnlyFields: 'createdAt' | 'updatedAt';
    };
    readonly id: string;
    readonly title: string;
    readonly ingredients: string[];
    readonly instructions: string;
    readonly imageUrl?: string;
    readonly source: string;
    readonly createdAt?: string | null;
    readonly updatedAt?: string | null;
    constructor(init: ModelInit<Recipe>);
    static copyOf(source: Recipe, mutator: (draft: MutableModel<Recipe>) => MutableModel<Recipe> | void): Recipe;
}