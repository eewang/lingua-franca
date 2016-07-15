import mongoose from 'mongoose';
import random from 'mongoose-simple-random';

const Schema = mongoose.Schema;

const NounSchema = new Schema({
  word: String,
  gender: String,
  translation: String
});

const VerbSchema = new Schema({
  word: String,
  translation: String
});

const AdverbSchema = new Schema({
  word: String,
  translation: String
});

const AdjectiveSchema = new Schema({
  word: String,
  translation: String
});

const PromptSchema = new Schema({
  type: String,
  prompt: String,
  lang: String
})

const PromptResponseSchema = new Schema({
  text: String,
  prompt: String,
  vocab: [String],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export const Noun = mongoose.model('Noun', NounSchema);
export const Verb = mongoose.model('Verb', VerbSchema);
export const Adverb = mongoose.model('Adverb', AdverbSchema);
export const Adjective = mongoose.model('Adjective', AdjectiveSchema);
export const Prompt = mongoose.model('Prompt', PromptSchema);
export const PromptResponse = mongoose.model('PromptResponse', PromptResponseSchema);
