import Realm from 'realm';

const LanguageSchema = {
  name: 'Language',
  properties: {
    value: 'string'
  }
};

const DirectionSchema = {
  name: 'Direction',
  properties: {
    from: 'string',
    to: {
      type: 'list',
      objectType: 'Language'
    }
  }
};

const LanguageSettingsSchema = {
  name: 'LanguageSettings',
  properties: {
    fromLng: {
      type: 'string',
      default: 'en',
    },
    toLng: {
      type: 'string',
      default: 'ru',
    },
    directions: {
      type: 'list',
      objectType: 'Direction'
    }
  },
};

const ExampleSchema = {
  name: 'Example',
  properties: {
    exampleOrig: 'string',
    exampleTr: 'string',
  },
};

const WordSchema = {
  name: 'Word',
  primary_key: 'id',
  properties: {
    id: 'string',
    fromLng: 'string',
    toLng: 'string',
    origWord: 'string',
    translate: 'string',
    synonyms: 'string',
    examples: {
      type: 'list',
      objectType: 'Example',
    },
    rating: {
      type: 'int',
      default: 0,
      indexed: true,
    },
  },
};

export default new Realm({ schema: [LanguageSchema, DirectionSchema, LanguageSettingsSchema, ExampleSchema, WordSchema] });
