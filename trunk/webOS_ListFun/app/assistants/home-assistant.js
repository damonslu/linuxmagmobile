function HomeAssistant() {
	this.listModel = 
	{
			items : [
			         {name:'Magic',position:'Guard',number:'32'},
					 {name:'Scott',position:'Guard',number:'4'},
					 {name:'Cooper',position:'Guard',number:'21'},
			         {name:'Kareem',position:'Center',number:'33'},
			         {name:'Rambis',position:'Forward',number:'31'}
			        ]
	};
}

HomeAssistant.prototype.setup = function() {
	this.controller.setupWidget("teamList",
			{
				itemTemplate: 'home/listentry',
				listTemplate: 'home/listcontainer',
				addItemLabel: 'Add New Player',
				swipeToDelete: true,
             	reorderable: true,
				dividerFunction : this.whatPosition
			},
			this.listModel);
	
	/* add event handlers to listen to events from widgets */
	this.controller.listen('teamList',Mojo.Event.listTap, this.listTapped.bindAsEventListener(this));
	this.controller.listen('teamList',Mojo.Event.listAdd, this.listAdd.bindAsEventListener(this));
	this.controller.listen('teamList',Mojo.Event.listDelete, this.listDelete.bindAsEventListener(this));
	this.controller.listen('teamList',Mojo.Event.listReorder, this.listReorder.bindAsEventListener(this));
	
}

HomeAssistant.prototype.whatPosition = function(data){
	// return the first letter of the position (G,C,F)
	return data.position[0];
}	

HomeAssistant.prototype.listTapped = function(event){
	Mojo.Log.info("#############List Tapped [" + event.index + "]");
	Mojo.Controller.errorDialog(this.listModel.items[event.index].name);
}

HomeAssistant.prototype.listAdd = function(event){
	Mojo.Log.info("#############List Add");
}

HomeAssistant.prototype.listDelete = function(event){
	Mojo.Log.info("#############Delete entry" + event.index);
	this.listModel.items.splice(event.index,1);
}

HomeAssistant.prototype.listReorder = function(event){
	Mojo.Log.info("#############List Reorder" + event.fromIndex + " to " + event.toIndex);
	var f = this.listModel.items[event.fromIndex];
	var t = this.listModel.items[event.toIndex];
	this.listModel.items[event.fromIndex] = t;
	this.listModel.items[event.toIndex] = f;
	
}

HomeAssistant.prototype.activate = function(event) {
}


HomeAssistant.prototype.deactivate = function(event) {
}

HomeAssistant.prototype.cleanup = function(event) {
}
