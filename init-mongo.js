db = db.getSiblingDB('lkbhosdb'); 

db.createUser({
  user: "lkbhos",
  pwd: "lkbh11234",
  roles: [
    {
      role: "readWrite",
      db: "lkbhosdb",
    },
  ],
});
