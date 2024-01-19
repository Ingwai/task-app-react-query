import customFetch from './utils';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useFetchTasks = () => {
	const { isPending, data, isError, error } = useQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			const { data } = await customFetch('/');
			return data;
		},
	});

	return { isPending, data, isError, error };
};

export const useCreateTask = () => {
	const queryClient = useQueryClient();

	// korzystamy z useMutation

	const { mutate: createTask, isPending } = useMutation({
		mutationFn: taskTitle =>
			customFetch.post('/', {
				title: taskTitle,
				isDone: false,
			}),
		onSuccess: () => {
			// gdy wysłanie zakończy się sukcesem chce unieważnić queryKey
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
			toast.success('Tasks added');
			setNewItemName('');
		},
		onError: error => {
			toast.error(error.response.data.msg);
		},
	});

	return { createTask, isPending };
};

export const useEditTask = () => {
	const queryClient = useQueryClient();

	const { mutate: editTask } = useMutation({
		mutationFn: ({ taskId, isDone }) => {
			return customFetch.patch(`/${taskId}`, { isDone });
		},

		onSuccess: () => {
			// gdy wysłanie zakończy się sukcesem chce unieważnić queryKey
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});
	return { editTask };
};

export const useDeleteTask = () => {
	const queryClient = useQueryClient();
	const { mutate: deleteTask, isPending: deleteTaskPending } = useMutation({
		mutationFn: taskId => {
			return customFetch.delete(`/${taskId}`);
		},

		onSuccess: () => {
			// gdy wysłanie zakończy się sukcesem chce unieważnić queryKey
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	return { deleteTask, deleteTaskPending };
};
