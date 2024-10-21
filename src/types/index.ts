import {a} from "@aws-amplify/backend";

export type Recipe = {
    title: string,
    ingredients: string,
    instructions: string,
    source: string,
    imageUrl: string,
    language?: string,
    createdAt: string,
    updatedAt: string,
    translatedTitle?: string,
    image?: string,
    _version: string,
    _lastChangedAt: string,
    _deleted: boolean
}