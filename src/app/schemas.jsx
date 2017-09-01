import Sequelize from 'sequelize';
import random from 'mongoose-simple-random';

var sequelize = new Sequelize('lingua-franca', 'lingua-franca', 'silvousplait', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './lingua-franca.sqlite'
});

sequelize
  .authenticate()
  .then((err) => {
    console.log('Connection has started to sqlite');
  })
  .catch((err) => {
    cnosole.log('Unable to connect to db: ', err);
  });

export const Vocab = sequelize.define('vocab', {
  word: Sequelize.STRING,
  type: Sequelize.STRING,
  gender: Sequelize.STRING,
  language: Sequelize.STRING,
  english: Sequelize.STRING
})

export const Prompt = sequelize.define('prompt', {
  type: Sequelize.STRING,
  prompt: Sequelize.STRING,
  lang: Sequelize.STRING
});

export const PromptResponse = sequelize.define('prompt_response', {
  text: Sequelize.STRING,
});

export const Tag = sequelize.define('tag', {
  name: Sequelize.STRING,
  type: Sequelize.STRING
})

Prompt.hasMany(PromptResponse);
PromptResponse.belongsTo(Prompt);
Prompt.belongsToMany(Tag, { through: 'PromptTag' });
Tag.belongsToMany(Prompt, { through: 'PromptTag' });
// TODO: Add many-to-many relationship between prompt response and vocab
// PromptResponse.hasMany(Vocab);

sequelize.sync();
