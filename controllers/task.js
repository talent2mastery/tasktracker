import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

const Tasks = new Mongo.Collection('tasks');

export default Tasks;

if (Meteor.isServer) {
  Meteor.publish('task.all', () => Tasks.find());
}

Meteor.methods({
  'task.create': ({
    _id, title, isStarted, startDateTime, duration, durationLimit, priority,
  }) => {
    if (!Meteor.userId()) { throw new Meteor.Error('not-authorized'); }

    check(_id, String);
    check(title, String);
    check(isStarted, Boolean);
    check(startDateTime, String);
    check(duration, Number);
    check(durationLimit, Number);
    check(priority, Number);

    Tasks.insert({
      _id,
      title,
      isStarted,
      startDateTime,
      duration,
      durationLimit,
      createdAt: new Date().setHours(0, 0, 0, 0),
      userId: Meteor.userId(),
      username: Meteor.user().username,
      priority: 1,
    });
  },

  'task.delete': (task) => {
    if (!Meteor.userId()) { throw new Meteor.Error('not-authorized'); }

    Tasks.remove(task._id);
  },

  'task.update': (task) => {
    if (!Meteor.userId()) { throw new Meteor.Error('not-authorized'); }

    Tasks.update(task._id, {
      $set: { ...task },
    });
  },
});
