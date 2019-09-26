import {Injectable} from '@angular/core';
import * as data from '../../assets/mock-data/notes.json';
import {Observable, of} from 'rxjs';
import {INote} from '../interfaces/INote';
import {CommonStrings} from '../../common-constants';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
  // we can get data from json using
  myNotes: INote[] = data.notes;
  commonStrings = new CommonStrings();

  // up to date length of all notes
  storedDataLength = 0;

  /**
   * Mock Http GET request
   * @return data: Observale<INote[]>
   */
  getNotes(): Observable<INote[]> {
    const storedData: INote[] = JSON.parse(localStorage.getItem(this.commonStrings.storedNotesLabel));
    if (storedData.length > 0) {
      this.storedDataLength = storedData.length;
    }
    // we can get data from json using
    // const result = storedData ? storedData : this.myNotes;
    return of(storedData);
  }

  /**
   * Add Note and save it in browser Storage
   * @param note: INote
   */
  addNote(note: INote) {
    const currentNotes = JSON.parse(localStorage.getItem(this.commonStrings.storedNotesLabel));
    if (currentNotes) {
      // adding to the top of the list
      currentNotes.unshift(note);
      localStorage.setItem(this.commonStrings.storedNotesLabel, JSON.stringify(currentNotes));
      this.storedDataLength++;
    } else {
      localStorage.setItem(this.commonStrings.storedNotesLabel, JSON.stringify([note]));
      this.storedDataLength++;
    }
  }

  /**
   * Delete Note from browser storage
   * @param deletedIndex: number
   */
  deleteNote(deletedIndex: number) {
    const currentNotes = JSON.parse(localStorage.getItem(this.commonStrings.storedNotesLabel));
    if (currentNotes) {
        currentNotes.splice(deletedIndex, 1);
        localStorage.setItem(this.commonStrings.storedNotesLabel, JSON.stringify(currentNotes));
        this.storedDataLength--;
    }
  }

  /**
   * Delete Note from browser storage
   * @param updated: INote
   */
  updateNotes(updated: INote[]) {
    localStorage.setItem(this.commonStrings.storedNotesLabel, JSON.stringify(updated));
  }
}
