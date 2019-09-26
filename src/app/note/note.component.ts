import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NoteService} from '../services/note.service';
import {INote} from '../interfaces/INote';
import {Direction} from '../interfaces/Directions';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent implements OnInit, OnChanges {
  @Input() note: INote;
  @Input() index: number;
  showUpArrow: boolean;
  shoWDownArrow: boolean;
  output: {index: number, moveTo: number} = {index: -1, moveTo: -1};
  @Output() movements: EventEmitter<object> = new EventEmitter<object>();
  @Output() deletedIndex: EventEmitter<number> = new EventEmitter<number>();

  constructor(private notService: NoteService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showUpArrow = (changes.index.currentValue !== 0) ? true : false;
    this.shoWDownArrow = (changes.index.currentValue + 1  === this.notService.storedDataLength) ? false : true;

  }

  delete(deleted: number) {
    this.deletedIndex.emit(deleted);
  }

  /**
   * Move up will be parsed to ==>  'UP 0'
   */
  moveUp() {
    this.output = {index: this.index, moveTo: Direction.Up};
    this.movements.emit(this.output);
  }

  /**
   * Move Down will be parsed to ==>  'DOWN'
   */
  moveDown() {
    this.output = {index: this.index, moveTo: Direction.Down};
    this.movements.emit(this.output);
  }
}

