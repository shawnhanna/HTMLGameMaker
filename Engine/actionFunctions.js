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
function hideInitButtons (argument) {
}
function hideUpdateButtons (argument) {
	$("#ifKeyPressed").hide();
	$("#ifKeyUp").hide();
	$("#ifKeyDown").hide();
}

function setVelocityX(speed)
{
	if (_selectedObject == null)
	{
		alert("ERROR: setVelocityX run w/o a selected object");
		return false;
	}
	else
	{
		///todo: fix to match engine
		_selectedObject.velocity.X = speed;
	}
}

function setVelocityY(speed)
{
	if (_selectedObject == null)
	{
		alert("ERROR: setVelocityY run w/o a selected object");
		return false;
	}
	else
	{
		///todo: fix to match engine
		_selectedObject.velocity.Y = speed;
	}
}

function setVelocity(speed, radians)
{
	if (_selectedObject == null)
	{
		alert("ERROR: setVelocityX run w/o a selected object");
		return false;
	}
	else
	{
		if (setVelocityX(speed*Math.cos(radians)))
		{
			if (setVelocityY(speed*Math.sin(radians)))
			{
				return true;
			}
		}
		alert("ERROR setting velocity with speed = "+speed + " and radians = " + radians);
		return false;
	}
}


function setRelativePositionX(position)
{
	if (_selectedObject == null)
	{
		alert("ERROR: setRelativePositionX run w/o a selected object");
		return false;
	}
	else
	{
		///todo: fix to match engine
		_selectedObject.position.X = _selectedObject.position.X + position;
	}
}

function setRelativePositionY(position)
{
	if (_selectedObject == null)
	{
		alert("ERROR: setRelativePositionY run w/o a selected object");
		return false;
	}
	else
	{
		///todo: fix to match engine
		_selectedObject.position.Y = _selectedObject.position.Y + position;
	}
}


function reverseVelX ()
{
	if (_selectedObject == null)
	{
		alert("ERROR: reverseX run w/o a selected object");
		return false;
	}
	else
	{
		_selectedObject.velocity.X = -1 * _selectedObject.velocity.X;
	}
}

function reverseVelY ()
{
	if (_selectedObject == null)
	{
		alert("ERROR: reverseY run w/o a selected object");
		return false;
	}
	else
	{
		_selectedObject.velocity.X = -1 * _selectedObject.velocity.X;
	}
}

function addPosRelativeX () {
	newPos = prompt("Enter a new position x (relative to the current position)", "0");
	$("#text").val ( $("#text").val() + "this.transform.Position.x += "+newPos+";");
	createArray();
}
function addPosRelativeY () {
	newPos = prompt("Enter a new position y (relative to the current position)", "0");
	$("#text").val ( $("#text").val() + "this.transform.Position.y += "+newPos+";");
	createArray();
}

function addVelY () {
	//velocity = $("#addVelX").val();
	velocity = prompt("Enter a velocity", "0");
	$("#text").val ( $("#text").val() + "this.transform.Velocity.y = "+velocity+";");
	createArray();
}


function addVelX () {
	//velocity = $("#addVelX").val();
	velocity = prompt("Enter a velocity", "0");
	$("#text").val ( $("#text").val() + "this.transform.Velocity.x = "+velocity+";");
	createArray();
}

function addVelAngle () { 	
	velocity = prompt("Enter a velocity", "0");
	angle = prompt("Enter an angle (radians)", "0");
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

function addInstantiateObject() {
	var blueprint = prompt("which blueprint are you creating this from","");
	if (blueprint != "")
	{
		$("#text").val ( $("#text").val() + "var x = GameObjectFactory(\""+blueprint+".json\");");
		createArray();
		showInstantiated();
	}
}

function addInstantiateObjectVelX () {
	var vel = prompt("velocity x", "0");
	$("#text").val ( $("#text").val() + "x.transform.Velocity.X = "+vel+";\n");
	return true;
}
function addInstantiateObjectVelY () {
	var vel = prompt("velocity y", "0");
	$("#text").val ( $("#text").val() + "x.transform.Velocity.Y = "+vel+";\n");
	return true;
}
function addInstantiateObjectPosY () {
	var pos = prompt("position y", "0");
	$("#text").val ( $("#text").val() + "x.transform.Position.Y = "+pos+";\n");
	return true;
}
function addInstantiateObjectPosX () {
	var pos = prompt("position x", "0");
	$("#text").val ( $("#text").val() + "x.transform.Position.X = "+pos+";\n");
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
	var num = keyNum.charCodeAt(0);
	//alert("that is ascii value: "+num);
	str = "var isPressed = Input.getKey("+num+")\n";
	str = str+"if (isPressed){\n";

	$("#text").val ( $("#text").val() + str);
}

function addInputKeyDown () {
	var keyNum = prompt("What key? (use only alphanumeric)","w");
	var num = keyNum.charCodeAt(0);
	//alert("that is ascii value: "+num);
	str = "var isPressed = Input.getKeyDown("+num+")\n";
	str = str+"if (isPressed){\n";

	$("#text").val ( $("#text").val() + str);
}

function addInputKeyUp () {
	var keyNum = prompt("What key? (use only alphanumeric)","w");
	var num = keyNum.charCodeAt(0);
	//alert("that is ascii value: "+num);
	str = "var isPressed = Input.getKeyUp("+num+")\n";
	str = str+"if (isPressed){\n";

	$("#text").val ( $("#text").val() + str);
}

function addIfColliderTag () {
	var arg = prompt ("what tag are you checking is colliding", "");
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

	if(_currentlyChanging != null)
	{
		if (_currentlyChanging == "collide")
		{
			if (_selectedBlueprint)
			{
				o["funct"]["OnCollide"] = $("#text").val();
			}
			else
			{
				this.setOnCollide($("#text").val());
			}
		}
		else if(_currentlyChanging == "init")
		{
			if (_selectedBlueprint)
			{
				o["funct"]["OnInit"] = $("#text").val();
			}
			else
			{
				this.setOnInit($("#text").val());
			}
		}
		else if(_currentlyChanging == "update"){
			if (_selectedBlueprint)
			{
				o["funct"]["OnUpdate"] = $("#text").val();
			}
			else
			{
				this.setOnUpdate($("#text").val());
			}
		}
		else{
			alert("error: not sure what callback we are creating");
		}
		if (_selectedBlueprint)
		{
			saveJSON();
		}
	}
	else
	{
		alert("Error: no callback function overwriting specified");
	}
}

///Loads the callback functions that they are currently 
function load () {
	if(_currentlyChanging != null)
	{
		if (_currentlyChanging == "onCollide")
		{
			$("#text").val(this.getOnCollide());
		}
		else if(_currentlyChanging == "onInit")
		{
			$("#text").val(this.getOnInit());
		}
		else if(_currentlyChanging == "onUpdate"){
			$("#text").val(this.getOnUpdate());
		}
		else{
			alert("error: not sure what callback we are creating");
			return false;
		}
		createArray();
		return true;
	}
	else
	{
		alert("Error: no callback function overwriting specified");
		return false;
	}
}

function changeName() {
	var newName = prompt("what is the new name", _selectedBlueprint);
	if (newName != _selectedBlueprint)
	{
		_selectedBlueprint = newName;
		createBlueprint(newName);
	}
}

function changeTag() {
	var newTag = prompt("what is the new tag", o["tag"]);
	if (newTag != o["tag"])
	{
		o["tag"] = newTag;
		saveJSON();
	}
}

function changeInitVelocity() {
	var newVelX = prompt("what is the new velocity (X)", o["transform"]["Velocity"]["x"]);
	var newVelY = prompt("what is the new velocity (Y)", o["transform"]["Velocity"]["y"]);
	o["transform"]["Velocity"]["y"] = newVelY;
	o["transform"]["Velocity"]["x"] = newVelX;
	saveJSON();
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
			"tag":"none",
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
			"funct":
			{
				"OnCollide":"",
				"OnInit":"",
				"OnUpdate":""
			}
		}
		saveJSON();
	}
}

///save blueprint in json format
function saveJSON (argument) {
	str = JSON.stringify(o);
	alert(str);
	//save to file, with name _selectedBlueprint
}

function loadJSON (filename) {
	filename = "thing.json";
	var request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if (request.readyState==4)
		{
			var jObject = JSON.parse(request.responseText);
			o = jObject;
		}
	}
	request.open("GET", filename, true);
	request.send();
}