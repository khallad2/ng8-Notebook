import {TestBed} from '@angular/core/testing';

import {NoteService} from './note.service';

describe('NoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteService = TestBed.get(NoteService);
    expect(service).toBeTruthy();
  });

  it('storedDataLength initially should have 0 ', () => {
    const service: NoteService = TestBed.get(NoteService);
    expect(service.storedDataLength).toEqual(0);
  });

  it('addNote storedDataLength should have 1 after add note', () => {
    const service: NoteService = TestBed.get(NoteService);
    // service.storedDataLength = 0;
    service.addNote({title: 'Test stored'});
    expect(service.storedDataLength).toEqual(1);
    // clear browser stored test
    service.deleteNote(0);
  });

  it('deleteNote storedDataLength should have 0 after deleting existing note', () => {
    const service: NoteService = TestBed.get(NoteService);
    service.addNote({title: 'Test stored'});
    service.deleteNote(0);
    expect(service.storedDataLength).toEqual(0);
  });

  it('deleteNote storedDataLength should have 1 after deleting specific note', () => {
    const service: NoteService = TestBed.get(NoteService);
    service.addNote({title: 'Test stored'});
    service.addNote({title: 'Test stored'});
    service.deleteNote(1);
    expect(service.storedDataLength).toEqual(1);
    // clear browser stored test
    service.deleteNote(0);
  });

  it('handle deleteNote with empty data', () => {
    const service: NoteService = TestBed.get(NoteService);
    service.deleteNote(3);
    expect(service.storedDataLength).toEqual(-1);
  });
});
