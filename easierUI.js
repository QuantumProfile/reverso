/**
 * ---------------------------------------------
 *                IO Stuff
 * -------------------------------------------
 */
function println(input){
    return new Promise((res,rej)=>{
        res(console.log(input));
    });
}
async function display(widget){
    document.body.appendChild(widget);
}
/**
 * ----------------------------------------------
 *                  monads
 * --------------------------------------------
 */
async function put(local,state) {
    local.state=state;
}
async function get({state}) {
    return state;
}
async function runState(stateTransformer,initialState){
    const dummy={state:initialState};
    const returnedValue=await stateTransformer(dummy);
    const finalState=await get(dummy);
    return [returnedValue,finalState]
}

