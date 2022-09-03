import cypress from 'cypress'

const siteUrl: string = 'http://localhost:3000/#/'

describe('dashboard', () => {
	beforeEach(() => {
		cy.fixture('blogs').then((blogs) => {
			cy.intercept('GET', `${Cypress.env('server')}/api/blogs`, blogs).as(
				'blogsCall'
			)
			cy.visit(siteUrl)
			cy.wait('@blogsCall')
		})
	})

	it('intercepts', () => {
		// The blog fixture sets the headers to 'TEST BLOG 1 & 2'
		cy.get('h5.card-header').eq(0).contains('TEST BLOG 1')
		cy.get('h5.card-header').eq(1).contains('TEST BLOG 2')
	})

	it('displays the hero', () => {
		// Hero header
		cy.get('h1.display-5.fw-bold.lh-1.mb-3').contains(
			'Lorem ipsum dolor sit amet.'
		)

		// Hero text
		cy.get('p.lead').contains(
			'Id porta nibh venenatis cras sed felis eget velit. '
		)
	})

	it('displays both blogs', () => {
		cy.get('div.card-body').eq(0).should('be.visible')
		cy.get('div.card-body').eq(1).should('be.visible')
	})

	it('displays the blog card correctly', () => {
		cy.get('div.card-body').children().should('have.length', 6)
		cy.get('h5.card-header').eq(0).contains('TEST BLOG 1')

		// Author and date written
		cy.get('p.card-text')
			.eq(0)
			.children()
			.eq(0)
			.contains('Written by NeptuneRjo')
		cy.get('p.card-text').eq(0).children().eq(1).contains('days ago')

		// Visit button
		cy.get('a.btn.btn-primary')
			.contains('Visit blog')
			.should('have.attr', 'href')
			.and('include', '#/blog/6301d878aab1bd4c98e654af')
	})
})

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
