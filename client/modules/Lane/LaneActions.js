import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';

export const CREATE_LANES = 'CREATE_LANES';

// Export Actions
export function createLane(lane) {
  console.log('bez req');
  return {
    type: CREATE_LANE,
    lane: {
      notes: [],
      editing: false,
      ...lane,
    }
  };
}

// tworzenie nowej kolumny
export function createLaneRequest(lane) {
  console.log('req');
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}


export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}
  
export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId
  };
}

export function editLane(laneId) {
  return {
    type: EDIT_LANE,
    laneId
  };
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const {lanes: normalizedLanes, notes } = normalized.entities;
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes))
    })
  }
}


