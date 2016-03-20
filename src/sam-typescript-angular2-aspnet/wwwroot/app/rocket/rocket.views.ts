import { Component, EventEmitter, Output, ElementRef } from 'angular2/core';
import { Type } from 'angular2/src/facade/lang';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import {RocketModel} from './rocket.model';
import {Views} from './../sam/sam.views';

declare var jQuery: any;

export class RocketViews extends Views {    constructor() {
        super();
    }

    init(model) {
        this.ready(model);
    }

    @Output() updated: EventEmitter<Type> = new EventEmitter();

    display(representation): void {
        this.representation = representation;
        this.updated.emit(representation);
    }

    // State representation of the ready state
    ready(model) {        
        @Component({
            selector: 'ready',
            template: `
            <p>Counter: {{rocket.model.counter}}</p>
            <form (ngSubmit)="rocket.actions.start({})">
                <input type="submit" value="Start">
            </form>`
        })
        class Ready { }
        return Ready;
    }

    // State representation of the counting state
    counting(model) {

        @Component({
            selector: 'counting',
            template: `
            <p>Count down: {{rocket.model.counter}}</p>
            <form (ngSubmit)="rocket.actions.abort({})">
                <input type="submit" value="Abort">
            </form>`,
        })
        class Counting { }
        return Counting;
    }
    // State representation of the aborted state
    aborted(model) {
        @Component({
            selector: 'aborted',
            template: `<p>Aborted at counter: {{rocket.model.counter}}</p>`
        })
        class Aborted { }
        return Aborted;
    }

    // State representation of the launched state
    launched(model) {
        @Component({
            selector: 'launched',
            template: `
            <div>
                Launched
            </div>    
            `
        })
        class Launched { }
        return Launched;
    }
}