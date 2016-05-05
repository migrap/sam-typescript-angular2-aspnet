import { Component, ElementRef, DynamicComponentLoader, ComponentRef, Injector, ViewContainerRef, ViewChild } from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';
import {RocketActions} from './rocket.actions';
import {RocketModel} from './rocket.model';
import {RocketState} from './rocket.state';
import {RocketViews} from './rocket.views';
import {Sam} from '../sam/sam.component';

declare var jQuery: any;
declare var System: any;

@Component({
    selector: 'rocket',
    templateUrl: './app/rocket/rocket.template.html',
    styleUrls: ['./app/rocket/rocket.style.css']
})
export class RocketComponent extends Sam<RocketActions, RocketModel, RocketState, RocketViews> {
    private component: ComponentRef;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef, private injector: Injector) {
        super(RocketActions, RocketModel, RocketState, RocketViews);
        this.actions.init();
    }

    @ViewChild('viewport', { read: ViewContainerRef })
    private viewport: ViewContainerRef;

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
                //this.loader.loadNextToLocation(representation, this.viewport);//.then((component) => {
                    //if(this.component && isPresent(this.component)){
                    //    (this.component as any).dispose();
                    //    this.component = null;
                    //}
                    //component.instance.rocket = this;
                    //this.component = component;
                //});
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
}