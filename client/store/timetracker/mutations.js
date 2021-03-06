/* eslint no-param-reassign: "error" */

import types from './mutations_types.js';

export default {
  [types.SET_TASKS]: (state, tasks) => {
    state.tasks = tasks;
  },
  [types.CREATE_TASK]: (state, task) => {
    state.tasks.push(task);
  },
  [types.DELETE_TASK]: (state, task) => {
    state.tasks = state.tasks.filter(_task => _task._id !== task._id);
  },
  [types.UPDATE_TASK]: (state, task) => {
    const { tasks } = state;
    const index = state.tasks.findIndex(_task => _task._id === task._id);
    const firstHalf = tasks.slice(0, index);
    const secondHalf = tasks.slice(index + 1, tasks.length);
    state.tasks = [...firstHalf, task, ...secondHalf];
  },
  [types.SET_REPORT_TEXT]: (state, reportText) => {
    state.reportText = reportText;
  },
};
