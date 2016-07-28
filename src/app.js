import express from 'express';
import { render } from 'react-dom';
// For logging form params
import bodyParser from 'body-parser';
import {
  Vocab,
  Prompt,
  PromptResponse }
from './app/schemas.jsx';
import parse from 'csv-parse';
import fs from 'fs';
import iconv from 'iconv-lite';
import https from 'https';
import { SeedPrompts } from './data/prompts';
import Sequelize from 'sequelize';

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

var parseVocab = (language) => {
  return parse({delimiter: ','}, (err, data) => {
    data.forEach((word) => {
      Vocab.findOne({
        where: {
          word: word[0].trim()
        }
      }).then((vocab) => {
        // TODO: update existing entry if it exists
        if (!vocab) {
          Vocab.create({
            word: word[0].trim(),
            english: word[1].trim(),
            type: word[2].trim(),
            gender: word[3].trim(),
            language: language,
          });
        }
      });
    });
  });
};

var fetchRandom = (req, res) => {
  var count = req.query.count || 5;
  var type = req.query.type;

  Vocab.findAll({
    attributes: ['id'],
    where: {
      type: type
    }
  }).then((instances) => {
    return instances.map((inst) => { return inst.id; });
  }).then((ids) => {
    return shuffleArray(ids).slice(0, count);
  }).then((idSet) => {
    return Vocab.findAll({
      where: {
        id: idSet
      }
    });
  }).then((models) => {
    res.json(models);
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

app.post('/api/create_prompt', (req, res) => {
  // TODO: Super dangerous, but using for testing of bookmarklet
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-HEADERS', 'Content-Type, Accept');

  // TODO: Change the bookmarklet to handle body form params
  Prompt.create({
    type: 'translate',
    prompt: req.query.prompt,
    lang: 'english'
  });
});

app.post('/create_prompt', (req, res) => {
  Prompt.create({
    type: req.body.type,
    prompt: req.body.prompt,
    lang: req.body.lang
  });
  res.redirect('/admin');
});

app.get('/api/random_prompt', (req, res) => {

  var promptIds = Prompt.findAll({
    attributes: ['id'],
    where: {
      type: req.query.type
    }
  }).then((ids) => {
    return ids.map((prompt) => { return prompt.id; });
  }).then((ids) => {
    return Prompt.find({
      where: {
        id: shuffleArray(ids).slice(0, 1)
      }
    });
  }).then((prompt) => {
    if (!prompt) prompt = {type: 'question', prompt: ''}
    res.json(prompt);
  });
});

app.get('/api/progress', (req, res) => {
  PromptResponse.find({}).sort({created_at: -1}).exec((err, objs) => {
    res.json(objs);
  })
});

app.post('/create_vocab', (req, res) => {
  Vocab.findOne({
    where: {
      word: req.body.word
    }
  }).then((vocab) => {
    if (!vocab) {
      Vocab.create({
        word: req.body.word,
        english: req.body.english,
        type: req.body.type,
        gender: req.body.gender,
        language: req.body.language,
      });
    }
  }).then(() => {
    res.redirect('/admin');
  });
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
  var readStreams = [
    {file: '/data/french.csv', action: parseVocab('french')},
  ];
  var vocabStream = (file, action) => {
    return new Promise((resolve, reject) => {
      // Then, upload data from csv files
      var stream = fs.createReadStream(__dirname + file, {encoding: 'utf8'}).pipe(action);
      stream.on('end', resolve);
    });
  }

  var allVocab = () => {
    return readStreams.map((streamObj) => {
      vocabStream(streamObj.file, streamObj.action);
    });
  }

  var prompts = () => {
    return new Promise((resolve, reject) => {
      SeedPrompts.forEach((p) => {
        Prompt.create(p);
      });
      resolve();
    });
  }

  Promise.all(allVocab(), prompts()).then((results) => {
    console.log(results);
    res.redirect('/');
  }).catch((err) => {
    console.log('womp', err);
  })

});

app.get('/api/vocab', (req, res) => {
  fetchRandom(req, res);
});

app.get('*', (req, res) => {
  res.render('index');
})

app.listen(3000, () => {
  console.log('server starting on port 3000...');
});
