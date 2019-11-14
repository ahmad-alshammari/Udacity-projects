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


        /* this is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URL is defined and it is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toEqual('string');
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /*  suite test "The menu" */
    describe('The menu', function() {


        /* This is a test that ensures the menu element is
         * hidden by default. */
        it('Menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This is a test that ensures the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('Menu changes visibility when the menu icon is clicked', function() {
            var hamburger = $('.menu-icon-link');
            hamburger.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            hamburger.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* this is test suite called "Initial Entries" */

     describe('Initial Entries', function () {

        // beforeEach and asynchronous done() function.
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // This a test that ensures there is at least a single entry element within the feed container..
        it('To be called and contain at least one feed.', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
        /* This is a test suite Called "New Feed Selection" */
     describe('New Feed Selection', function () {       
         var feedOne;
         var feedTwo;

         // beforeEach and asynchronous done() function.
         beforeEach(function (done) {
             loadFeed(0, function () {
                 //Store Feed one
                 feedOne = $('.feed').html();

                 loadFeed(1, function () {
                     //Store Feed two
                     feedTwo = $('.feed').html();
                          done();
                 });
             });
         });

         /* This is a test that ensures when a new feed is loaded
         by the loadFeed function that the content actually changes.*/
         it('To be change the feed content after feed is loaded ', function (){
             expect(feedOne).not.toBe(feedTwo);
         });
     });
}());

