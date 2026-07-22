export const fetchTasks = async () => {
  const response = await fetch('http://localhost:3000/tasks');

  if (!response.ok) {
    throw new Error('Erro ao buscar as tarefas.');
  }

  return response.json();
};

export const createTaskRequest = async (name: string) => {
  const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      isCompleted: false,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar tarefa');
  }
};

export const toggleTaskRequest = async (id: string, isCompleted: boolean) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar tarefa');
  }
};

export const deleteTaskRequest = async (id: string) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar tarefa');
  }
};

export const deleteCompletedTasksRequest = async () => {
  const response = await fetch(`http://localhost:3000/tasks/completed`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isCompleted: true,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar tarefas completas');
  }
};
