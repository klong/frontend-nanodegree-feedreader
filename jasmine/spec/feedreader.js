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

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty (or a valid url).
         */
        it('all feeds have a non empty url', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

            allFeeds.forEach(function (feed) {
              expect(feed.url).toBeDefined();
              expect(isUrl(feed.url)).toBe(true);
            });

            //http://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
            function isUrl(s) {
                var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return regexp.test(s);
            }

        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have a non empty name', function() {

            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);

            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name.length > 0).toBe(true);
            }
        });

    });

    /* Test suite - 'The Menu'
     * This suite is all about testing the app menu
     */
    describe('The Menu', function() {

        /* a test that ensures the menu element
        is hidden by default.*/
        it('menu element is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        var menuIconExists = ($('.menu-icon-link').length === 0) ? false : true;

        it('click on menu icon toggles menu', function() {
            // check that the menu-icon-link element exisits
            expect(menuIconExists).toBe(true);
            // simulate a first mouse click on menu-icon
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // simulate a second mouse click on menu-icon
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* Test suite - 'Initial Entries'
     */
    describe('Initial Entries', function() {

        var loadFeedCallBackTest = false;

        beforeEach(function(done) {
            loadFeedCallBackTest = true;
            loadFeed(0, done);
        });

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('load feed adds entry class to feed container', function() {
            expect(loadFeedCallBackTest).toBe(true);
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });


    /* Test suite - 'New Feed Selection'
     */
    describe('New Feed Selection', function() {

        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBeLessThan(2);

            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                  secondFeed = $('.feed').html();
                  done();
                });
            });
        });

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('should change content', function() {
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());
