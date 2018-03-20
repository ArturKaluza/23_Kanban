import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';


const Kanban = (props) => (
  <div className={styles.Board}>
    <h1 className={styles.Title}>Kanban Board</h1>
    <button
      className={styles.AddLane}
      onClick={() => props.createLaneRequest({
        name: 'New lane',
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
