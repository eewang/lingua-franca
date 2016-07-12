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

NounSchema.plugin(random);
VerbSchema.plugin(random);

NounSchema.static('findByWord', function (word, callback) {
  console.log(word);
  console.log(callback());
  // return this.find({word: word}, callback);
});

export const Noun = mongoose.model('Noun', NounSchema);
export const Verb = mongoose.model('Verb', VerbSchema);
export const Adverb = mongoose.model('Adverb', AdverbSchema);
