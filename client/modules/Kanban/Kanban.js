import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';
import { createLaneRequest, fetchLanes, deleteLaneRequest } from '../Lane/LaneActions';


const Kanban = (props) => (
  <div className={styles.Board}>
    <h1 className={styles.Title}>Kanban Board</h1>
    <button
      className={styles.AddLane}
      onClick={() => props.createLaneRequest({
        name: 'New lane',
        editing: false
      })}
    >Add lane</button>
    <Lanes lanes={props.lanes} />
  </div>
);

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLaneRequest: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes)
});

const mapDispatchToProps = {
  createLaneRequest,
  deleteLaneRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
