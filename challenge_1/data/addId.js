const db = require('./db.json');
const fs = require('fs');

const addId = () => {
  db.events.forEach((event, id) => {
    event.id = id;
  });
  fs.writeFile('data/data.json', JSON.stringify(db), err => console.log(err));
}

addId();