///actionFunctions.js
/// This file contains functions that modify the behavior of a game's objects


var commandList = new Array();
var collidingObject = null;
var selfObject = null;

var _selectedObject = null;
var _selectedBlueprint = null;

function instantiateObject() {
	if (_selectedObject == null)
	{
		alert("ERROR: instantiateObject run w/o a selected object");
		return false;
	}
	else
	{
		///TODO: add instantiation code
	}
}

function destroySelf ()
{
	if (selfObject == null)
	{
		alert("ERROR: destroy self run w/o a self object");
		return false;
	}
	else
	{
		//TODO: find out the destroy code
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
		//TODO: find out the destroy code
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
		_selectedBlueprint.velocity.X = speed;
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
		_selectedBlueprint.velocity.Y = speed;
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


function addVelX () {
	//velocity = $("#addVelX").val();
	velocity = prompt("Enter a velocity", "0");
	$("#text").val ( $("#text").val() + "setVelocityX("+velocity+");");
	createArray();
}
function addVelY () {
	//velocity = $("#addVelX").val();
	velocity = prompt("Enter a velocity", "0");
	$("#text").val ( $("#text").val() + "setVelocityY("+velocity+");");
	createArray();
}
function addVelAngle () { 	
	velocity = prompt("Enter a velocity", "0");
	angle = prompt("Enter an angle (radians)", "0");
	$("#text").val ( $("#text").val() + "setVelocity("+velocity+", "+angle+");");
	createArray();
}

function reverseX() {
	$("#text").val ( $("#text").val() + "reverseVelX();");
	createArray();
}
function reverseY() {
	$("#text").val ( $("#text").val() + "reverseVelY();");
	createArray();
}


function addDestroySelf() {
	$("#text").val ( $("#text").val() + "destroySelf();");
	createArray();
}
function addDestroyCollider() {
	$("#text").val ( $("#text").val() + "destroyCollider();");
	createArray();
}

function addInstantiateObject() {
	var blueprint = prompt("which blueprint are you creating this from","");
	if (blueprint != "")
	{
		$("#text").val ( $("#text").val() + "var x = instantiateObject(\""+blueprint+"\");");
		createArray();
	}
}

function addInstantiateObjectVelX () {
	var vel = prompt("velocity x", "0");
	$("#text").val ( $("#text").val() + "x.velocity.X = "+vel+";");
}
function addInstantiateObjectVelY () {
	var vel = prompt("velocity y", "0");
	$("#text").val ( $("#text").val() + "x.velocity.Y = "+vel+";");
}
function addInstantiateObjectPosY () {
	var pos = prompt("position y", "0");
	$("#text").val ( $("#text").val() + "x.position.Y = "+pos+";");
}
function addInstantiateObjectPosY () {
	var pos = prompt("position y", "0");
	$("#text").val ( $("#text").val() + "x.position.X = "+pos+";");
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
	return function() {eval($("#text").val ());};
}

function addIfColliderTag () {
	var arg = prompt ("what tag are you checking is colliding", "");
	if (arg != "")
	{
		$("#text").val ( $("#text").val() + "if (collider.tag == \"" + arg + "\"){");
		createArray();
		prevVal = $("#ifColliderTag").text();
		$("#ifColliderTag").text("End If");
		$("#ifColliderTag").unbind("click");
		document.getElementById('ifColliderTag').onclick=function(){
			endIfColliderTag();
			return false;
		};
		return false;
	}
	else
	{
		alert("You have to enter a value");
		return false;
	}
}

function endIfColliderTag () {
	$("#text").val ( $("#text").val() + "}");
	createArray();
	$("#ifColliderTag").unbind("click");
	document.getElementById('ifColliderTag').onclick=function(){
		addIfColliderTag();
		return false;
	};
	$("#ifColliderTag").text(prevVal);
	return false;
}

function redrawTextArea()
{
	$("#text").val("");
	for (var i = 0; i<commandList.length; i++) {
		$("#text").val( $("#text").val() + commandList[i] + "\n");
	};
}