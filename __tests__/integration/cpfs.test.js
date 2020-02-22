//TODO - tenho que ver como rodar os testes em uma base diferente
//O jest não possibilita que eu chame uma rota para testar, por isso inclui o supertest
const request = require('supertest')
const app = require('../../src/app')
const repository = require('../../src/repositories/cpf.repository');

describe('AddCpf', ()=>{

    it('Should return a 204',async ()=>{

        const cpf = {cpf: '44213382060'};

        
        const response  = await request(app)
            .post('/cpf')
            .send(cpf);

        expect(response.status).toBe(204);
    });  


    it('Should return an InvalidCpfException',async ()=>{

        const cpf = {cpf: '22222222222'};

        const response  = await request(app)
            .post('/cpf')
            .send(cpf);

        expect(response.body.type).toBe("InvalidCpfException");
    });

    it('Should return an ExistsCpfException',async ()=>{

        const cpf = {cpf: '44213382060'};

        const response  = await request(app)
            .post('/cpf')
            .send(cpf);

        expect(response.body.type).toBe("ExistsCpfException");
    });   

});


describe('Check CPF', ()=>{

    it("Should return a 200", async ()=>{
    
        const response  = await request(app)
            .get(`/cpf/${'44213382060'}`)
            .send();

        expect(response.status).toBe(200);
    });

    it("Should return an InvalidCpfException", async ()=>{
    
        const cpf = '22222222222';

        const response  = await request(app)
            .get(`/cpf/${cpf}`)
            .send();

        expect(response.body.type).toBe('InvalidCpfException');
    });

    it("Should return an NotFoundCpfException", async ()=>{
    
        const cpf = '33777667072';

        const response  = await request(app)
            .get(`/cpf/${cpf}`)
            .send();

        expect(response.body.type).toBe('NotFoundCpfException');
    });


});

describe('RemoveCPF', ()=>{

    

    it("Should return a 204", async ()=>{

        const cpfBody = {cpf: '33777667072'};

        
        const responseAdd  = await request(app)
            .post('/cpf')
            .send(cpfBody);

    
        const responseRemove  = await request(app)
            .delete(`/cpf/${cpfBody.cpf}`)
            .send();

        expect(responseRemove.status).toBe(204);
    });  


    it("Should return an InvalidCpfException", async ()=>{

        const cpf = '22222222222';

        const responseRemove  = await request(app)
            .delete(`/cpf/${cpf}`)
            .send();


        expect(responseRemove.body.type).toBe('InvalidCpfException');
    });  
    

    
    it("Should return an NotFoundCpfException", async ()=>{

        const cpf = '33777667072';

        const responseRemove  = await request(app)
            .delete(`/cpf/${cpf}`)
            .send();

        expect(responseRemove.body.type).toBe('NotFoundCpfException');
    });  


});

describe('FindAllCPFs', ()=>{

    it("Should return a 200 and an array with values", async ()=>{
    
        var test = true;

        const response  = await request(app)
            .get('/cpf')
            .send();

        if(response.status == 200 && !response.body){
            test = false;
        }

        expect(test).toBe(true);
    });  

    it("Should return a 200 and an empty array", async ()=>{
    
        var test = false;

        await repository.deleteAllCpf();

        const response  = await request(app)
            .get('/cpf')
            .send();

        if(response.status == 200  &&
           response.body.length == 0){

            test = true;
        }

        expect(test).toBe(true);
    });  


});

