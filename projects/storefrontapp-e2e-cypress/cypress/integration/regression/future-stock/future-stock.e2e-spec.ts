import { waitForPage, waitForProductPage } from '../../../helpers/checkout-flow';
import { viewportContext } from '../../../helpers/viewport-context';
import { login } from '../../../helpers/auth-forms';

// 3318057
// 4567181
const productIdWithFutureStock = '3318057';
// 3881014
// 3755219
const productIdWithoutFutureStock = '3755219';

const b2bUser = {
	email: 'mark.rivers@pronto-hw.com',
	password: 'pw4all',
};

describe('Future Stock', () => {
	viewportContext(['desktop'], () => {
		before(() => {
			cy.window().then((win) => {
        win.sessionStorage.clear();
      });
		});

		it('when not logged in, future stock dropdown should not be visible', () => {
			const productPage = waitForProductPage(
				productIdWithFutureStock,
				'getProductPage'
			);

			cy.visit(`/product/${productIdWithFutureStock}`);
			cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

			cy.get('cx-future-stock').should('not.exist');
		});

		it('when logged in, future stock dropdown should be visible', () => {
			const loginPage = waitForPage('/login', 'getLoginPage');
			const productPage = waitForProductPage(
				productIdWithFutureStock,
				'getProductPage'
			);

			cy.visit(`/product/${productIdWithFutureStock}`);
			cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

      cy.findByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
			login(b2bUser.email, b2bUser.password);

			cy.get('cx-future-stock').should('be.visible');
		});

		it('should contain proper quantity', () => {
			cy.get('cx-future-stock-accordion button').click();
			cy.contains('cx-future-stock-accordion', '3/10/18 - Qty 50');
		});

		it('when choosing other product, future stock dropdown should contain no information', () => {
			const loginPage = waitForPage('/login', 'getLoginPage');
			// const productPage = waitForProductPage(
			// 	productIdWithFutureStock,
			// 	'getProductPage'
			// );

			cy.visit(`/product/${productIdWithoutFutureStock}`);
			// cy.wait(`@${productPage}`).its('response.statusCode').should('eq', 200);

			cy.findByText(/Sign in \/ Register/i).click();
      cy.wait(`@${loginPage}`).its('response.statusCode').should('eq', 200);
			login(b2bUser.email, b2bUser.password);

			cy.get('cx-future-stock').should('be.visible');
			cy.get('cx-future-stock-accordion button').click();
			cy.contains('cx-future-stock-accordion', 'This product has no future availability information');
		});
	});
});