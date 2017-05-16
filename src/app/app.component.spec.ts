import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [
                IonicModule.forRoot(AppComponent)
            ],
            providers: [
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it ('should create a valid instance of AppComponent', () => {
        expect(component instanceof AppComponent).toBe(true);
    });
});
