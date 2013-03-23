///actionFunctions.js
/// This file contains functions that modify the behavior of a game's objects

var commandList = new Array();

//this is set when an object is found to be colliding with the current selfObject. it is a reference to the offending object
var collidingObject = null;
//the reference to the object we are editing
var selfObject = null;

//the selected object for editing
var _selectedObject = null;

// Set this before changing a blueprint
var _selectedBlueprint = null;

// Variable that sets which event you are currently editing, such as "onCollide", "onInit", and "onUpdate"
var _currentlyChanging = null;

//object that holds all the json properties
var o;

function changeEditingState (state) {
	_currentlyChanging = state;
	showAllActionButtons();
	if (_currentlyChanging == "update")
	{
		//show the key press button(s)
		hideInitButtons();
		hideCollideButtons();
		showUpdateButtons();
	}
	else if (_currentlyChanging == "init")
	{
		// show initialization buttons?
		hideUpdateButtons();
		hideCollideButtons();
		showInitButtons();
	}
	else if (_currentlyChanging == "collide")
	{
		//show the collide buttons
		hideInitButtons();
		hideUpdateButtons();
		showCollideButtons();
	}
	else if(_currentlyChanging == "view")
	{
		hideAllActionButtons();
	}
	if (_selectedObject != null)
	{
		document.getElementById('spriteName').innerHTML = "Editing object function ("+_currentlyChanging+") of type: "+_selectedObject.blueprint;
	}
	load();
}

///argument is the object that is selected
function objectSelected (argument) {
	_selectedBlueprint = null;
	_selectedObject = argument;
	document.getElementById('spriteName').innerHTML = "Editing object function ("+_currentlyChanging+") of type: "+_selectedObject.blueprint;
	updateButtons("view");
}

function objectSelectedIndex (arg) {
	objectSelected(SceneGraph[arg]);
}

function deleteObjectIndex (arg) {
	SceneGraph.splice(arg,1);
	getSceneGraph();	
}

function blueprintSelected (argument) {
	_selectedObject = null;
	_selectedBlueprint = argument;
	document.getElementById('spriteName').innerHTML = "Editing: "+_selectedBlueprint;

	str =  '<table class="table-nonfluid"><tbody><tr><td>';
	str += '<button id="changeNameBut" class="btn btn-inverse what "onclick="changeName();">Change Name</button></td>';
	str += '<td><button id="changeTagBut" class="btn btn-inverse what "onclick="changeTag();">Change Tag</button></td>';
	str += '<td><button id="initVelBut" class="btn btn-inverse what "onclick="changeInitVelocity();">initial velocity</button></td>';
	str += '<td><button id="initPosBut" class="btn btn-inverse what "onclick="changeInitPosition();">initial Position</button></td>';
	str += '</tr><tr><td><button id="changeEditingState1" class="btn btn-inverse what" onclick=\'updateButtons("collide");\'>Change default Collide</button></td>';
	str += '<td><button id="changeEditingState0" class="btn btn-inverse what" onclick=\'updateButtons("init");\'>Change default Init</button></td>';
	str += '<td><button id="changeEditingState2" class="btn btn-inverse what" onclick=\'updateButtons("update");\'>Change default Update</button></td>';
	str += '<td><button id="changeImageButton" type="file" class="btn btn-inverse what" onclick=\'changeImage();\'>Change default Image</button></td></tr>';
	str += '</tbody></table>';
	document.getElementById('buttonsTable').innerHTML = str;
	document.getElementById('spriteName').innerHTML = "Editing: "+_selectedBlueprint;
}

function changeImage () {
	var ret = prompt("Please enter an image filename","");
	if (_selectedBlueprint)
	{
		o["texture"]["src"] = ret;
	}
	else if (_selectedObject)
	{
		_selectedObject.texture.img = ret;
	}
}

function showUpdateButtons (argument) {
	$("#ifKeyPressed").show();
	$("#ifKeyUp").show();
	$("#ifKeyDown").show();
}
function showCollideButtons (argument) {
	$("#ifColliderTag").show();
	$("#destroyCollider").show();
}
function showInitButtons (argument) {
}

function hideCollideButtons (argument) {
	$("#ifColliderTag").hide();
	$("#destroyCollider").hide();
}

function hideAllActionButtons (argument) {
	hideCollideButtons();
	hideInitButtons();
	hideUpdateButtons();

	$("#addVelX").hide();
	$("#addVelY").hide();
	$("#addVelA").hide();

	$("#addPosRelX").hide();
	$("#addPosRelY").hide();
	$("#reverseXButton").hide();
	$("#reverseYButton").hide();

	$("#addInstantiateObject").hide();
	$("#addInstantiateObjectVelY").hide();
	$("#addInstantiateObjectVelX").hide();
	$("#addInstantiateObjectPosY").hide();
	$("#addInstantiateObjectPosX").hide();
	$("#doneInstantiatedButton").hide();

	$("#saveObjButton").hide();

	$("#destroySelf").hide();
	$("#stopSelfButton").hide();
	$("#ifColliderTag").hide();
	$("#ifKeyPressed").hide();
	$("#ifKeyDown").hide();
	$("#ifKeyUp").hide();
	$("#endIf").hide();
}

function showAllActionButtons (argument) {
	showCollideButtons();
	showInitButtons();
	showUpdateButtons();
	$("#addVelX").show();
	$("#addVelY").show();
	$("#addVelA").show();

	$("#addPosRelX").show();
	$("#addPosRelY").show();
	$("#reverseXButton").show();
	$("#reverseYButton").show();

	$("#addInstantiateObject").show();
	$("#addInstantiateObjectVelY").show();
	$("#addInstantiateObjectVelX").show();
	$("#addInstantiateObjectPosY").show();
	$("#addInstantiateObjectPosX").show();
	$("#doneInstantiatedButton").show();
	
	$("#saveObjButton").show();

	$("#destroySelf").show();
	$("#stopSelfButton").show();
	$("#ifColliderTag").show();
	$("#ifKeyPressed").show();
	$("#ifKeyDown").show();
	$("#ifKeyUp").show();
	$("#endIf").show();
}

function hideInitButtons (argument) {
}

function hideUpdateButtons (argument) {
	$("#ifKeyPressed").hide();
	$("#ifKeyUp").hide();
	$("#ifKeyDown").hide();
}

function addPosRelativeX () {
	newPos = prompt("Enter a new position x (relative to the current position)", "0");
	if (newPos == null)
		return false;

	$("#text").val ( $("#text").val() + "this.transform.Position.x += "+newPos+";");
	createArray();
}
function addPosRelativeY () {
	newPos = prompt("Enter a new position y (relative to the current position)", "0");
	if (newPos == null)
		return false;
	$("#text").val ( $("#text").val() + "this.transform.Position.y += "+newPos+";");
	createArray();
}

function addVelY (arg) {
	var velocity = null;
	if (arg != null)
	{
		velocity = arg;
	}
	else
	{
		velocity = prompt("Enter a velocity", "0");
	}
	if (velocity == null)
		return false;
	$("#text").val ( $("#text").val() + "this.transform.Velocity.y = "+velocity+";");
	createArray();
}

function addVelY (arg) {
	var velocity = null;
	if (arg != null)
	{
		velocity = arg;
	}
	else
	{
		velocity = prompt("Enter a velocity", "0");
	}
	if (velocity == null)
		return false;
	$("#text").val ( $("#text").val() + "this.transform.Velocity.x = "+velocity+";");
	createArray();
}

function addVelAngle () { 	
	velocity = prompt("Enter a velocity", "0");
	if (velocity == null)
		return false;
	angle = prompt("Enter an angle (radians)", "0");
	if (angle == null)
		return false;
	$("#text").val ( $("#text").val() + "this.transform.Velocity.x = Math.cos("+radians+")*"+velocity+";");
	$("#text").val ( $("#text").val() + "this.transform.Velocity.y = Math.sin("+radians+")*"+velocity+";");
	createArray();
}

function reverseX() {
	$("#text").val ( $("#text").val() + "this.transform.Velocity.x *= -1;");
	createArray();
}
function reverseY() {
	$("#text").val ( $("#text").val() + "this.transform.Velocity.y *= -1;");
	createArray();
}


function addDestroySelf() {
	$("#text").val ( $("#text").val() + "this.doRemove = true;");
	createArray();
}
function addDestroyCollider() {
	$("#text").val ( $("#text").val() + "collider.doRemove = true;");
	createArray();
}

function stopSelf(){
	addVelX(0);
	addVelY(0);
}

function addInstantiateObject() {
	var blueprint = prompt("which blueprint are you creating this from","");
	if (blueprint == null)
	{
		return false;
	}
	if (blueprint != "")
	{
		$("#text").val ($("#text").val() + "var x = GameObjectFactory(\""+blueprint+".json\");");
		createArray();
		showInstantiated();
	}
}

function addInstantiateObjectVelX () {
	var vel = prompt("velocity x", "0");
	if (vel == null)
	{
		return false;
	}
	$("#text").val ( $("#text").val() + "x.transform.Velocity.x = "+vel+";\n");
	return true;
}
function addInstantiateObjectVelY () {
	var vel = prompt("velocity y", "0");
	if (vel == null)
	{
		return false;
	}
	$("#text").val ( $("#text").val() + "x.transform.Velocity.y = "+vel+";\n");
	return true;
}
function addInstantiateObjectPosY () {
	var pos = prompt("position y", "0");
	if (pos == null)
	{
		return false;
	}
	$("#text").val ( $("#text").val() + "x.transform.Position.y = "+pos+";\n");
	return true;
}
function addInstantiateObjectPosX () {
	var pos = prompt("position x", "0");
	if (pos == null)
	{
		return false;
	}
	$("#text").val ( $("#text").val() + "x.transform.Position.x = "+pos+";\n");
	return true;
}

function createArray () {
	commandList = new Array();
	arr = $("#text").val().split("\n");
	for (var i=0; i<arr.length; i++) {
		if (arr[i] != "")
			commandList.push(arr[i]);
	}
	redrawTextArea();
}

function getFunctionFromCommands() {
	return $("#text").val();
}

function addInputKeyPressed () {
	var keyNum = prompt("What key? (use only alphanumeric)","w");
	if (keyNum == null)
		return false;
	var num = keyNum.charCodeAt(0);
	//alert("that is ascii value: "+num);
	str = "var isPressed = Input.getKey("+num+")\n";
	str = str+"if (isPressed){\n";

	$("#text").val ( $("#text").val() + str);
}

function addInputKeyDown () {
	var keyNum = prompt("What key? (use only alphanumeric)","w");
	if (keyNum == null)
		return false;
	var num = keyNum.charCodeAt(0);
	//alert("that is ascii value: "+num);
	str = "var isPressed = Input.getKeyDown("+num+")\n";
	str = str+"if (isPressed){\n";

	$("#text").val ( $("#text").val() + str);
}

function addInputKeyUp () {
	var keyNum = prompt("What key? (use only alphanumeric)","w");
	if (keyNum == null)
		return false;
	var num = keyNum.charCodeAt(0);
	//alert("that is ascii value: "+num);
	str = "var isPressed = Input.getKeyUp("+num+")\n";
	str = str+"if (isPressed){\n";

	$("#text").val ( $("#text").val() + str);
}

function addIfColliderTag () {
	var arg = prompt ("what tag are you checking is colliding", "");
	if (arg == null)
		return false;
	if (arg != "")
	{
		$("#text").val ( $("#text").val() + "if (collider.tag == \"" + arg + "\"){");
		createArray();
	}
	else
	{
		alert("You have to enter a value");
		return false;
	}
}

function showInstantiated() {
	$("#addInstantiateObjectVelY").show();
	$("#addInstantiateObjectVelX").show();
	$("#addInstantiateObjectPosX").show();
	$("#addInstantiateObjectPosY").show();
	$("#doneInstantiatedButton").show();
}

function hideInstantiated() {
	$("#addInstantiateObjectVelY").hide();
	$("#addInstantiateObjectVelX").hide();
	$("#addInstantiateObjectPosX").hide();
	$("#addInstantiateObjectPosY").hide();
	$("#doneInstantiatedButton").hide();
}

function endIf () {
	$("#text").val ( $("#text").val() + "}");
	createArray();
}

function redrawTextArea()
{
	$("#text").val("");
	for (var i = 0; i<commandList.length; i++) {
		$("#text").val( $("#text").val() + commandList[i] + "\n");
	};
}

/// saves the callback functions to the callbacks
function save () {
	createArray();

	if (_selectedBlueprint)
	{
		saveJSON();
		return true;
	}

	if(_currentlyChanging != null)
	{
		if (_currentlyChanging == "collide")
		{
			_selectedObject.setOnCollide($("#text").val());
			o["functs"]["OnCollide"] = $("#text").val();
		}
		else if(_currentlyChanging == "init")
		{
			_selectedObject.setOnInit($("#text").val());
			o["functs"]["OnInit"] = $("#text").val();
		}
		else if(_currentlyChanging == "update"){
			_selectedObject.setOnUpdate($("#text").val());
			console.log(o);
			o["functs"]["OnUpdate"] = $("#text").val();
		}
	}
	else{
		alert("error on save: not sure what callback we are creating");
	}
}

///Loads the callback functions that they are currently 
function load () {
	if (_selectedObject){
		if (_currentlyChanging == "collide")
		{
			$("#text").val(_selectedObject.getOnCollide());
		}
		else if(_currentlyChanging == "init")
		{
			$("#text").val(_selectedObject.getOnInit());
		}
		else if(_currentlyChanging == "update"){
			$("#text").val(_selectedObject.getOnUpdate());
		}
		createArray();
		return true;
	}
	else if (_selectedBlueprint)
	{
		console.log("bp = "+_selectedBlueprint);
		$.ajax({
			url:    'blueprints/'+_selectedBlueprint+".json",
			dataType: 'json',
			success: function(result) {
				//alert("Got data: "+result);
				o = result;
				if (_currentlyChanging == "collide")
				{
					$("#text").val(o["functs"]["OnCollide"]);
				}
				else if(_currentlyChanging == "init")
				{
					$("#text").val(o["functs"]["OnInit"]);
				}
				else if(_currentlyChanging == "update"){
					$("#text").val(o["functs"]["OnUpdate"]);
				}
				createArray();
			},
			async:   false
		});
		return true;
	}
}

function changeName() {
	var newName = prompt("what is the new name", _selectedBlueprint);
	if (newName != _selectedBlueprint)
	{
		_selectedBlueprint = newName;
	}
}

function changeTag() {
	load();
	var newTag = prompt("what is the new tag", o["tag"]);
	if (newTag != o["tag"])
	{
		o["tag"] = newTag;
		save();
	}
}

function changeInitVelocity() {
	load();
	var newVelX = prompt("what is the new velocity (X)", o["transform"]["Velocity"]["x"]);
	var newVelY = prompt("what is the new velocity (Y)", o["transform"]["Velocity"]["y"]);
	o["transform"]["Velocity"]["y"] = newVelY;
	o["transform"]["Velocity"]["x"] = newVelX;
	save();
}

function changeInitPosition() {
	load();
	var newVelX = prompt("what is the new position (X)", o["transform"]["Position"]["x"]);
	var newVelY = prompt("what is the new position (Y)", o["transform"]["Position"]["y"]);
	o["transform"]["Position"]["y"] = newVelY;
	o["transform"]["Position"]["x"] = newVelX;
	save();
}

function createBlueprint (argument) {
	var name = null;
	if (argument != null)
	{
		name = argument;
	}
	else
	{
		name = prompt("What is the name of your blueprint","bp");
	}
	if (name != null)
	{
		_selectedBlueprint = name;

		o = {
			"tag":"",
			"transform":
			{
				"Position":
				{
					"x":0,
					"y":0
				},
				"Velocity":
				{
					"x":0,
					"y":0
				}
			},
			"texture":
			{
				"src":"img.png"
			},
			"functs":
			{
				"OnCollide":"",
				"OnInit":"",
				"OnUpdate":""
			}
		}
		save();
		getBP();
	}
	else
	{
		alert("ERROR: you must enter a valid blueprint name");
		return false;
	}
}

function saveScene(argument)
{
	var toSend = JSON.stringify(SceneGraph);
	$.post("/saveScene", {data: toSend});
}

///save blueprint in json format
function saveJSON (argument) {
	if (!_selectedBlueprint)
	{
		alert("No blueprint selected: "+_selectedBlueprint);
		return false;
	}

	if (_currentlyChanging == "collide")
	{
		o["functs"]["OnCollide"] = $("#text").val();
	}
	else if(_currentlyChanging == "init")
	{
		o["functs"]["OnInit"] = $("#text").val();
	}
	else if(_currentlyChanging == "update"){
		o["functs"]["OnUpdate"] = $("#text").val();
	}
	str = JSON.stringify(o);
	//alert(str);
	//save to file
	$.post("/", { filename: "/"+_selectedBlueprint+".json", data: str});
}

function redrawBlueprints (bps) {
	bps = JSON.parse(bps);
	str = "<h2>Blueprints</h2><br>";
	str += '<button onclick=\'updateButtons("create_blueprint");\'>Create blueprint</button><br>';
	if (bps!= null){
		str += "<ul>";
		for (var i = bps.length - 1; i >= 0; i--) {
			bps[i] = bps[i].substr(0, bps[i].length-5);
			str += '<li><a href="#" onclick=\'blueprintSelected("';
				str+=bps[i];
				str += '")\'>'+bps[i]+"</a></li>";
};
str += "</ul>";
}
else
{
	alert("NO blueprints found");
}
document.getElementById('right').innerHTML = str;
}

function getSceneGraph (argument) {
	str = "<h2>Objects</h2><br>";
	str += '<button onclick=\'saveScene();\'>Save Scene</button><br>';
	console.log(SceneGraph);
	if (SceneGraph != null){
		str += "<table>";
		for (var i = SceneGraph.length - 1; i >= 0; i--) {
			var tempName = SceneGraph[i].blueprint.substr(0, SceneGraph[i].blueprint.length-5);
			str += '<tr><td><a href="#" onclick=\'objectSelectedIndex("';
				str += i;
				str += '")\'>'+SceneGraph[i].blueprint+"</a></td>";
str += '<td><a href="#" onclick=\'deleteObjectIndex("';
	str += i;
	str += '")\'>remove</a></td></tr>';
};
str += "</table>";
document.getElementById('left').innerHTML = str;
}
else
{
	alert("NO objects found");
}
}

function getBP () {
	$.get("/getBP", function(data){
		redrawBlueprints(data);
	});
}

function displayValues () {

}