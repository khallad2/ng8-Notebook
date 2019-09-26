import {Component} from '@angular/core';
import {INote} from './interfaces/INote';
import {NoteService} from './services/note.service';
import {APP} from '../environments/environment';
import {CommonStrings} from '../common-constants';
import {Direction} from './interfaces/Directions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = APP.title;
  newNote: INote = {title: ''};
  commonStrings = new CommonStrings();
  public allNotes: INote[] = [];
  public noDataFound: boolean;

  constructor(private noteService: NoteService) {
    this.noDataFound = false;
    this.getNotes();
  }

  /**
   * Set data
   * @param res: INote
   */
  private setData(res: INote[]) {
    if (res.length > 0) {
      this.allNotes = res;
      this.noDataFound = false;
    } else {
      this.noDataFound = true;
    }
  }

  /**
   * Get Notes
   */
   async getNotes() {
     await this.noteService.getNotes().subscribe(
      res => this.setData(res),
      err => console.log('error', err)
    );
  }

  /**
   * Add Note to the UI and Browser storage using noteService
   * @param newNote: INote
   */
  addNote(newNote: INote) {
    this.noteService.addNote({title: newNote.title});
    this.allNotes.splice(0, 0, {title: newNote.title});
    this.newNote = {title: ''};
    this.getNotes();
  }

  /**
   * Delete Note from UI and Browser storage using noteService
   * @param deletedIndex: number
   */
  deleteNote(deletedIndex: number) {
    this.noteService.deleteNote(deletedIndex);
    this.allNotes.splice(deletedIndex, 1);
    this.getNotes();
  }

  /**
   * Handle Movements Up and Down
   * @param event: Object
   */
  handleMovements(event) {
    // if movement to down
    if (event.moveTo === Direction.Down) {
      const deleted = this.allNotes.splice(event.index, 1);
      this.allNotes.splice(event.index + 1, 0, ...deleted);
    } else /* movement to up*/ {
      const deleted = this.allNotes.splice(event.index, 1);
      this.allNotes.splice(event.index - 1, 0, ...deleted);
    }
    this.noteService.updateNotes(this.allNotes);
  }

}
