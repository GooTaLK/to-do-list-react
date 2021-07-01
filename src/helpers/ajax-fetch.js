const defaultError = () => console.error('Error fetching...');
const defaultSucces = () => console.log('Successfull');

const ajax = ({
	url,
	method,
	body,
	cbSucces = defaultSucces,
	cbError = defaultError,
}) => {
	const options = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	method && (options['method'] = method);

	(!method || method === 'GET') &&
		(options.headers['Accept'] = 'application/json');

	body && (options['body'] = body);

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => cbSucces(json))
		.catch((err) => cbError(err));
};

export default ajax;
