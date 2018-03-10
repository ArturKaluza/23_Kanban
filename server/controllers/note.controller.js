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

/*
// delete note
export function deleteNote(req, res) {
  Lane.findOne({ id: req.params.laneId })
    .then(() => {
      Note.findOne({ id: req.params.noteId })
        .then(note => note.remove());
    }).save(() => {
      res.status(200).end();
    });
}
*/

// delete note
export function deleteNote(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.notes.find({ id: req.params.noteId }).exec((error, note) => {
      if (error) {
        res.status(500).send(error);
      }
      note.remove();
      return lane.save();
    });
  });
}


/*
// edit note
export function editNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    note.task = req.body.task;
    note.save((error, saved) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json(saved);
    });
  });
}
*/


