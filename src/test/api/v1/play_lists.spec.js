'use strict'

const request = require('supertest');
const app = require('../../../app');

describe('GET /api/v1/play_lists', () => {
    test('It should response the GET method', done => {
        request(app)
            .get('/api/v1/play_lists')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

describe('POST /api/v1/play_lists', () => {
    test('It should response the POST method', done => {
        const { id, title, color } = { id: 1, title: 'title', color: 0xffffff }

        request(app)
            .post('/api/v1/play_lists')
            .send({ id: id, title: title, color: color })
            .then(response => {
                expect(response.statusCode).toBe(201);
                expect(response.body.id).toEqual(id)
                done();
            });
    });
});