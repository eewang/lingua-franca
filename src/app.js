import express from 'express';
import { render } from 'react-dom';
// For logging form params
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {
  Noun,
  Verb,
  Adverb,
  Adjective,
  Prompt,
  PromptResponse }
from './app/schemas.jsx';
import parse from 'csv-parse';
import fs from 'fs';
import iconv from 'iconv-lite';
import https from 'https';

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
    var adverb = new Adverb({
      word: word[0].trim(),
      translation: word[1].trim()
    });
    adverb.save();
  })
});

var parseAdjectives = parse({delimiter: ','}, (err, data) => {
  data.forEach((word) => {
    console.log(word);
    var adverb = new Adjective({
      word: word[0].trim(),
      translation: word[1].trim()
    });
    adverb.save();
  })
});

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

let YANDEX_API_KEY = "trnsl.1.1.20160714T194553Z.a3c1c9f925fde89e.3a618e650137dba5639014bad822bdb40644b238";

app.get('/api/translate', (req, res) => {
  var yandexHost = "https://translate.yandex.net"
  var yandexPath = "/api/v1.5/tr.json/translate"
  var params = {
    key: YANDEX_API_KEY,
    lang: 'en',
    text: req.query.text
  }

  https.get(yandexHost + yandexPath + '?key=' + params.key + '&lang=' + params.lang + '&text=' + params.text, (yandexRes) => {
    var body = '';
    yandexRes.on('data', (data) => {
      body += data;
    });

    yandexRes.on('end', () => {
      res.json(body);
    });
  });
});

app.post('/create_prompt', (req, res) => {
  var prompt = new Prompt({
    type: req.body.type,
    prompt: req.body.prompt,
    lang: req.body.lang
  });
  prompt.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success!');
    }
  });
  res.redirect('/admin');
});

app.get('/api/random_prompt', (req, res) => {
  Prompt.find({}, '_id').where('type').in([req.query.type]).exec((err, ids) => {
    var randomIds = shuffleArray(ids).slice(0, 1);
    Prompt.findOne().where('_id').in(randomIds).exec((err, prompt) => {
      if (!prompt) prompt = {type: 'question', prompt: ''}
      res.json(prompt);
    })
  });
});

app.get('/api/progress', (req, res) => {
  PromptResponse.find({}).sort({created_at: -1}).exec((err, objs) => {
    res.json(objs);
  })
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
    res.redirect('/admin');
  }

});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/response', (req, res) => {
  var responsePrompt = new PromptResponse({
    text: req.query.text,
    prompt: req.query.prompt,
    vocab: req.body.vocab
  });
  responsePrompt.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
  res.json({success: true})
})

app.get('/parse_data', (req, res) => {
  Noun.collection.remove();
  Verb.collection.remove();
  Adverb.collection.remove();
  Adjective.collection.remove();
  fs.createReadStream(__dirname + '/data/nouns.csv', {encoding: 'utf8'}).pipe(parseNouns);
  fs.createReadStream(__dirname + '/data/verbs.csv', {encoding: 'utf8'}).pipe(parseVerbs);
  fs.createReadStream(__dirname + '/data/adverbs.csv', {encoding: 'utf8'}).pipe(parseAdverbs);
  fs.createReadStream(__dirname + '/data/adjectives.csv', {encoding: 'utf8'}).pipe(parseAdjectives);
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

app.get('/api/adjectives', (req, res) => {
  fetchRandom(req, res, Adjective);
});

app.get('*', (req, res) => {
  res.render('index');
})

app.listen(3000, () => {
  console.log('server starting on port 3000...');
});
