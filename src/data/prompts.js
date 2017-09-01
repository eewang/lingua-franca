export const SeedPrompts = [
  {
    type: 'describe',
    prompt: 'Fourth of July',
    lang: 'english'
  },
  {
    type: 'describe',
    prompt: 'The American Civil War',
    lang: 'english'
  },
  {
    type: 'describe',
    prompt: 'United Nations',
    lang: 'english'
  },
  {
    type: 'answer',
    prompt: 'What are you doing tomorrow?',
    lang: 'english'
  },
  {
    type: 'answer',
    prompt: 'What did you do today?',
    lang: 'english'
  },
  {
    type: 'answer',
    prompt: 'What did you do yesterday?',
    lang: 'english'
  },
  {
    type: 'translate',
    prompt: 'He went to the beach and ate a delicious meal',
    lang: 'english'
  },
  {
    type: 'translate',
    prompt: 'I went to the coffeeshop and drank coffee',
    lang: 'english'
  },
  {
    type: 'translate',
    prompt: 'I would like to reduce the amount of red meat I eat',
    lang: 'english'
  },
  {
    type: 'translate',
    prompt: 'I am a laywer',
    lang: 'english',
    tags: [
      { name: 'present tense', type: 'verb' },
      { name: 'first-person', type: 'noun' },
      { name: 'singular', type: 'noun' },
      { name: 'indefinite article', type: 'noun' },
      { name: 'common noun', type: 'noun' }
    ]
  },
  {
    type: 'translate',
    prompt: 'I am going to the restaurant',
    lang: 'english',
    tags: [
      { name: 'present tense', type: 'verb' },
      { name: 'first-person', type: 'noun' },
      { name: 'singular', type: 'noun' },
      { name: 'definite article', type: 'noun' },
      { name: 'common noun', type: 'noun' }
    ]
  },
  {
    type: 'translate',
    prompt: 'I am eating a good apple',
    lang: 'english',
    tags: [
      { name: 'present tense', type: 'verb' },
      { name: 'first-person', type: 'noun' },
      { name: 'singular', type: 'noun' },
      { name: 'indefinite article', type: 'noun' },
      { name: 'modifier', type: 'adjective' },
      { name: 'common noun', type: 'noun' }
    ]
  },
  {
    type: 'translate',
    prompt: 'We are going to Chicago',
    lang: 'english',
    tags: [
      { name: 'present tense', type: 'verb' },
      { name: 'first-person', type: 'noun' },
      { name: 'plural', type: 'noun' },
      { name: 'proper noun', type: 'noun' }
    ]
  },
  {
    type: 'translate',
    prompt: 'We eat eggs and drink milk every morning for breakfast after we wake up',
    lang: 'english',
    tags: [
      { name: 'present tense', type: 'verb' },
      { name: 'first-person', type: 'noun' },
      { name: 'plural', type: 'noun' },
    ]
  },
  {
    type: 'translate',
    prompt: 'She wants to read more every day',
    lang: 'english',
    tags: [
      { name: 'present tense', type: 'verb' },
      { name: 'third-person', type: 'noun' },
      { name: 'singular', type: 'noun' },
    ]
  },
  {
    type: 'translate',
    prompt: 'We want to buy green sweaters and white shoes',
    lang: 'english',
    tags: [
      { name: 'present tense', type: 'verb' },
      { name: 'first-person', type: 'noun' },
      { name: 'plural', type: 'noun' },
      { name: 'noun modifier', type: 'adjective' },
      { name: 'infinitive',         type: 'verb' },
    ],
  }
]
