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

            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed.url).toBeDefined();
                expect(isUrl(feed.url)).toBe(true);
            }

            //http://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
            function isUrl(s) {
                var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return regexp.test(s);
            }

        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have a non empty name', function() {

            for (var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name.length > 0).toBe(true);
            }
        });
    });

    /* Test suite - 'The Menu'
     * This suite is all about test for the app menu
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

        it('click on menu icon toggles menu', function() {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /* Test suite - 'Initial Entries'
     * This suite is ....
     */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0);
            done();
        });

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('load feed adds entry class to feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });


    /* Test suite - 'New Feed Selection'
     * This suite is ....
     */
    describe('New Feed Selection', function() {

        var firstFeedTitle, firstFeedEntries,
            secondFeedTitle, secondFeedEntries;

        beforeEach(function(done) {
            loadFeed(1, function() {
                // async load first feed item
                firstFeedTitle = $('.header-title').text();
                firstFeedEntries = $('entry');
                done();
            });
        });

        /* a test that ensures when a new feed is loaded the content changes
         */
        it('on new loadFeed the feed content changes', function(done) {
            // async load second feed item
            loadFeed(2, function() {
                secondFeedTitle = $('.header-title').text();
                secondFeedEntries = $('.entry');
                // the heading for the feed should have changed
                expect(firstFeedTitle).not.toBe(secondFeedTitle);
                // the feed entries for the feed should have changed
                expect(firstFeedEntries).not.toBe(secondFeedEntries);
                done();
            });

        });

        afterEach(function(done) {
          // reset app so that the initial feed is selected
            loadFeed(0);
            done();
        });
    });
}());
