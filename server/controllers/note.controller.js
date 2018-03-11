import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';


// add note
export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

// edit note
export function editNote(req, res) {
  if (!req.params.noteId && !req.body.task) res.status(400).end();
    
  Note.findOneAndUpdate({ id: req.params.noteId }, { task: req.body.task }).exec((err, note) => {
    if (err) res.status(500).send(err);
    note.save();
    res.status(204).end();
  });
}

// delete note
export function deleteNote(req, res) {
  Note.findOneAndRemove({ id: req.params.noteId }).exec((err, note) => {
    Lane.findOne({ id: req.params.laneId }).exec((er, lane) => {
      const currentNote = lane.notes.indexOf(lane.notes.find(thisNote => thisNote.id === req.params.noteId));
      lane.notes.splice(currentNote, 1);
    });
    if (!note) res.status(500).end();
  });
  res.status(200).end();
}
