import cypress from 'cypress'

const siteUrl: string = 'http://localhost:3000/#/'

describe('blog page', () => {
	beforeEach(() => {
		// Intercepts the dashboard call
		cy.fixture('blogs').then((blogs) => {
			cy.intercept('GET', `${Cypress.env('server')}/api/blogs`, blogs).as(
				'blogsCall'
			)
			cy.visit(siteUrl)
			cy.wait('@blogsCall')
		})

		// Intercepts the call for the individual blog
		// and visits the blog page through the visit button on dashboard
		cy.fixture('blog').then((blog) => {
			cy.intercept(
				'GET',
				`${Cypress.env('server')}/api/blogs/6301d878aab1bd4c98e654af`,
				blog
			).as('blogCall')

			cy.get('a.btn.btn-primary').eq(0).click()
			cy.wait('@blogCall')
		})
	})

	it('routes to the correct blog', () => {
		cy.url().should(
			'be.equal',
			`http://localhost:3000/#/blog/6301d878aab1bd4c98e654af`
		)
	})

	it('displays the correct title', () => {
		cy.get('h3.title').should('be.visible').contains('Test Blog 1')
	})

	it('displays the date attribute', () => {
		cy.get('div.blog-date').should('be.visible').contains('days ago')
	})

	it('displays the correct author', () => {
		cy.get('h6.blog-author').should('be.visible').contains('NeptuneRjo')
	})

	it('displays the body', () => {
		cy.get('p.blog-text')
			.should('be.visible')
			.contains('Lorem ipsum dolor sit amet')
	})

	it('displays the comments form', () => {
		cy.get('.blog-comments-new form').should('be.visible')
	})

	it('displays a single comment', () => {
		cy.get('div.comment-main').should('have.length', 1)
	})

	it('displays the proper comment body', () => {
		cy.get('div.comment-body').should('be.visible').contains('Hello World')
	})

	it('displays the proper comment author', () => {
		cy.get('div.comment-username').should('be.visible').contains('NeptuneRjo')
	})
})
