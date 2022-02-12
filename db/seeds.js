const db = connect("mongodb://localhost:27017/admin_details");

db.admin.drop();

db.admin.insertMany([
  {
    username: "noahp",
    // password: letmein
    password_digest:
      "$2a$10$77joqmSlrXNHLgt4/MnJsucmKqvnICUhMC3XMB07ZFsGiCdUuNMnG",
  },
  {
    username: "richardc",
    // password: linux
    password_digest:
      "$2a$10$CvwVn53Gu5N1GS3tWSbIKO4HwTJKQFqnUG2JTqoK5B1SNdwG3sgle",
  },
  {
    username: "saminak",
    // password: yoshi
    password_digest:
      "$2a$10$a31oZ/QrmdDN1meAhBN50eA4Q4z/23b.F0mc0EJJqPOqZ0cy23JPa",
  },
  {
    username: "hamzas",
    // password: warmmilk
    password_digest:
      "$2a$10$I/W/bBslptzPk8ax8DDPJ.zqEUK9Zyi7nDokX0PLFG6/N5p03ANPy",
  },
]);
