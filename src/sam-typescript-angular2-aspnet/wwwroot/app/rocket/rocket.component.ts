﻿import { Component, View, ElementRef, DynamicComponentLoader, ComponentRef } from 'angular2/core';
import {RocketActions} from './rocket.actions';
import {RocketModel} from './rocket.model';
import {RocketState} from './rocket.state';
import {RocketViews} from './rocket.views';
import {Sam} from '../sam/sam.component';

declare var jQuery: any;

@Component({
    selector: 'rocket',
    templateUrl: './app/rocket/rocket.template.html',
    styleUrls: ['./app/rocket/rocket.style.css']
})
export class RocketComponent extends Sam<RocketActions, RocketModel, RocketState, RocketViews> {
    private component: ComponentRef;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef) {
        super(RocketActions, RocketModel, RocketState, RocketViews);
        this.actions.init();
    }

    ngOnInit() {
        this.views.updated.subscribe((representation) => {
            this.loader.loadIntoLocation(representation, this.elementRef, 'rocket').then((component) => {
                if (this.component) {
                    this.component.dispose();
                }
                component.instance.rocket = this;
                this.component = component;
            });
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