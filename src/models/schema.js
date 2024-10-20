export const schema = {
  "models": {
    "Recipe": {
      "name": "Recipe",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "title": {
          "name": "title",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "ingredients": {
          "name": "ingredients",
          "isArray": true,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "instructions": {
          "name": "instructions",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "source": {
          "name": "source",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "imageURL": {
          "name": "imageURL",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "language": {
          "name": "language",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
      },
      "syncable": true,
      "pluralName": "Recipes",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        }
      ]
    }
  },
  "enums": {},
  "nonModels": {},
  "codegenVersion": "3.4.4",
  "version": "c31e80e8d9e3e9f3b7c8d5a0e7c8d5a0"
};