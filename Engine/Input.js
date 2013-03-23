function Input() {}

Input.Init = function()
{
	Input.lastKeysDown = new Array();
	Input.currentKeys = new Array();
	Input.keysDown = new Array();
	Input.mousePos = new Vector2();

	var addKey = function(event)
	{
		var key = event.keyCode;
		if (Input.keysDown.indexOf(key) == -1)
		{
			Input.keysDown.push(key);
		}
	}
	var removeKey = function(event)
	{
		var key = event.keyCode;
		Input.keysDown.splice(Input.keysDown.indexOf(key), 1);
	}

	Input.isdragging = false;
	$('#canvas').mousedown(function(e)
	{
		Input.mousePos.x = e.offsetX;
		Input.mousePos.y = e.offsetY;
		for (var i = 0; i < SceneGraph.length; i++)
		{
			if (SceneGraph[i].Collider.intersectsPoint(Input.mousePos))
			{
				objectSelected(SceneGraph[i]);
				Input.isdragging = true;
			}
		}
	});
	
	$('#canvas').mouseup(function(e)
	{
		Input.isdragging = false;
	});
	
	$('#canvas').mousemove(function(e)
	{
		Input.mousePos.x = e.offsetX;
		Input.mousePos.y = e.offsetY;
		if (Input.isdragging)
		{
			_selectedObject.transform.Position.x = Input.mousePos.x;
			_selectedObject.transform.Position.y = Input.mousePos.y;
		}
	});

	window.addEventListener("keydown", addKey);
	window.addEventListener("keyup", removeKey);
}
Input.Update = function()
{
	Input.lastKeysDown = Input.currentKeys.slice(0);
	Input.currentKeys = Input.keysDown.slice(0);
	
}
Input.getKeyDown = function(key)
{
	if (Input.currentKeys.indexOf(key) != -1 && Input.lastKeysDown.indexOf(key) == -1)
	{
		return true;
	}
}
Input.getKey = function(key)
{
	if (Input.currentKeys.indexOf(key) != -1)
	{
		return true;
	}
}

Input.getKeyUp = function(key)
{
	if (Input.currentKeys.indexOf(key) == -1 && Input.lastKeysDown.indexOf(key) != -1)
	{
		return true;
	}
}