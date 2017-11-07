/* Import Ionic & Angular core elements */
import { async, TestBed, inject } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

/* Import modules */
import { AppModule } from './app.module';

/* Import components */
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                IonicModule.forRoot(AppComponent),
                AppModule
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