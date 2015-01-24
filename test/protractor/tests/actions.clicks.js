"use strict";

var init = require("../bs.init");

describe("Scrolling around", function () {
    var ptor     = protractor;
    var instance;
    var urls;
    beforeEach(function () {
        browser.ignoreSynchronization = true;
        if (instance) {
            return;
        }
        var config = {
            server: "test/fixtures",
            open: false,
            logLevel: "silent"
        };
        init(protractor, config).then(function (bs) {
            instance = bs;
            urls = instance.getOption("urls").toJS();
        });
    });
    it("should mirror clicks on hrefs", function () {

        browser.get(urls.local + "/scrolling.html");
        browser.executeScript("window.open('%s')".replace("%s", urls.local + "/scrolling.html"));

        browser.getAllWindowHandles().then(function (handles) {

            browser.switchTo().window(handles[1]).then(function () {

                element(by.css("a")).click(); // go to the link

                browser.executeScript("window.close()");

                browser.switchTo().window(handles[0]).then(function () {
                    expect(browser.getCurrentUrl()).toContain("index.html");
                    instance.cleanup();
                });
            });
        });
    });
});
