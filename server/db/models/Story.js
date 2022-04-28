const Sequelize = require('sequelize');
const db = require('../db');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const Story = db.define('story', {
  title: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.TEXT,
  },
  sanitizedHTML: {
    type: Sequelize.TEXT,
  },
});

Story.beforeValidate((story) => {
  if (story.text) {
    story.sanitizedHTML = dompurify.sanitize(marked.parse(story.text));
  }
});

Story.afterSave((story) => {
  if (story.text) {
    story.sanitizedHTML = dompurify.sanitize(marked.parse(story.text));
  }
});

module.exports = Story;
