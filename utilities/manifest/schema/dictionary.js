'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DEFAULT_TYPES = [{
    schemaType: String,
    input: 'text',
  },
  {
    schemaType: 'String',
    input: 'text',
  },
  {
    schemaType: Number,
    input: 'number',
  },
  {
    schemaType: 'Number',
    input: 'number',
  },
  {
    schemaType: Date,
    input: 'text',
  },
  {
    schemaType: 'Date',
    input: 'text',
  },
  {
    schemaType: Object,
    input: 'code',
  },
  {
    schemaType: 'Object',
    input: 'code',
  },
  {
    schemaType: mongoose.Schema.Types.Mixed,
    input: 'code',
  },
  {
    schemaType: 'mongoose.Schema.Types.Mixed',
    input: 'code',
  },
  {
    schemaType: Schema.Types.Mixed,
    input: 'code',
  },
  {
    schemaType: 'Schema.Types.Mixed',
    input: 'code',
  },
  {
    schemaType: Boolean,
    input: 'boolean',
  },
  {
    schemaType: 'Boolean',
    input: 'boolean',
  },
  {
    schemaType: mongoose.Schema.ObjectId,
    input: '_id',
  },
  {
    schemaType: 'ObjectId',
    input: '_id',
  },
  {
    schemaType: Array,
    input: 'array',
  },
  {
    schemaType: 'Array',
    input: 'array',
  },
];

module.exports = (function() {
  let dictionary = {};
  DEFAULT_TYPES.forEach(type => {
    Object.defineProperty(dictionary,
      (typeof type.schemaType === 'string') ?
      type.schemaType :
      Symbol.for(type.schemaType), {
        value: type.input,
        writable: false,
        configurable: false,
      });
  });
  // console.log({ dictionary });
  return dictionary;
})();