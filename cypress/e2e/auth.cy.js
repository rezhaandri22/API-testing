describe('Auth module', () => {
    const userData = {
        "name": "John Doe",
        "email": "johnp@nest.test",
        "password": "Secret_123",
    }
    describe('Register', () => {

        it('should return error message for validation', () => {
            cy.request({
                method: 'POST', // Perbaikan penulisan "method"
                url: '/auth/register',
                failOnStatusCode: false, // Perbaikan "failOnStatusCode"
            }).then((response) => {
                cy.badRequest(response, [
                    'name should not be empty',
                    'email should not be empty',
                    'password should not be empty',
                ])
            });
        });

        it('should return error message for invalid email format', () => {
            cy.request({
                method: 'POST', 
                url: '/auth/register',
                body: {
                    "name": userData.name,
                    "email": "john@ nest.test",
                    "password": userData.password,
                  },
                failOnStatusCode: false, 
            }).then((response) => {
                cy.badRequest(response, [
                   'email must be an email',
                ])
            });
        });

        it('should return error message for invalid password format', () => {
            cy.request({
                method: 'POST', 
                url: '/auth/register',
                body: {
                    "name": userData.name,
                    "email": userData.password,
                    "password": "invalidpassword",
                  },
                failOnStatusCode: false, 
            }).then((response) => {
                cy.badRequest(response, [
                    'password is not strong enough',
                 ])
            });
        });
        
        it('should successfuly registered', () => {
            cy.resetUsers()
            cy.request({
                method: 'POST', 
                url: '/auth/register',
                body: userData,
            }).then((response) => {
                const { id, name, email, password } = response.body.data;                
                expect(response.status).to.eq(201); // Sesuaikan status sesuai ekspektasi
                expect(response.body.success).to.be.true
                expect(id).not.to.be.undefined; // Sesuaikan status sesuai ekspektasi
                expect(name).to.eq('John Doe')
                expect(email).to.eq('johnp@nest.test'); // Sesuaikan status sesuai ekspektasi
                expect(password).to.be.undefined;
            });
        });

        it('should return  error because of duplicate email', () => {
            cy.request({
                method: 'POST', 
                url: '/auth/register',
                body: userData,
                failOnStatusCode: false,
            }).then((response) => {
                expect(response.status).to.eq(500)
                expect(response.body.success).to.be.false
                expect(response.body.message).to.eq('Email already exists')
            });
        });
    });
    
    describe('Login', () => { 
        /**
         * 1. unauthorized on Failed
         * 2. return access token on success
         */
        it('should unauthorized on failed', () =>  {
            cy.request({
                method: 'POST',
                url: '/auth/login',
                failOnStatusCode: false,
            }).then((response) =>{
                cy.unauthorized(response)
            })
            cy.request({
                method: 'POST',
                url: '/auth/login',
                body:{
                    email: userData.email,
                    password: 'wrong password',
                },
                failOnStatusCode: false,
            }).then((response) =>{
                cy.unauthorized(response)
            })
        })

        it('should return access token on success', () =>{
            cy.request({
                method: 'POST',
                url: '/auth/login',
                body:{
                    email: userData.email,
                    password: userData.password,
                },
            }).then((response) =>{
                expect(response.body.success).to.be.true
                expect(response.body.message).to.eq('Login success')
                expect(response.body.data.access_token).not.to.be.undefined
            })
        })
    })
    describe.only('Me', () => {
        /**
         * 1. unauthorized on Failed
         * 2. return access token on success
         */
        before('do login', () => {
            // Lakukan login sebelum pengujian untuk mendapatkan token
            cy.request({
                method: 'POST',
                url: '/auth/login',
                body: {
                    email: userData.email,
                    password: userData.password,
                },
            }).then((response) => {
                // Simpan token dari respons login ke Cypress.env
                Cypress.env('token', response.body.data.access_token);
            });
        })

        it('should return unauthorized when send no token', () => {
            cy.checkUnauthorized('GET', '/auth/me');
        })
        it('should return current data', () => {
            cy.request({
                method: 'GET',
                url: '/auth/me',
                headers: {
                    // Menggunakan token dari Cypress.env untuk autentikasi
                    authorization: `Bearer ${Cypress.env('token')}`,
                },
                failOnStatusCode: false,
              }).then((response) => {
                const { id, name, email, password } = response.body.data;                
                expect(response.status).to.eq(200); // Sesuaikan status sesuai ekspektasi
                expect(response.body.success).to.be.true
                expect(id).not.to.be.undefined; // Sesuaikan status sesuai ekspektasi
                expect(name).to.eq(userData.name)
                expect(email).to.eq(userData.email); // Sesuaikan status sesuai ekspektasi
                expect(password).to.be.undefined;
            })
        })
    })
});
