import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from './Kanban.css';
import { createLane } from '../Lane/LaneActions';

const Kanban = (props) => (
  <div className={styles.Board}>
    <h1 className={styles.Title}>Kanban Board</h1>
    <button
      className={styles.AddLane}
      onClick={() => props.createLane({
        name: 'New lane',
      })}
    >Add lane</button>
    <Lanes lanes={props.lanes} />
  </div>
);

//Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: state.lanes,
});

const mapDispatchToProps = {
  createLane,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
