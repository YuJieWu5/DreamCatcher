db = db.getSiblingDB('admin');

db.dropUser("dbAdmin");

console.log(db.getUsers());
