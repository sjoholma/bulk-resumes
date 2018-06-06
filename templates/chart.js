var system = require('system');
var args = system.args;

// https://github.com/ariya/phantomjs/blob/master/examples/waitfor.js
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis || 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function () {
            if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
                // If not time-out yet and condition not yet fulfilled
                condition = testFx();
            } else if (!condition) {
                // If condition still not fulfilled (timeout but condition is 'false')
                console.log("Chart generation timeout");
                phantom.exit(1);
            } else {
                // Condition fulfilled (timeout and/or condition is 'true')
                console.log("Chart generation took " + (new Date().getTime() - start) + "ms.");
                onReady(); //< Do what it's supposed to do once the condition is fulfilled
                clearInterval(interval); //< Stop this interval
            }
        }, 250); //< repeat check every 250ms
}

function flushToOutputFile(outputFile, svgHtml) {
    var page = require('webpage').create();
    page.content = svgHtml;
    page.render(outputFile, {
        format: 'pdf',
        quality: '100',
    });
}

function generateChart(content, outputFile) {
    var page = require('webpage').create(),
        // Encode scandics
        uri = encodeURI(content);

    page.open(uri, function () {
        waitFor(function () {
            // Wait until Google has generated the svg chart
            return page.evaluate(function () {
                return $("svg").is(":visible");
            });
        }, function () {
            var chartXml = page.evaluate(function () {
                return new XMLSerializer().serializeToString($('#chart')[0]);
            });
            flushToOutputFile(outputFile, chartXml);
            phantom.exit();
        });
    });

    page.onConsoleMessage = function log(msg) {
        console.log(msg);
    };
}

generateChart(args[1], args[2]);
