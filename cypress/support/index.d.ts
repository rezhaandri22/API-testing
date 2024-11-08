// cypress/support/index.d.ts
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command untuk memeriksa jika respons tidak terotorisasi
         * @param response - Respons yang akan diperiksa
         */
        unauthorized(response: any): Chainable<void>;

        /**
         * Custom command untuk melakukan request dan verifikasi respons tidak terotorisasi
         * @param method - Metode HTTP yang digunakan (misalnya, 'GET', 'POST')
         * @param url - URL endpoint
         */
        checkUnauthorized(method: string, url: string): Chainable<void>;

        /**
         * Custom command untuk login
         */
        login(): Chainable<void>;

        /**
         * Custom command untuk mereset pengguna
         */
        resetUsers(): Chainable<void>;
    }
}
