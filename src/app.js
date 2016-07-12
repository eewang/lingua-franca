import express from 'express';
import { render } from 'react-dom';
// For logging form params
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Noun, Verb, Adverb } from './app/schemas.jsx';
import parse from 'csv-parse';
import fs from 'fs';
import iconv from 'iconv-lite';

mongoose.connect('mongodb://localhost/lingua-franca');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var shuffleArray = (array) => {
  var i = 0;
  var j = 0;
  var temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array;
};

var parseNouns = parse({delimiter: ','}, (err, data) => {
  data.forEach((word) => {
    var noun = new Noun({
      word: word[0].trim(),
      gender: word[1],
      translation: word[2].trim()
    });
    noun.save();
  });
});

var parseVerbs = parse({delimiter: ','}, (err, data) => {
  data.forEach((word) => {
    var verb = new Verb({
      word: word[0].trim(),
      translation: word[1].trim()
    });
    verb.save();
  });
});

var parseAdverbs = parse({delimiter: ','}, (err, data) => {
  data.forEach((word) => {
    console.log(word);
    var adverb = new Adverb({
      word: word[0].trim(),
      translation: word[1].trim()
    });
    adverb.save();
  })
})

var fetchRandom = (req, res, model) => {
  var count = req.query.count || 5;

  model.find({}, '_id', (err, ids) => {
    var randomIds = shuffleArray(ids).slice(0, count);

    model.where('_id').in(randomIds).exec((err, words) => {
      res.json(words);
    });
  });
}

app.get('/create_vocab', (req, res) => {
  res.render('vocab_form');
});

app.post('/create_vocab', (req, res) => {
  var model, data;
  console.log(req.body.type);
  switch (req.body.type) {
    case 'noun':
      var word = new Noun({
        word: req.body.word,
        gender: req.body.gender,
        translation: req.body.translation,
      });
      word.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('success!');
        }
      })
    case 'verb':
      var word = new Verb({
        word: req.body.word,
        translation: req.body.translation,
      });
      word.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('success!');
        }
      });
    case 'adverb':
      var word = new Adverb({
        word: req.body.word,
        translation: req.body.translation,
      });
      word.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('success!');
        }
      });
    res.redirect('/');
  }

});

app.get('/', (req, res) => {
  res.render('index');
});
//
// app.get('/admin', (req, res) => {
//   res.render('vocab_form');
// })

app.get('/parse_data', (req, res) => {
  Noun.collection.remove();
  Verb.collection.remove();
  Adverb.collection.remove();
  fs.createReadStream(__dirname + '/data/nouns.csv', {encoding: 'utf8'}).pipe(parseNouns);
  fs.createReadStream(__dirname + '/data/verbs.csv', {encoding: 'utf8'}).pipe(parseVerbs);
  fs.createReadStream(__dirname + '/data/adverbs.csv', {encoding: 'utf8'}).pipe(parseAdverbs);
});

app.get('/api/verbs', (req, res) => {
  fetchRandom(req, res, Verb);
});

app.get('/api/nouns', (req, res) => {
  fetchRandom(req, res, Noun);
});

app.get('/api/adverbs', (req, res) => {
  fetchRandom(req, res, Adverb);
});

app.get('*', (req, res) => {
  res.render('index');
})

app.listen(3000, () => {
  console.log('server starting on port 3000...');
});
