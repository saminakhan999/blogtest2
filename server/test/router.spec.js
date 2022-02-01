const request = require('supertest');
const app = require('../app.js');
const dayjs = require("dayjs");
var relativeTime = require('dayjs/plugin/relativeTime')
var utc = require('dayjs/plugin/utc');
dayjs.extend(relativeTime)
dayjs.extend(utc)


// GET

describe('GET all blog posts', () => {

    test('responds with correct data', (done) => {
        request(app)
        .get('/blog')
        .expect({
            "1":{
            "blogtitle": "Ostriches dont exist",
            "blogcontent": "Scientists recently discovered that ostriches are just a large form of pigeon....",
            "timestamp": "Sat, 29 Jan 2022 11:45:33 GMT",
            "gif": "",
            "comment": {"1":{
                "blogcomment": "Hiiii",
                "timestamp": "Sat, 29 Jan 2022 11:48:37 GMT"
            }, "2":{
                "blogcomment": "Yoooooo",
                "timestamp": "Sat, 29 Jan 2022 12:22:07 GMT"
            }},
            "emoji": {"1":{"emojiCount": 231 }, "2":{"emojiCount": 175}, "3":{"emojiCount": 98}}
            },
        
        
            "2":{
            "blogtitle": "Are Aliens real?",
            "blogcontent": "I never thought Aliens could be real...",
            "timestamp": "Sun, 30 Jan 2022 10:34:46 GMT",
            "gif": "",
            "comment": {"1":{
                "blogcomment": "HAHAHAHAA",
                "timestamp": "Sun, 30 Jan 2022 11:07:55 GMT"
                
            }, "2":{
                "blogcomment": "GOOD ONE!!!",
                "timestamp": "Sun, 30 Jan 2022 11:55:44 GMT"
            }},
            "emoji": {"1":{"emojiCount": 167 }, "2":{"emojiCount": 134}, "3":{"emojiCount": 122}}
            },
        
            "3":{ 
            "blogtitle": "My brother believes in Aliens",
            "blogcontent": "...",
            "timestamp": "Mon, 31 Jan 2022 12:04:22 GMT",
            "gif": "",
            "comment": {"1":{
                "blogcomment": "Ratio",
                "timestamp": "Mon, 31 Jan 2022 12:12:12 GMT"
            }, "2":{
                "blogcomment": "It's true I do!!!",
                "timestamp": "Mon, 31 Jan 2022 12:17:10 GMT"
            }},
            "emoji": {"1":{"emojiCount": 160 }, "2":{"emojiCount": 133}, "3":{"emojiCount": 276}}
            }
        }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .get('/blog')
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .get('/blog')
        .expect(200, done)
    });

});




describe('GET specific blog post', () => {

    test('responds with correct data', (done) => {
        request(app)
        .get('/blog/3')
        .expect({ 
            "blogtitle": "My brother believes in Aliens",
            "blogcontent": "...",
            "timestamp": "Mon, 31 Jan 2022 12:04:22 GMT",
            "gif": "",
            "comment": {"1":{
                "blogcomment": "Ratio",
                "timestamp": "Mon, 31 Jan 2022 12:12:12 GMT"
            }, "2":{
                "blogcomment": "It's true I do!!!",
                "timestamp": "Mon, 31 Jan 2022 12:17:10 GMT"
            }},
            "emoji": {"1":{"emojiCount": 160 }, "2":{"emojiCount": 133}, "3":{"emojiCount": 276}}
            }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .get('/blog/3')
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .get('/blog/3')
        .expect(200, done)
    });

});


describe('GET all comments from a blog post', () => {

    test('responds with correct data', (done) => {
        request(app)
        .get('/blog/1/comment')
        .expect({
            "1": {
              "blogcomment": "Hiiii",
              "timestamp": "Sat, 29 Jan 2022 11:48:37 GMT"
            },
            "2": {
              "blogcomment": "Yoooooo",
              "timestamp": "Sat, 29 Jan 2022 12:22:07 GMT"
            }
          }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .get('/blog/1/comment')
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .get('/blog/1/comment')
        .expect(200, done)
    });

});



describe('GET individual comments from blog post', () => {

    test('responds with correct data', (done) => {
        request(app)
        .get('/blog/1/comment/1')
        .expect({
            "blogcomment": "Hiiii",
            "timestamp": "Sat, 29 Jan 2022 11:48:37 GMT"
          }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .get('/blog/1/comment/1')
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .get('/blog/1/comment/1')
        .expect(200, done)
    });

});


describe('GET Emoji from blog', () => {

    test('responds with correct data', (done) => {
        request(app)
        .get('/blog/2/emoji/2')
        .expect( { emojiCount: 134 }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .get('/blog/2/emoji/2')
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .get('/blog/2/emoji/2')
        .expect(200, done)
    });

});



//POST 


describe('POST Create a blog post', () => {

    test('responds with correct data', (done) => {
        request(app)
        .post('/blog')
        .send({
            "blogtitle": "this is a create blog title test",
            "blogcontent": "this is a create blog content test"
          })
        .expect({
            "blogtitle": "this is a create blog title test",
            "blogcontent": "this is a create blog content test",
            "timestamp": dayjs().format('DD/MM/YYYY ' + 'hh:mm:ss').toString(),
            "comment": "",
            "emoji": {
              "1": {
                "emojiCount": 0
              },
              "2": {
                "emojiCount": 0
              },
              "3": {
                "emojiCount": 0
              }
            }
          }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .post('/blog')
        .send({
            "blogtitle": "this is a create blog title test",
        "blogcontent": "this is a create blog content test"
          })
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .post('/blog')
        .send({
            "blogtitle": "this is a create blog title test",
            "blogcontent": "this is a create blog content test"
          })
        .expect(201, done)
    });

});


describe('POST Create a comment', () => {

    test('responds with correct data', (done) => {
        request(app)
        .post('/blog/3')
        .send({blogcomment: "this is a create blog comment test"})
        .expect({
            "blogcomment": "this is a create blog comment test",
            "timestamp": dayjs().format('DD/MM/YYYY ' + 'hh:mm:ss').toString()
          }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .post('/blog/3')
        .send({blogcomment: "this is a create blog comment test"})
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .post('/blog/3')
        .send({blogcomment: "this is a create blog comment test"})
        .expect(201, done)
    });

});




// PATCH 

describe('PATCH Edit a blog post', () => {

    test('responds with correct data', (done) => {
        request(app)
        .patch('/blog/2')
        .send({blogcontent: "this is a blog content test", blogtitle: "this is a blog title test"})
        .expect({
            blogtitle: 'this is a blog title test',
            blogcontent: 'this is a blog content test',
            timestamp: 'Sun, 30 Jan 2022 10:34:46 GMT',
            gif: '',
            comment: {
              '1': {
                blogcomment: 'HAHAHAHAA',
                timestamp: 'Sun, 30 Jan 2022 11:07:55 GMT'
              },
              '2': {
                blogcomment: 'GOOD ONE!!!',
                timestamp: 'Sun, 30 Jan 2022 11:55:44 GMT'
              }
            },
            emoji: {
              '1': { emojiCount: 167 },
              '2': { emojiCount: 134 },
              '3': { emojiCount: 122 }
            }
          }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .patch('/blog/2')
        .send({blogcontent: "this is a blog content test", blogtitle: "this is a blog title test"})
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .patch('/blog/2')
        .send({blogcontent: "this is a blog content test", blogtitle: "this is a blog title test"})
        .expect(200, done)
    });

});

describe('PATCH Edit a comment', () => {

    test('responds with correct data', (done) => {
        request(app)
        .patch('/blog/1/comment/1')
        .send({blogcomment: "this is a blog comment test"})
        .expect({
            "blogcomment": "this is a blog comment test",
            "timestamp": "Sat, 29 Jan 2022 11:48:37 GMT"
          }, done)
    });

    test('responds with json', (done) => {
        request(app)
        .patch('/blog/1/comment/1')
        .send({blogcomment: "this is a blog comment test"})
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .patch('/blog/1/comment/1')
        .send({blogcomment: "this is a blog comment test"})
        .expect(200, done)
    });

});


describe('PATCH Increase the emoji count by 1', () => {

    test('responds with correct data', (done) => {
        request(app)
        .patch('/blog/1/emoji/2')
        .expect({emojiCount: 176}, done)
    });

    test('responds with json', (done) => {
        request(app)
        .patch('/blog/1/emoji/2')
        .expect('Content-Type', /json/, done)
    });

    test('responds with status code 200', (done) => {
        request(app)
        .patch('/blog/1/emoji/2')
        .expect(200, done)
    });

});




// DELETE

describe('DELETE blog post', () => {
    test('responds with status code 204', (done) => {
        request(router)
        .delete('/blog/1')
        .expect(204, done);
    });
});


describe('DELETE comment on blog post', () => {
    test('responds with status code 204', (done) => {
        request(router)
        .delete('/blog/2/comment/2')
        .expect(204, done);
    });
});

