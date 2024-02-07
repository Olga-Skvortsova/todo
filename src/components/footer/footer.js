import React from 'react'
import './footer.css'
import PropTypes from 'prop-types'

import TasksFilter from '../tasksFilter'

function Footer({ left, allFilter, activeFilter, competedFilter, deleteAllFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{left} item left</span>
      <ul className="filters">
        <TasksFilter allFilter={allFilter} activeFilter={activeFilter} competedFilter={competedFilter} />
      </ul>
      <button type="button" className="clear-completed" onClick={deleteAllFilter}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  left: 0,
  allFilter: () => {},
  activeFilter: () => {},
  competedFilter: () => {},
  deleteAllFilter: () => {},
}

Footer.propTypes = {
  left: PropTypes.number,
  allFilter: PropTypes.func,
  activeFilter: PropTypes.func,
  competedFilter: PropTypes.func,
  deleteAllFilter: PropTypes.func,
}

export default Footer