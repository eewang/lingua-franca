import express from 'express';
import { render } from 'react-dom';

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('src/public'));

const verbs = [
  {
    word: 'abandonner',
    english: 'to abandon'
  },
  {
    word: 'accéder',
    english: 'to acccess, to reach'
  },
  {
    word: 'accepter',
    english: 'to accept, to agree to'
  },
];

const nouns = [
  {
    word: 'abri',
    gender: 'm',
    english: 'shelter, refuge'
  },
  {
    word: 'accueil',
    gender: 'm',
    english: 'welcome, reception'
  },
  {
    word: 'accusation',
    gender: 'm',
    english: 'accuation'
  }
]

const concepts = ['tenses', 'direct-object', 'indirect-object']

const adjectives = [
  {
    word: 'absent',
    english: 'absent, away, distant'
  },
  {
    word: 'absurde',
    english: 'absurd, unreasonable'
  },
  {
    word: 'actuellement',
    english: 'currently, at present'
  }
]

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/vocab', (req, res) => {
  res.json({
    verbs: verbs,
    nouns: nouns,
    adjectives: adjectives
  });
})

app.listen(3000, () => {
  console.log('What up!');
});
