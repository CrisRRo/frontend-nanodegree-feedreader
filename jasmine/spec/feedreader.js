/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test makes sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 it('have URL (not empty, string type)', function() {
			 allFeeds.forEach(function(val) {
				 expect(val.url).toBeTruthy();
				 expect(typeof val.url).toBe('string');
			 });
		 });

        /* This test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('have name (not empty, string type)', function() {
			 allFeeds.forEach(function(val) {
				 expect(val.name).toBeTruthy();
				 expect(typeof val.name).toBe('string');
			 });
		 });
    });

    /* A test suite for menu testing */
    describe('The menu', function() {
		var menuIcon = $('.menu-icon-link');
        /* This test ensures the menu element is
        * hidden by default.
        */
		it('is hidden by default', function() {
			// "body" default class is "menu-hidden"
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

        /* This test ensures the menu changes
        * visibility when the menu icon is clicked. We
		* have two expectations: the menu display when
        * clicked and it hide when clicked again.
        */
		it('changes visibility on click', function() {
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			menuIcon.click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

    /* A test suite  for testing initial entries */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * LoadFeed() is asynchronous so, for this test,
         * we use of Jasmine's beforeEach and asynchronous done() function.
         */
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		 it('is at least one entry in the initial feed', function() {
			 expect($('.feed .entry').length).toBeGreaterThan(0);
		 });
	});

    /* A test suite for testing the correct loading of feeds */
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Note that loadFeed() is asynchronous.
         */
		 var firstFeed,
			 secondFeed;

		 beforeEach(function(done) {
			loadFeed(0, function() {
				firstFeed = $('.feed')['0'].innerText;

				loadFeed(1, function() {
					secondFeed = $('.feed')['0'].innerText;
					done();
				});
			});
		 });

		 it('has new content when a new feed is loaded', function() {
			 // console.log(firstFeed);
			 // console.log(secondFeed);

			 expect(firstFeed).not.toEqual(secondFeed);
		 });
	});
}());
