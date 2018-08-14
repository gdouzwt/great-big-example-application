/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GreatBigExampleApplicationTestModule } from '../../../test.module';
import { RebuttalComponent } from '../../../../../../main/webapp/app/entities/rebuttal/rebuttal.component';
import { RebuttalService } from '../../../../../../main/webapp/app/entities/rebuttal/rebuttal.service';
import { Rebuttal } from '../../../../../../main/webapp/app/entities/rebuttal/rebuttal.model';

describe('Component Tests', () => {

    describe('Rebuttal Management Component', () => {
        let comp: RebuttalComponent;
        let fixture: ComponentFixture<RebuttalComponent>;
        let service: RebuttalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GreatBigExampleApplicationTestModule],
                declarations: [RebuttalComponent],
                providers: [
                    RebuttalService
                ]
            })
            .overrideTemplate(RebuttalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RebuttalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RebuttalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Rebuttal(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rebuttals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
