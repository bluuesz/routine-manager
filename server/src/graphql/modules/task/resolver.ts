import { IResolvers } from 'graphql-tools';
import { formatISO, isToday, format, parseISO, isEqual } from 'date-fns';
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
      });

      const time = formatISO(task.date, { representation: 'time' });

      return {
        title: task.title,
        description: task.description,
        date: task.date,
        time,
      };
    },
  },
};

export default resolvers;
