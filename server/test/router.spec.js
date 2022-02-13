const request = require("supertest");
const app = require("../server/server.js");
const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

// GET

describe("GET all blog posts", () => {
  test("responds with correct data", (done) => {
    request(app)
      .get("/blog")
      .expect(
        {
          1: {
            blogtitle: "Ostriches don't exist",
            blogcontent:
              "Scientists recently discovered that ostriches are just a large form of pigeon. They share the same genes apart from the gene for height. Up until 100 years ago ostriches didn't exist, it wasn't until a family of pigeons snuck onto an EasyJet flight to Africa. On the flight one of them had its head stuck out of the window causing it to get stretched extensively resulting in the ostrich-like appearance we're familiar with today.",
            timestamp: "29/01/2022 11:45:33",
            gif: "https://media4.giphy.com/media/l1J9znYNISr0aEmze/giphy.webp?cid=112e516bj583yd2p34cuzg3zsicfoeokijom4c68tw0zkjvu&rid=giphy.webp&ct=g",
            comment: {
              1: {
                blogcomment:
                  "That awkward moment when you find out that you don't exist... -Ostrich",
                timestamp: "29/01/2022 11:48:37",
              },
              2: {
                blogcomment:
                  "Haha nice try! I bet next time you'll say that chairs don't exist...",
                timestamp: "29/01/2022 12:22:07",
              },
            },
            emoji: {
              1: { emojiCount: 231 },
              2: { emojiCount: 175 },
              3: { emojiCount: 98 },
            },
          },

          2: {
            blogtitle: "Are Aliens real? Part 1",
            blogcontent:
              "I never thought Aliens could be real. I thought 'how stupid could someone be to believe there is something non-human actually out there'. Well, I take it all back. They definitely might exist. I thought that the older I got the more ignorant I would get. I almost believed that something completely inexplainable could happen to me, but I would just figure, 'Hey… there is probably a valid reason for that!'. Now. As a 18 year old boy. I don’t have the will to believe any different.",
            timestamp: "30/01/2022 10:34:46",
            gif: "https://media2.giphy.com/media/gHcPh3ehbRGik/giphy.webp?cid=112e516bpll6jg8e3bkezhdzjedxlzxfr7z4eyle2f9fub23&rid=giphy.webp&ct=g",
            comment: {
              1: {
                blogcomment: "OMG I thought I was the only one!",
                timestamp: "30/01/2022 11:07:55",
              },
              2: {
                blogcomment:
                  "The same thing happened to me too. Join the Alien Believers Society for support!",
                timestamp: "30/01/2022 11:55:44",
              },
            },
            emoji: {
              1: { emojiCount: 167 },
              2: { emojiCount: 134 },
              3: { emojiCount: 122 },
            },
          },

          3: {
            blogtitle: "My brother believes in Aliens",
            blogcontent: "I love the guy but he's freaking me out!!!",
            timestamp: "31/01/2022 12:04:22",
            gif: "https://media0.giphy.com/media/3oEjI789af0AVurF60/giphy.webp?cid=112e516bf9nnnymdnva57g1ze6cg1c5uj0eje4wjqf2jm5qm&rid=giphy.webp&ct=g",
            comment: {
              1: {
                blogcomment: "Ratio",
                timestamp: "31/01/2022 12:12:12",
              },
              2: {
                blogcomment: "It's true I do!!!",
                timestamp: "31/01/2022 12:17:10",
              },
            },
            emoji: {
              1: { emojiCount: 160 },
              2: { emojiCount: 133 },
              3: { emojiCount: 276 },
            },
          },

          4: {
            blogtitle: "Richard loves Linux",
            blogcontent: "Richard REALLY REALLY loves Linux",
            timestamp: "02/02/2022 09:22:42",
            gif: "https://media2.giphy.com/media/3og0ICG4WxdKSRzE3K/giphy.gif?cid=112e516bwsceaq2go70nr3dryomhzmop52b7y62lyxvm09zt&rid=giphy.gif&ct=g",
            comment: {
              1: {
                blogcomment:
                  "I have a Linux joke... But some of you would not apt-get it.",
                timestamp: "02/02/2022 10:11:11",
              },
            },
            emoji: {
              1: { emojiCount: 212 },
              2: { emojiCount: 245 },
              3: { emojiCount: 247 },
            },
          },

          5: {
            blogtitle: "Noah loves writing blogs",
            blogcontent: "He's sooo good at it check out his blog!",
            timestamp: "03/02/2022 12:02:19",
            gif: "https://media1.giphy.com/media/yNs2a0jRkYxy6191B2/giphy.gif?cid=112e516bjbj5bi7fb42f1r7xu6qddj4zzq0niqgu9lll2fkg&rid=giphy.gif&ct=g",
            comment: {},
            emoji: {
              1: { emojiCount: 102 },
              2: { emojiCount: 182 },
              3: { emojiCount: 193 },
            },
          },

          6: {
            blogtitle: "Hamza loves warm milk",
            blogcontent:
              "Hamza loves warm milk because when he was a child cold milk felt cold to him",
            timestamp: "03/02/2022 13:11:47",
            gif: "https://media1.giphy.com/media/pbEqpHhDLmKNA7yUye/giphy.gif?cid=112e516bphdxnms2kjjrxbsre67ybsy9o41v6305l1d2jc3b&rid=giphy.gif&ct=g",
            comment: {
              1: {
                blogcomment: "I'm so sorry to hear that",
                timestamp: "03/02/2022 15:34:01",
              },
            },
            emoji: {
              1: { emojiCount: 443 },
              2: { emojiCount: 192 },
              3: { emojiCount: 139 },
            },
          },

          7: {
            blogtitle: "Samina IS yoshi",
            blogcontent: "She's a green machine ready for action",
            timestamp: "04/02/2022 10:19:58",
            gif: "https://media2.giphy.com/media/C51woXfgJdug/giphy.gif?cid=112e516btys3hvdudc32py3wwcdylk62b183cr3q0vjlq2b9&rid=giphy.gif&ct=g",
            comment: {},
            emoji: {
              1: { emojiCount: 128 },
              2: { emojiCount: 384 },
              3: { emojiCount: 294 },
            },
          },
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app).get("/blog").expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).get("/blog").expect(200, done);
  });
});

describe("GET specific blog post", () => {
  test("responds with correct data", (done) => {
    request(app)
      .get("/blog/3")
      .expect(
        {
          blogtitle: "My brother believes in Aliens",
          blogcontent: "I love the guy but he's freaking me out!!!",
          timestamp: "31/01/2022 12:04:22",
          gif: "https://media0.giphy.com/media/3oEjI789af0AVurF60/giphy.webp?cid=112e516bf9nnnymdnva57g1ze6cg1c5uj0eje4wjqf2jm5qm&rid=giphy.webp&ct=g",
          comment: {
            1: {
              blogcomment: "Ratio",
              timestamp: "31/01/2022 12:12:12",
            },
            2: {
              blogcomment: "It's true I do!!!",
              timestamp: "31/01/2022 12:17:10",
            },
          },
          emoji: {
            1: { emojiCount: 160 },
            2: { emojiCount: 133 },
            3: { emojiCount: 276 },
          },
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app).get("/blog/3").expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).get("/blog/3").expect(200, done);
  });

  test("if id unknown responds with status code 404", (done) => {
    request(app).get("/blog/100").expect(404, done);
  });
});

describe("GET all comments from a blog post", () => {
  test("responds with correct data", (done) => {
    request(app)
      .get("/blog/1/comment")
      .expect(
        {
          1: {
            blogcomment:
              "That awkward moment when you find out that you don't exist... -Ostrich",
            timestamp: "29/01/2022 11:48:37",
          },
          2: {
            blogcomment:
              "Haha nice try! I bet next time you'll say that chairs don't exist...",
            timestamp: "29/01/2022 12:22:07",
          },
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app).get("/blog/1/comment").expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).get("/blog/1/comment").expect(200, done);
  });

  test("if id unknown responds with status code 404", (done) => {
    request(app).get("/blog/9/comment").expect(404, done);
  });
});

describe("GET individual comments from blog post", () => {
  test("responds with correct data", (done) => {
    request(app).get("/blog/1/comment/1").expect(
      {
        blogcomment:
          "That awkward moment when you find out that you don't exist... -Ostrich",
        timestamp: "29/01/2022 11:48:37",
      },
      done
    );
  });

  test("responds with json", (done) => {
    request(app).get("/blog/1/comment/1").expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).get("/blog/1/comment/1").expect(200, done);
  });

  test("if id unknown responds with status code 404", (done) => {
    request(app).get("/blog/2/comment/200").expect(404, done);
  });
});

describe("GET Emoji from blog", () => {
  test("responds with correct data", (done) => {
    request(app).get("/blog/2/emoji/2").expect({ emojiCount: 134 }, done);
  });

  test("responds with json", (done) => {
    request(app).get("/blog/2/emoji/2").expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).get("/blog/2/emoji/2").expect(200, done);
  });

  test("if id unknown responds with status code 404", (done) => {
    request(app).get("/blog/2/emoji/100").expect(404, done);
  });
});

describe("GET search function", () => {
  test("responds with correct data", (done) => {
    request(app)
      .get("/search?q=ostrich")
      .expect(
        {
          item: {
            blogtitle: "Ostriches don't exist",
            blogcontent:
              "Scientists recently discovered that ostriches are just a large form of pigeon. They share the same genes apart from the gene for height. Up until 100 years ago ostriches didn't exist, it wasn't until a family of pigeons snuck onto an EasyJet flight to Africa. On the flight one of them had its head stuck out of the window causing it to get stretched extensively resulting in the ostrich-like appearance we're familiar with today.",
            timestamp: "29/01/2022 11:45:33",
            gif: "https://media4.giphy.com/media/l1J9znYNISr0aEmze/giphy.webp?cid=112e516bj583yd2p34cuzg3zsicfoeokijom4c68tw0zkjvu&rid=giphy.webp&ct=g",
            comment: {
              1: {
                blogcomment:
                  "That awkward moment when you find out that you don't exist... -Ostrich",
                timestamp: "29/01/2022 11:48:37",
              },
              2: {
                blogcomment:
                  "Haha nice try! I bet next time you'll say that chairs don't exist...",
                timestamp: "29/01/2022 12:22:07",
              },
            },
            emoji: {
              1: {
                emojiCount: 231,
              },
              2: {
                emojiCount: 175,
              },
              3: {
                emojiCount: 98,
              },
            },
          },
          refIndex: 0,
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app).get("/search?q=ostrich").expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).get("/search?q=ostrich").expect(200, done);
  });
});

//POST

describe("POST Create a blog post", () => {
  test("responds with correct data", (done) => {
    request(app)
      .post("/blog")
      .send({
        blogtitle: "this is a create blog title test",
        blogcontent: "this is a create blog content test",
      })
      .expect(
        {
          blogtitle: "this is a create blog title test",
          blogcontent: "this is a create blog content test",
          timestamp: dayjs()
            .format("DD/MM/YYYY " + "hh:mm:ss")
            .toString(),
          comment: {},
          emoji: {
            1: {
              emojiCount: 0,
            },
            2: {
              emojiCount: 0,
            },
            3: {
              emojiCount: 0,
            },
          },
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app)
      .post("/blog")
      .send({
        blogtitle: "this is a create blog title test",
        blogcontent: "this is a create blog content test",
      })
      .expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app)
      .post("/blog")
      .send({
        blogtitle: "this is a create blog title test",
        blogcontent: "this is a create blog content test",
      })
      .expect(201, done);
  });

  test("if no requested title or content responds with status code 404", (done) => {
    request(app).post("/blog").send({}).expect(404, done);
  });
});

describe("POST Create a comment", () => {
  test("responds with correct data", (done) => {
    request(app)
      .post("/blog/3")
      .send({ blogcomment: "this is a create blog comment test" })
      .expect(
        {
          blogcomment: "this is a create blog comment test",
          timestamp: dayjs()
            .format("DD/MM/YYYY " + "hh:mm:ss")
            .toString(),
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app)
      .post("/blog/3")
      .send({ blogcomment: "this is a create blog comment test" })
      .expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app)
      .post("/blog/3")
      .send({ blogcomment: "this is a create blog comment test" })
      .expect(201, done);
  });

  test("if no requested comment responds with status code 404", (done) => {
    request(app).post("/blog/3").send({}).expect(404, done);
  });
});

// PATCH

describe("PATCH Edit a blog post", () => {
  test("responds with correct data", (done) => {
    request(app)
      .patch("/blog/2")
      .send({
        blogcontent: "this is a blog content test",
        blogtitle: "this is a blog title test",
      })
      .expect(
        {
          blogtitle: "this is a blog title test",
          blogcontent: "this is a blog content test",
          timestamp: "30/01/2022 10:34:46",
          gif: "https://media2.giphy.com/media/gHcPh3ehbRGik/giphy.webp?cid=112e516bpll6jg8e3bkezhdzjedxlzxfr7z4eyle2f9fub23&rid=giphy.webp&ct=g",
          comment: {
            1: {
              blogcomment: "OMG I thought I was the only one!",
              timestamp: "30/01/2022 11:07:55",
            },
            2: {
              blogcomment:
                "The same thing happened to me too. Join the Alien Believers Society for support!",
              timestamp: "30/01/2022 11:55:44",
            },
          },
          emoji: {
            1: { emojiCount: 167 },
            2: { emojiCount: 134 },
            3: { emojiCount: 122 },
          },
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app)
      .patch("/blog/2")
      .send({
        blogcontent: "this is a blog content test",
        blogtitle: "this is a blog title test",
      })
      .expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app)
      .patch("/blog/2")
      .send({
        blogcontent: "this is a blog content test",
        blogtitle: "this is a blog title test",
      })
      .expect(200, done);
  });
});

describe("PATCH Edit a comment", () => {
  test("responds with correct data", (done) => {
    request(app)
      .patch("/blog/1/comment/1")
      .send({ blogcomment: "this is a blog comment test" })
      .expect(
        {
          blogcomment: "this is a blog comment test",
          timestamp: "29/01/2022 11:48:37",
        },
        done
      );
  });

  test("responds with json", (done) => {
    request(app)
      .patch("/blog/1/comment/1")
      .send({ blogcomment: "this is a blog comment test" })
      .expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app)
      .patch("/blog/1/comment/1")
      .send({ blogcomment: "this is a blog comment test" })
      .expect(200, done);
  });
});

describe("PATCH Increase the emoji count by 1", () => {
  test("responds with correct data", (done) => {
    request(app)
      .patch("/blog/1/emoji/2/plus")
      .expect({ emojiCount: 176 }, done);
  });

  test("responds with json", (done) => {
    request(app)
      .patch("/blog/1/emoji/2/plus")
      .expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).patch("/blog/1/emoji/2/plus").expect(200, done);
  });
});

describe("PATCH Decrease the emoji count by 1", () => {
  test("responds with correct data", (done) => {
    request(app)
      .patch("/blog/1/emoji/1/minus")
      .expect({ emojiCount: 230 }, done);
  });

  test("responds with json", (done) => {
    request(app)
      .patch("/blog/1/emoji/1/minus")
      .expect("Content-Type", /json/, done);
  });

  test("responds with status code 200", (done) => {
    request(app).patch("/blog/1/emoji/1/minus").expect(200, done);
  });
});

// DELETE

describe("DELETE blog post", () => {
  test("responds with status code 204", (done) => {
    request(app).delete("/blog/1").expect(204, done);
  });
});

describe("DELETE comment on blog post", () => {
  test("responds with status code 204", (done) => {
    request(app).delete("/blog/2/comment/2").expect(204, done);
  });
});
