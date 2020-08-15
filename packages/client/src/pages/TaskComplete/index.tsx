import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MdDone, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import {
  TASKS_COMPLETE,
  TaskData,
  Task,
  CompleteTaskVars,
  DELETE_TASK,
} from '../../graphql/tasks';

import { getDayMonth } from '../../utils/formatDate';

import Header from '../../components/Header';
import GridTasks from '../../components/GridTasks';

import { Container, Content, FinishTask } from './styles';

interface ITaskState {
  id: number;
  name: string;
  date: Date;
  categories: [
    {
      id: number;
      name: string;
    }
  ];
  completed: boolean;
}

const TaskComplete: React.FC = () => {
  const { loading, data } = useQuery<TaskData>(TASKS_COMPLETE);

  const [deleteTask] = useMutation<Task, CompleteTaskVars>(DELETE_TASK);

  const deleteTasks = useCallback(
    (id: string) => {
      deleteTask({
        variables: { id: id },
        update(cache) {
          const taskss: TaskData | null = cache.readQuery({
            query: TASKS_COMPLETE,
          });

          if (!taskss) return;

          cache.writeQuery({
            query: TASKS_COMPLETE,
            data: {
              completeTask: taskss.completeTask.filter(
                (task) => task._id !== id
              ),
            },
          });
        },
      })
        .then(() => {
          toast.success('Task Deletada!!');
        })
        .catch((err) => toast.error(`${err}`));
    },
    [deleteTask]
  );
  return (
    <Container>
      <Header />

      <div>
        <h1>Tarefas finalizadas</h1>
      </div>

      <GridTasks>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : data && data.completeTask.length > 0 ? (
          data.completeTask.map((item) => (
            <Content key={String(item._id)}>
              <FinishTask isCompleted={item.complete}>
                <MdDone size={20} />
              </FinishTask>

              <div>
                <h3>
                  {item.title}-<p>{item.description}</p>
                </h3>
                <h5>
                  {getDayMonth(item.date)}
                  <i
                    style={{
                      marginLeft: '20px',
                      fontSize: '14px',
                      color: '#fff',
                    }}
                  >
                    Finalizada
                  </i>{' '}
                </h5>
              </div>

              <MdDeleteForever
                onClick={() => deleteTasks(item._id)}
                size={25}
              />
            </Content>
          ))
        ) : (
          <h2>Sem tarefas finalizada =(</h2>
        )}
      </GridTasks>
    </Container>
  );
};

export default TaskComplete;
