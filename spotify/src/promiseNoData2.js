import img from "./loading.gif";
export default function promiseNoData(state1, state2){
	if (!state1.promise && !state2.promise)
		return <div>No data</div>;
	else if (!state1.data&&!state1.error&&!state2.data&&!state2.error)
		return <img src={img} alt="loading"/>;
	else if (state1.error || state2.error)
		return <div><div>{state1.error.toString()}</div>
		<div>{state2.error.toString()}</div></div>;
	else if (state1.data && state2.data)
		return false;

}