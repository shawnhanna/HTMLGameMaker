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

function instantiateObject(argument) {
	if (argument == null)
	{
		alert("ERROR: instantiateObject run w/o a selected blueprint");
		return false;
	}
	else
	{
		///TODO: add instantiation code
		//load from json file
		//return gameObject
	}
}

function destroySelf ()
{
	if (this == null)
	{
		alert("ERROR: destroy self run w/o a self object");
		return false;
	}
	else
	{
		this.doRemove = true;
	}
}

function destroyCollider ()
{
	if (collidingObject == null)
	{
		alert("ERROR: destroy collider run w/o a collidingObject");
		return false;
	}
	else
	{
		collidingObject.doRemove = true;
	}
}

function setOnCollide()
{
	if (_selectedBlueprint == null)
	{
		alert("ERROR: setOnCollide run w/o a selected blueprint");
		return false;
	}
	else
	{
		$('#test').off('onCollide');
		$("#test").on("onCollide", function()
		{
			eval($("#text").val());
		});
	}
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

function addInputKeyDown () {
	var keyNum = prompt("What key? (use only alphanumeric)","w");
	var num = keyNum.charCodeAt(0);
	//alert("that is ascii value: "+num);
	str = "var isPressed = Input.getKey("+num+")\n";
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
	saveJSON();
	return false;
	createArray();

	if(_currentlyChanging != null)
	{
		if (_currentlyChanging == "onCollide")
		{
			this.setOnCollide($("#text").val());
		}
		else if(_currentlyChanging == "onInit")
		{
			this.setOnInit($("#text").val());
		}
		else if(_currentlyChanging == "onUpdate"){
			this.setOnUpdate($("#text").val());
		}
		else{
			alert("error: not sure what callback we are creating");
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

function createBlueprint (argument) {
	var name = prompt("What is the name of your blueprint");
	if (name != null)
	{
		_selectedBlueprint = name;
		saveJSON();

		o = {
		"tranform":
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
	}
}
var o;
///save blueprint in json format
function saveJSON (argument) {
	str = JSON.stringify(o);
	alert(str);
	//save to file
}

function loadJSON (filename) {
	filename = "Engine/thing.json";
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