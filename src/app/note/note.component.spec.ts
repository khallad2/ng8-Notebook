import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NoteComponent} from './note.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      imports: [MDBBootstrapModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
