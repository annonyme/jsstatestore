const StateStore = {
	states: {},
	actions: {},
	createState: function(name){
		this.states[name] = {
			data: null,
			workers: [],
			listeners: []
		}
	},
	registerWorker: function(statename, action, worker){
		if(this.states[statename]){
			if(!this.states[statename].workers[action]){
				this.states[statename].workers[action] = []
			}
			this.states[statename].workers[action].push(worker);

			if(!this.actions[action]){
				this.actions[action] = [];
			}
			this.actions[action].push(statename);
		}
	},
	registerListener: function(statename, listener){
		if(this.states[statename]){
			this.states[statename].listeners.push(listener);
		}
	},
	action: function(action, payload){
		if(this.actions[action]){
			this.actions[action].forEach((statename) => {
				let changes = false;

				this.states[statename].workers[action].forEach((worker) => {
					const stateCopy = JSON.parse(JSON.stringify(this.states[statename].data));
					let newState = worker(this.states[statename].data, payload);
					if(newState != stateCopy){
						changes = true;
					}
					this.states[statename].data = newState;
				});

				if(changes){
					this.states[statename].listeners.forEach((func) => {func(this.states[statename].data)});
				}
			});
		}
	}
};