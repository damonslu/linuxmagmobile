function HomeAssistant() {
	this.listModel = 
	{
			items : []
	};
	
	this.originalRoster = 
	{
			items : [
			         {name:'Magic',position:'Guard',number:32},
					 {name:'Scott',position:'Guard',number:4},
					 {name:'Cooper',position:'Guard',number:21},
			         {name:'Kareem',position:'Center',number:33},
			         {name:'Rambis',position:'Forward',number:31}
			        ]
	};
	
	this.sortedby = {
		value : 'name'
	}
	
	this.listModel.items = this.originalRoster.items.slice(0);
}

HomeAssistant.prototype.setup = function() {
	this.controller.setupWidget("teamList",
			{
				itemTemplate: 'home/listentry',
				listTemplate: 'home/listcontainer',
				//addItemLabel: 'Add New Player',
				swipeToDelete: true,
             	reorderable: true,
				dividerFunction : this.whatPosition
			},
			this.listModel);
	
	
	
	this.controller.setupWidget("sortBy",
			{
				choices: [{label:"Name",value:"name"},
				          {label:"Position",value:"position"},
						  {label:"Number",value:"number"}
				          ],
				modelProperty: 'value',
				label:'Sort By',
				labelPlacement: Mojo.Widget.labelPlacementLeft
			},
			this.sortedby
		);
	
	/* add event handlers to listen to events from widgets */
	this.controller.listen('teamList',Mojo.Event.listTap, this.listTapped.bindAsEventListener(this));
	this.controller.listen('teamList',Mojo.Event.listAdd, this.listAdd.bindAsEventListener(this));
	this.controller.listen('teamList',Mojo.Event.listDelete, this.listDelete.bindAsEventListener(this));
	this.controller.listen('teamList',Mojo.Event.listReorder, this.listReorder.bindAsEventListener(this));
	
	
	this.controller.listen('sortBy',Mojo.Event.propertyChanged,this.sortByChanged.bindAsEventListener(this));
	
	/* setup command menu for this scene */
	this.cmdMenuModel = {  
						items: [
								{label:'Add Player', command:'newplayer'},
								{label:'Reset Roster', command:'reset'}
							]};
	this.controller.setupWidget(Mojo.Menu.commandMenu, {}, this.cmdMenuModel);

	
	this.mySortFunc = this.sortFunc.bind(this);
	
	
	this.listModel.items.sort(this.mySortFunc);
	this.controller.modelChanged(this.listModel,this);
	
}

HomeAssistant.prototype.whatPosition = function(data){
	// return the first letter of the position (G,C,F)
	return data.position[0];
}	


HomeAssistant.prototype.sortByChanged = function (event) {
	try {
		Mojo.Log.info("sort by changed [" + event.value + "]");
		this.sortedby.value = event.value;
		this.listModel.items.sort(this.mySortFunc);
		this.controller.modelChanged(this.listModel, this);
	} catch (e) {
		Mojo.Log.error("sortByChanged error " + e);
	}
}

HomeAssistant.prototype.listTapped = function(event){
	Mojo.Log.info("#############List Tapped [" + event.index + "]");
	Mojo.Controller.errorDialog(this.listModel.items[event.index].name);
}

HomeAssistant.prototype.listAdd = function(event){
	Mojo.Log.info("#############List Add");
	var p = new Player();
	this.controller.stageController.pushScene('new-player',p,this.handleNewPlayer.bind(this));
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

HomeAssistant.prototype.handleCommand = function (event) {
	if (event.type == Mojo.Event.command) {
		if (event.command == "reset") {
			this.sortedby.value = 'name';
			this.controller.modelChanged(this.sortedby,this);
			this.listModel.items = this.originalRoster.items.slice(0);
			this.listModel.items.sort(this.mySortFunc);
			this.controller.modelChanged(this.listModel, this);
			return;
		}
		if (event.command == "newplayer") {
			var p = new Player();
			this.controller.stageController.pushScene('new-player',p,this.handleNewPlayer.bind(this));
			return;		
		}
	}
}



HomeAssistant.prototype.handleNewPlayer = function(player) {
	Mojo.Log.info("handleNewPlayer: " + player.name + "," + player.position + "," + player.number);
	this.listModel.items.push(player);
	this.listModel.items.sort(this.mySortFunc);
	this.controller.modelChanged(this.listModel,this);
}

HomeAssistant.prototype.sortFunc= function (a,b) {
		try {
			Mojo.Log.info("Sorting by " + this.sortedby.value);
			if (a[this.sortedby.value] == b[this.sortedby.value]) return 0;
			if (a[this.sortedby.value]> b[this.sortedby.value]) return 1;
			return -1;	
		} catch (e) {
			Mojo.Log.info("error in sortFunc" + e);
			return 0; // default to no difference
		}
	}
