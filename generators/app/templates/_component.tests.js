/*
  The test scenario
*/
var expect = require("chai").expect;

describe("<%= props.name %> <%= props.type %>", function() {
	before(function() {
		browser.url("/components/preview/<%= props.name_dash %>");
		return browser;
	});

	it("should look like baseline", function() {
		return browser
			.compareScreen("<%= props.name_dash %>", {
			  	name: "<%= props.type %>",
			  	elem: ".<%= props.name_dash %>",
			  	screenWidth: [320, 768, 992, 1200, 1600]
			});
	});

});
