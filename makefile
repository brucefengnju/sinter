test:
	test:
	@NODE_ENV=test DEBUG=sinter:* ./node_modules/.bin/mocha ./test/*.mocha.js


.PHONY: test