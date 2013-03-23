function GameObjectFactory(filename, sceneGraph)
{
	var request = new XMLHttpRequest();
	
	var gameObject = new GameObject();
	
	request.onreadystatechange = function()
	{
		if (request.readyState==4)
		{
			var jObject = JSON.parse(request.responseText);
			for (component in jObject)
			{
				if (component == "transform")
				{
					gameObject.transform.Position.construct(jObject["transform"]["Position"]["x"], jObject["transform"]["Position"]["y"]);
				}
				else if (component == "texture")
				{
					var texture = new Texture2D();
					texture.load(jObject["texture"]["src"]);
					gameObject.addComponent(texture);
				}
			}
			gameObject.Init();
			sceneGraph.push(gameObject);
		}
	}
	request.open("GET", filename, true);
	request.send();
}
