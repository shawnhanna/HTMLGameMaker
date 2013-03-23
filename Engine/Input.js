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

	$('#canvas').click(function(e)
	{
		Input.mousePos.x = e.offsetX;
		Input.mousePos.y = e.offsetY;
		console.log(e.offsetX, e.offsetY);
		for (var i = 0; i < SceneGraph.length; i++)
		{
			console.log(SceneGraph[i].Collider);
			if (SceneGraph[i].Collider.intersectsPoint(Input.mousePos))
			{
				console.log("HIT");
			}
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