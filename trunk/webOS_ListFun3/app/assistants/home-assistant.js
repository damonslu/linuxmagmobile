function HomeAssistant() {
	
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
	
	// un-comment this line to always start with the default roster
	// this.listModel.items = this.originalRoster.items.slice(0);

	// use this definition when we're retrieving our roster from persistent storage
	this.listModel = {items: [] }
	
	
	// change these values as desired between:
	// depot
	// html5
	// none 
	this.storageTechnique = "Depot";
	this.depotHandle = null;
	//this.storageTechnique = "HTML5";
	//this.dbHandle = null;	
	//this.storageTechnique = "none";

}


HomeAssistant.prototype.setup = function() {

	if (this.storageTechnique != "none") {
		this.loadRoster();
	}
	
	this.controller.setupWidget("teamList",
			{
				itemTemplate: 'home/listentry',
				listTemplate: 'home/listcontainer',
				swipeToDelete: true,
             //	reorderable: true,
				dividerFunction : this.whatPosition,
				renderLimit : 13
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
	this.handleListTapped = this.listTapped.bindAsEventListener(this);
	this.controller.listen('teamList',Mojo.Event.listTap, this.handleListTapped);
	
	this.handleListAdd = this.listAdd.bindAsEventListener(this);
	this.controller.listen('teamList',Mojo.Event.listAdd, this.handleListAdd);
	
	this.handleListDelete = this.listDelete.bindAsEventListener(this);
	this.controller.listen('teamList',Mojo.Event.listDelete, this.handleListDelete);
	
	this.handleListReorder = this.listReorder.bindAsEventListener(this);
	this.controller.listen('teamList',Mojo.Event.listReorder, this.handleListReorder);
	
	
	this.handleSortByChanged = this.sortByChanged.bindAsEventListener(this);
	this.controller.listen('sortBy',Mojo.Event.propertyChanged,this.handleSortByChanged);
	
	/* setup command menu for this scene */
	this.cmdMenuModel = {  
						items: [
								{label:'Add Plyr', command:'newplayer'},
								{label:'Reset', command:'reset'}
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
	var player = this.listModel.items.slice(event.index,event.index + 1); 
	this.listModel.items.splice(event.index,1);
	switch (this.storageTechnique)
	{
		case "Depot":
			this.saveRoster();
			break;
		case "HTML5":
			Mojo.Log.info("######Deleting " + player[0].name);
			this.dbHandle.transaction(function (tx) {tx.executeSql("delete from tbl_roster where pname = ?",[player[0].name]);}
			);
			break;
	}
	
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
	this.controller.stopListening('teamList',Mojo.Event.listTap, this.handleListTapped);
	this.controller.stopListening('teamList',Mojo.Event.listAdd, this.handleListAdd);
	this.controller.stopListening('teamList',Mojo.Event.listDelete, this.handleListDelete);
	this.controller.stopListening('teamList',Mojo.Event.listReorder, this.handleListReorder);
	this.controller.stopListening('sortBy',Mojo.Event.propertyChanged,this.handleSortByChanged);

}


// handle commands

HomeAssistant.prototype.handleCommand = function (event) {
	if (event.type == Mojo.Event.command) {
		if (event.command == "reset") {
			this.sortedby.value = 'name';
			this.controller.modelChanged(this.sortedby,this);
			this.zapRoster();
			for (var i=0;i<this.originalRoster.items.length;i++) {
				this.handleNewPlayer(this.originalRoster.items[i]);
			}
			//this.listModel.items = this.originalRoster.items.slice(0);
			//this.listModel.items.sort(this.mySortFunc);
			//this.controller.modelChanged(this.listModel, this);
			return;
		}
		if (event.command == "newplayer") {
			var p = new Player();
			this.controller.stageController.pushScene('new-player',p,this.handleNewPlayer.bind(this));
			return;		
		}
	}
}

// zap the roster
HomeAssistant.prototype.zapRoster = function () {
	Mojo.Log.info("IIIIIIIIIIIIIIIII Zap Roster");
	try {
		this.listModel.items = [];
		switch (this.storageTechnique) {
			case "Depot":
				this.saveRoster();
				break;
			case "HTML5":
				this.dbHandle.transaction(function (tx){tx.executeSql("delete from tbl_roster",[]);}.bind(this));
				break;
		}
	} catch (e) {
		Mojo.Log.error("EEEEEEEEEEEEEE Error zapRoster " + e);
	}
}
// handle new player

HomeAssistant.prototype.handleNewPlayer = function(player) {
	try {
		Mojo.Log.info("handleNewPlayer: " + player.name + "," + player.position + "," + player.number);
		this.listModel.items.push(player);
		this.listModel.items.sort(this.mySortFunc);
		this.controller.modelChanged(this.listModel, this);
		
		
		switch (this.storageTechnique) {
			case "Depot":
				this.saveRoster();
				break;
			case "HTML5":
				this.dbHandle.transaction(function(tx){
					tx.executeSql("insert into tbl_roster (pname,pposition,pnumber) values (?,?,?)", [player.name, player.position, player.number.toFixed(0)]);
				});
				break;
		}
	}catch (e) {
		Mojo.Log.error("EEEEEEEEEEEEEE error handling new player " + e);
	}
}

// sorting

HomeAssistant.prototype.sortFunc= function (a,b) {
		try {
			//Mojo.Log.info("Sorting by " + this.sortedby.value);
			if (a[this.sortedby.value] == b[this.sortedby.value]) return 0;
			if (a[this.sortedby.value]> b[this.sortedby.value]) return 1;
			return -1;	
		} catch (e) {
			Mojo.Log.info("error in sortFunc" + e);
			return 0; // default to no difference
		}
}

// persistence functions

HomeAssistant.prototype.loadRoster = function () {
	switch (this.storageTechnique) {
		case "Depot":
			this.depotHandle = new Mojo.Depot({name:"listfun2depot",version : 1,estimatedSize:1000,replace: false},this.depotOpenSuccess.bind(this),this.depotOpenFailure.bind(this));
			break;
		case "HTML5":
			this.loadHTML5Roster();
			break;
		case "none":
		default:
			Mojo.Controller.errorDialog("No action.  Change this.storageTechnique in HomeAssistant to Depot or HTML5");
			break;
	}	
}


HomeAssistant.prototype.saveRoster = function () {
	Mojo.Log.info("Attempting to save roster ...");
	switch (this.storageTechnique) {
		case "Depot":
			this.depotHandle.add("roster", this.listModel.items, this.depotSaveSuccess.bind(this),this.depotSaveFailure.bind(this));
			break;
		case "HTML5":
			// we save to the database on a row by row basis...do nothing here
			break;
		case "none":
		default:
			Mojo.Controller.errorDialog("No action.  Change this.storageTechnique in HomeAssistant to Depot or HTML5");
			break;
	}	
	
}



// depot functions
HomeAssistant.prototype.depotOpenSuccess = function () {
	Mojo.Log.info("Depot opened successfully");
	try {
		if (this.depotHandle == null) {
			Mojo.Log.info("depot handle is null????");
		} else {
			this.depotHandle.get("roster",this.depotLoadOK.bind(this),this.depotLoadFail.bind(this));

		}
		
	}catch (e) {
		Mojo.Log.error("Failed to open roster " + e);
	}
	
}

HomeAssistant.prototype.depotOpenFailure= function () {
	Mojo.Log.info("Depot failed to open");
}


HomeAssistant.prototype.depotLoadOK = function (result) {
	Mojo.Log.info("!!!!!!!!!!!!!!!!!!!!!!!!!loadOK");
	// result should represent an array
	if (result == null) {
		Mojo.Log.info("result is null, no problem, probably our first run");
	} else {
		Mojo.Log.info("!!!!!!!!!!!!!found roster, assigning it now.  There are " + result.length + " items in the list.");
		this.listModel.items = result; 
		this.controller.modelChanged(this.listModel,this);
	}
}

HomeAssistant.prototype.depotLoadFail = function (result) {
	Mojo.Log.error("loadFail -- unable to get roster from depot");
}


HomeAssistant.prototype.depotSaveSuccess = function () {
	Mojo.Log.info("Depot saved successfully.");
}

HomeAssistant.prototype.depotSaveFailure = function () {
	Mojo.Log.info("Depot save failure.");
}

// html5 functions

HomeAssistant.prototype.createHTML5Table = function(){
	try {
		
		// this assumes that dbHandle is already setup :)
		this.dbHandle.transaction(function(tx){
			tx.executeSql("create table tbl_roster (pname TEXT,pposition TEXT,pnumber TEXT);",  // parameters
			[], function(tx, result){
				Mojo.Log.info("good result on query: " + result.rows.length);
			}, function(tx, error){
				Mojo.Log.info("bad result on query: " + error.message);
			});
		}.bind(this));
		
	} catch (e) {
		Mojo.Log.error("EEEEEEEEEEEEEEEEE  Error in createHTML5Table " + e);
	}
}


HomeAssistant.prototype.loadHTML5Roster = function () {

	
	try {
		Mojo.Log.info("IIIIIIIIIIIIIIIIIII  LOAD HTML5 ROSTER");
		this.dbHandle = openDatabase("rosterhtml5 ","1.0","Roster Database",1000);
		
		
	    this.dbHandle.transaction(function(tx) {
			tx.executeSql("SELECT * FROM tbl_roster",
			     // parameters
				 [],
				 // good result
				 function(tx,result){
				 	try {
						for (var i = 0; i < result.rows.length; i++) {
							var row = result.rows.item(i);
							var p = new Player();
							p.name = row['pname'];
							p.position = row['pposition'];
							p.number = row['pnumber'];
							this.listModel.items.push(p);
						}
						this.listModel.items.sort(this.mySortFunc);
						this.controller.modelChanged(this.listModel, this);
					} catch (e) {
						Mojo.Log.error("EEEEEEEEEEEEE  Error fetching rows from database... " + e);
					}
				 }.bind(this),
				 function(tx,error){
				 	Mojo.Log.info("bad result on query: " + error.message + " let's try to create the db table");
					this.createHTML5Table();
				 }.bind(this)
				 ); 
		}.bind(this));
		
	} catch (e) {
		Mojo.Log.error("EEEEEEEEEEEEEE Error reading HTML5 database " + e);
	}
	
}	

	

	