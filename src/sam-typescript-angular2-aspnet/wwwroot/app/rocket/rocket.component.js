System.register(['angular2/core', './rocket.actions', './rocket.model', './rocket.state', './rocket.views', '../sam/sam.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, rocket_actions_1, rocket_model_1, rocket_state_1, rocket_views_1, sam_component_1;
    var RocketComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rocket_actions_1_1) {
                rocket_actions_1 = rocket_actions_1_1;
            },
            function (rocket_model_1_1) {
                rocket_model_1 = rocket_model_1_1;
            },
            function (rocket_state_1_1) {
                rocket_state_1 = rocket_state_1_1;
            },
            function (rocket_views_1_1) {
                rocket_views_1 = rocket_views_1_1;
            },
            function (sam_component_1_1) {
                sam_component_1 = sam_component_1_1;
            }],
        execute: function() {
            let RocketComponent = class RocketComponent extends sam_component_1.Sam {
                constructor(loader, elementRef, injector) {
                    super(rocket_actions_1.RocketActions, rocket_model_1.RocketModel, rocket_state_1.RocketState, rocket_views_1.RocketViews);
                    this.loader = loader;
                    this.elementRef = elementRef;
                    this.injector = injector;
                    this.actions.init();
                }
                ngOnInit() {
                    this.views.updated.subscribe((representation) => {
                        // Not sure how efficient this is at replacing the DOM. Gut tells me it's exspensive.
                        // Could create a single view/template with ngIfs and a ViewModel that it would bind to.
                        // ViewModel properties would updated based on state
                        if (this.component == undefined || this.component.componentType.name !== representation.name) {
                            var promise = this.loader.loadNextToLocation(representation, this.viewport);
                            promise.catch((reason) => {
                                console.error(reason);
                            });
                            promise.then((component) => {
                                console.log(component);
                            });
                        }
                    });
                    this.views.updated.subscribe((reprsentation) => {
                        if (this.state.launched(this.model)) {
                            jQuery('rocket').find('#rocket_launch').css("margin-bottom", "1000px");
                            jQuery('rocket').find('.cloud_fill').css("animation", "smoke_size .35s infinite");
                            jQuery('rocket').find('.rocket_shadow').css("animation", "shadow_flare .35s infinite");
                        }
                    });
                    this.views.updated.next(this.views.representation);
                }
            };
            __decorate([
                core_1.ViewChild('viewport', { read: core_1.ViewContainerRef }), 
                __metadata('design:type', core_1.ViewContainerRef)
            ], RocketComponent.prototype, "viewport", void 0);
            RocketComponent = __decorate([
                core_1.Component({
                    selector: 'rocket',
                    templateUrl: './app/rocket/rocket.template.html',
                    styleUrls: ['./app/rocket/rocket.style.css']
                }), 
                __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ElementRef, core_1.Injector])
            ], RocketComponent);
            exports_1("RocketComponent", RocketComponent);
        }
    }
});
//# sourceMappingURL=rocket.component.js.map