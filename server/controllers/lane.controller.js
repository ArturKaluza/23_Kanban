import Lane from '../models/lane';
import uuid from 'uuid';
import Note from '../models/note';

// add new lane
export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

// get all lane
export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

// delete lane
export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.notes.forEach(note => {
      Note.findOne({ id: note.id }).exec((error, thisNote) => {
        if (error) res.status(500).send(error);
        thisNote.remove();
      });
    });
    lane.remove(() => {
      res.status(200).end();
    });
  });
}

// edit name
export function editName(req, res) {
  Lane.findOneAndUpdate({ id: req.params.laneId }, { name: req.body.name }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.save();
    res.status(204).end();
  });
}

