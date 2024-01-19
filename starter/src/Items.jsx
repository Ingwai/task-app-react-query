import SingleItem from './SingleItem';
import { useFetchTasks } from './reactQueryCustomHooks';

const Items = () => {
	// kiedy pobieramy zasób używamy useQuery, kiedy wysyłamy, edytujemy lub usuwamy korzystamy z useMutation
	const { isPending, data, isError, error } = useFetchTasks();
	if (isPending) {
		return <p style={{ marginTop: '1rem', textAlign: 'center' }}>Loading...</p>;
	}

	if (isError) {
		return <p style={{ marginTop: '1rem', textAlign: 'center' }}>{error.response.data}</p>;
	}

	// dane z serwera znajdują się w takim zagnieżdżeniu
	// data.data.taskList;

	const items = data.taskList;

	return (
		<div className='items'>
			{items.map(item => {
				return <SingleItem key={item.id} item={item} />;
			})}
		</div>
	);
};
export default Items;
