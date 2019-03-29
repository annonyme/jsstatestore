jsstatestore

Example-project for implementing a simple state-store in JavaScript:

**Usage:**
```
StateStore.createState("test");
StateStore.registerWorker("test", "inc", (state, payload) => {
if(state === null){
return 0;
}
else {
return ++state;
}
});
StateStore.registerWorker("test", "dec", (state, payload) => {
if(state === null){
return 0;
}
else {
return --state;
}
});
StateStore.registerWorker("test", "dn", (state, payload) => {
console.log("(" + state + ") do nothing");
//change-listeners are not triggert
return state;
});
StateStore.registerListener("test", (state) => {console.log(state)});

StateStore.action("inc", null); //0
StateStore.action("inc", null); //1
StateStore.action("inc", null); //2
StateStore.action("dn", null); //(2) do nothing
StateStore.action("inc", null); //3
StateStore.action("dec", null); //2	
```
