import { IResolvers } from 'graphql-tools';
import { formatISO, parseISO, isEqual } from 'date-fns';
import { mongo } from 'mongoose';
import Task, { ITask } from '../../../db/models/Task';
import User from '../../../db/models/User';

import { Context } from '../../context';

const resolvers: IResolvers = {
  Query: {
    tasks: () => Task.find(),
    task: async (_, { date }, { userId }: Context) => {
      if (!userId) {
        throw new Error('Token invalid');
      }

      const idMongo = new mongo.ObjectId(userId);
      const tasks: ITask[] = await Task.aggregate([
        {
          $match: {
            author: idMongo,
          },
        },
      ]);

      const dateTarget = parseISO(
        formatISO(parseISO(date), { representation: 'date' })
      );

      const filterDate = tasks.filter((task) => {
        const dateFormat = parseISO(
          formatISO(task.date, { representation: 'date' })
        );

        const dateCompare = isEqual(dateTarget, dateFormat);

        return dateCompare;
      });

      return filterDate;
    },
    imcompleteTask: async (_, { page }, { userId }: Context) => {
      if (!userId) {
        throw new Error('Token invalid');
      }

      const idMongo = new mongo.ObjectId(userId);
      const tasks: ITask[] = await Task.aggregate([
        {
          $match: {
            author: idMongo,
            complete: false,
          },
        },
        {
          $skip: 6 * page,
        },
        {
          $limit: 6,
        },
      ]);

      return tasks;
    },
    completeTask: async (_, { __ }, { userId }: Context) => {
      if (!userId) {
        throw new Error('Token invalid');
      }

      const idMongo = new mongo.ObjectId(userId);
      const tasks: ITask[] = await Task.aggregate([
        {
          $match: {
            author: idMongo,
            complete: true,
          },
        },
      ]);

      return tasks;
    },
  },
  Mutation: {
    createTask: async (
      _,
      { title, description, date }: ITask,
      { userId }: Context
    ) => {
      if (!userId) {
        throw new Error('Token invalid');
      }

      const user = await User.findById(userId);

      if (!user) {
        throw new Error('This user not exists');
      }

      const task = await Task.create({
        author: userId,
        title,
        description,
        date,
        complete: false,
      });

      const time = formatISO(task.date, { representation: 'time' });

      return {
        _id: task._id,
        title: task.title,
        description: task.description,
        date: task.date,
        time,
        complete: task.complete,
      };
    },
    completeTask: async (_, { id }: ITask, { userId }: Context) => {
      if (!userId) {
        throw new Error('Token invalid');
      }

      await Task.updateOne(
        { _id: id, author: userId },
        { $set: { complete: true } }
      );

      return true;
    },
    deleteTask: async (_, { id }: ITask, { userId }: Context) => {
      if (!userId) {
        throw new Error('Token invalid');
      }

      await Task.deleteOne({ _id: id });

      return true;
    },
  },
};

export default resolvers;
