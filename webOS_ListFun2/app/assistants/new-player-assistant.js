function NewPlayerAssistant(player,callback) {
	this.player = player;
	this.callback = callback;
	Mojo.Log.info("new player!" + this.player.Name);
}

NewPlayerAssistant.prototype.setup = function() {

	this.controller.setupWidget("playerName",
	{
		hintText:'enter player name',
		multiline: false,
		focus: true,
		modelProperty: 'name',
		label : 'Name'
	},
	this.player
	);
	
	this.controller.setupWidget("playerPosition",
			{
				choices: [{label:"Guard",value:"Guard"},
				          {label:"Forward",value:"Forward"},
						  {label:"Center",value:"Center"}
				          ],
				modelProperty: 'position',
				label:'Position',
				labelPlacement: Mojo.Widget.labelPlacementLeft
			},
			this.player
		);
	
	this.controller.setupWidget("playerNumber",
		{
			modelProperty: 'number',
			label:'Jersey Number',
			min:0,
			max:55
		},
		this.player
	);
	

}

NewPlayerAssistant.prototype.activate = function(event) {
}
NewPlayerAssistant.prototype.deactivate = function(event) {
}
NewPlayerAssistant.prototype.cleanup = function(event) {
	this.callback(this.player);
}
