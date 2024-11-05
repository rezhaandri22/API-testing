describe('Psot module', () => {
  before('login', () => {
    cy.login();
  });

  describe('Create Post', () => {
    /**
     * 1. return  unauthorized
     * 2. return error validation messages
     * 3. return correct post
     */

    it('should return unauthorized', () => {
      cy.checkUnauthorized('POST', '/posts');
    });

    it('should return error validation messages', () => {
      cy.request({
        method: 'POST',
        url: '/posts',
        headers: {
          authorization: `Bearer ${Cypress.env('token')}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        cy.badRequest(response, [
          'title must be a string',
          'content must be a string',
        ]);
      });
    });

    it('should return correct post', () => {
      const mockPost = {
        title: 'ini title',
        content: 'content 1',
      };
      cy.request({
        method: 'POST',
        url: '/posts',
        headers: {
          authorization: `Bearer ${Cypress.env('token')}`,
        },
        body: {
          title: mockPost.title,
          content: mockPost.content,
        },
      }).then((response) => {
        const {
          success,
          data: { title, content, comments },
        } = response.body;
        expect(response.status).to.eq(201);
        expect(success).to.be.true;
        expect(title).to.eq(mockPost.title);
        expect(content).to.eq(mockPost.content);
        expect(comments.length).to.eq(0);
      });
    });
  });
});
