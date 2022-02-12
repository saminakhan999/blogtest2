const { init } = require("../dbConfig");

class Admin {
  constructor(data) {
    this.id = data.id;
    (this.username = data.username),
      (this.password_digest = data.password_digest);
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const adminData = await db.collection("admin").find().toArray();
        const admins = adminData.map(
          (item) =>
            new Admin({
              username: item.username,
              password_digest: item.password_digest,
              id: item._id,
            })
        );
        res(admins);
      } catch (err) {
        rej(`Error retrieving all admin: ${err}`);
      }
    });
  }

  static create({ username, password }) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const adminData = await db
          .collection("admin")
          .insertOne({ username: username, password_digest: password });
        const newAdmin = new Admin(adminData); // Do we need .insertionId?
        res(newAdmin);
      } catch (err) {
        rej(`Error creating new admin: ${err}`);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const adminData = await db
          .collection("admin")
          .find({ username: { $eq: username } })
          .toArray();
        const admin = new Admin({
          username: adminData[0].username,
          password_digest: adminData[0].password_digest,
          id: adminData[0]._id,
        });
        res(admin);
      } catch (err) {
        rej(`Error retrieving admin: ${err}`);
      }
    });
  }
}

module.exports = Admin;
