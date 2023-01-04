import img from "./loading.gif";
export default function promiseNoData(state1, state2, state3){
    console.log(state3);
	if (!state1.promise || !state2.promise || !state3.promise)
		return <div>No data</div>;
	else if ((!state1.data&&!state1.error) || (!state2.data&&!state2.error) || (!state3.data&&!state3.error))
		return <img src={img} alt="loading"/>;
	else if (state1.error)
		return <div><div>{state1.error.toString()}</div></div>;
    else if(state2.error)
        return <div><div>{state2.error.toString()}</div></div>;
    else if(state3.error)
        return <div><div>{state3.error.toString()}</div></div>;
	else if (state1.data && state2.data && state3.data)
		return false;

}