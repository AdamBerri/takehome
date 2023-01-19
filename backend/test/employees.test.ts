import { expect } from 'chai';
import { it, describe } from 'mocha'
import { agent as request } from 'supertest';


import Application from '../src/app';
const app = new Application()


describe('#employees', () => {

    it('Should return success', async () => {
        const res = await request(app.service).get('/v1/employees').send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(5)
        expect(res.body[0].id).to.equal('82837')
        expect(res.body.error).to.be.undefined;
    })

    it('Department ID should Work for 2', async () => {
        const res = await request(app.service).get('/v1/departments/2').send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(2)
        expect(res.body[0].id).to.equal('82338')
        expect(res.body.error).to.be.undefined;
    })

    it('Department ID should Work for 3', async () => {
        const res = await request(app.service).get('/v1/departments/3').send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(1)
        expect(res.body[0].id).to.equal('82837')
        expect(res.body.error).to.be.undefined;
    })

    it('Department ID should Work for 4', async () => {
        const res = await request(app.service).get('/v1/departments/4').send();
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.a('array')
        expect(res.body.length).to.equal(2)
        expect(res.body[0].id).to.equal('81832')
        expect(res.body.error).to.be.undefined;
    })

    //Making sure the 404 is launched when its the wrong department
    it('Department ID should not work for 6 (out of bounds)', async () => {
        const res = await request(app.service).get('/v1/departments/6').send();
        expect(res.status).to.equal(404);
    })

})