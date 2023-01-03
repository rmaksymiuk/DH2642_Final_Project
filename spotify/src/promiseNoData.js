import img from "./loading.gif";
export default function promiseNoData(promise, data, error){
	if (!promise)
		return <div>No data</div>;
	else if (!data&&!error)
		return <img src={img} alt="loading"/>;
	else if (error)
		return <div>{error.toString()}</div>;
	else if (data)
		return false;
}
