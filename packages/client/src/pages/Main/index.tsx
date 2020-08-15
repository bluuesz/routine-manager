import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  IMCOMPLET_TASK,
  TaskData,
  TaskVars,
  CREATE_TASK,
  Task,
  CreateTaskVars,
  COMPLETE_TASK,
  CompleteTaskVars,
  DELETE_TASK,
} from '../../graphql/tasks';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { toast } from 'react-toastify';

import {
  MdDone,
  MdDeleteForever,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../../components/Header';
import GridTask from '../../components/GridTasks';

import {
  formatDate,
  getDayMonth,
  defaultDateToday,
} from '../../utils/formatDate';

import {
  Container,
  ContainerFormTask,
  FormTask,
  Content,
  FinishTask,
} from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Nome obrigatório'),
  date: Yup.date().required('Data obrigatoria'),
  description: Yup.string().required('Categoria obrigatoria'),
});

const Main: React.FC = () => {
  const [page, setPage] = useState(0);

  const { loading, data, refetch } = useQuery<TaskData, TaskVars>(
    IMCOMPLET_TASK,
    {
      variables: { page: page },
    }
  );

  const [createTask] = useMutation<Task, CreateTaskVars>(CREATE_TASK);
  const [completeTask] = useMutation<Task, CompleteTaskVars>(COMPLETE_TASK);
  const [deleteTask] = useMutation<Task, CompleteTaskVars>(DELETE_TASK);

  const { register, handleSubmit, reset } = useForm<CreateTaskVars>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // TODO: MELHORAR ISSO P/ ONLY CACHE
    refetch();
  }, [page, refetch]);

  const onSubmit = useCallback(
    (data: CreateTaskVars) => {
      createTask({
        variables: {
          title: data.title,
          date: formatDate(data.date),
          description: data.description,
        },
        update(cache, { data }) {
          const taskss: TaskData | null = cache.readQuery({
            query: IMCOMPLET_TASK,
            variables: { page: page },
          });

          if (!taskss) return;

          if (taskss.imcompleteTask.length === 6) return;

          const updateTasks = [...taskss?.imcompleteTask, data?.createTask];
          cache.writeQuery({
            query: IMCOMPLET_TASK,
            variables: { page: page },
            data: { imcompleteTask: updateTasks },
          });
        },
      })
        .then(() => {
          reset();
          toast.success('Task adicionada!!');
        })
        .catch((err) => {
          toast.error(`${err}`);
        });
    },
    [createTask, page, reset]
  );

  const completTask = useCallback(
    (id: string) => {
      completeTask({
        variables: { id: id },
        update(cache) {
          const taskss: TaskData | null = cache.readQuery({
            query: IMCOMPLET_TASK,
            variables: { page: page },
          });

          if (!taskss) return;

          const filterTasks = taskss.imcompleteTask.filter(
            (task) => task._id !== id
          );

          cache.writeQuery({
            query: IMCOMPLET_TASK,
            variables: { page: page },
            data: { imcompleteTask: filterTasks },
          });
        },
      })
        .then(() => {
          toast.success('Task finalizada!!');
        })
        .catch((err) => toast.error(`${err}`));
    },
    [completeTask, page]
  );

  const deleteTasks = useCallback(
    (id: string) => {
      deleteTask({
        variables: { id: id },
        update(cache) {
          const taskss: TaskData | null = cache.readQuery({
            query: IMCOMPLET_TASK,
            variables: { page: page },
          });

          if (!taskss) return;

          // TOODO: ver como merge funciona
          cache.writeQuery({
            query: IMCOMPLET_TASK,
            variables: { page: page },
            data: {
              imcompleteTask: taskss.imcompleteTask.filter(
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
    [deleteTask, page]
  );

  const prevPage = useCallback(() => {
    if (page === 0) return;

    setPage((p) => p - 1);
  }, [page]);

  const nextPage = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  return (
    <Container>
      <Header />

      <ContainerFormTask>
        <FormTask onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              ref={register}
              name="title"
              type="text"
              placeholder="Escreva aqui sua tarefa"
            />
          </div>

          <input
            ref={register}
            name="description"
            type="text"
            placeholder="Breve descrição"
          />

          <input
            ref={register}
            name="date"
            type="date"
            defaultValue={`${defaultDateToday(new Date())}`}
          />

          <button type="submit">Criar</button>
        </FormTask>

        <div style={{ maxWidth: '350px', width: '100%' }}>
          <h2>Tarefas pendentes</h2>
        </div>
      </ContainerFormTask>

      <GridTask>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : data && data.imcompleteTask.length > 0 ? (
          data.imcompleteTask.map((item) => (
            <Content key={String(item._id)}>
              <FinishTask onClick={() => completTask(item._id)}>
                <MdDone size={20} />
              </FinishTask>

              <div>
                <h3>
                  {item.title} -<p>{item.description}</p>
                </h3>
                <h5>{getDayMonth(item.date)}</h5>
              </div>

              <MdDeleteForever
                onClick={() => deleteTasks(item._id)}
                size={25}
              />
            </Content>
          ))
        ) : (
          <h2 style={{ textAlign: 'center', margin: '0 auto' }}>
            você não tem mais tasks, adicione para vizualiar
          </h2>
        )}
      </GridTask>

      <div
        style={{
          display: 'flex',
          marginTop: '40px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MdKeyboardArrowLeft
          onClick={prevPage}
          style={{ cursor: 'pointer', marginTop: '4px' }}
          size={35}
          color="#fff"
        />

        <h2
          style={{ textAlign: 'center', padding: '0 10px', cursor: 'pointer' }}
        >
          {page + 1}
        </h2>

        <MdKeyboardArrowRight
          onClick={nextPage}
          style={{ cursor: 'pointer', marginTop: '4px' }}
          size={35}
          color="#fff"
        />
      </div>
    </Container>
  );
};

export default Main;
