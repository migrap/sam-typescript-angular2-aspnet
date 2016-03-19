import { Component, View, ElementRef, DynamicComponentLoader, ComponentRef } from 'angular2/core';
import {RocketActions} from './rocket.actions';
import {RocketModel} from './rocket.model';
import {RocketState} from './rocket.state';
import {RocketViews} from './rocket.views';
import {Sam} from '../sam/sam.component';

@Component({
    selector: 'rocket',
    template: '<div #rocket></div>'
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
        this.views.updated.next(this.views.representation);
    }
}