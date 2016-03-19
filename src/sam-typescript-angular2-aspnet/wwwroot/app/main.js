System.register(['angular2/platform/browser', './rocket/rocket.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, rocket_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (rocket_component_1_1) {
                rocket_component_1 = rocket_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(rocket_component_1.RocketComponent)
                .catch((error) => console.error(error));
        }
    }
});
//# sourceMappingURL=main.js.map