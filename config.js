/**
 * config
 */

exports.config = {
  debug: true,
  name: 'sinter',
  description: 'this project was written in winter',
  version: '0.0.1',
  site_headers: [
    '<meta name="author" content="brucefeng" />',
  ],
  db: 'mongodb://localhost/sinter_db',
  port:8080,
  host:'localhost'
};
