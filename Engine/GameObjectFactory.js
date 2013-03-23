function GameObjectFactory(filename)
{
	var request = new XMLHttpRequest();
	
	var gameObject = new GameObject();
	
	// request.onreadystatechange = function()
	// {
		// if (request.readyState==4)
		// {
			// var jObject = JSON.parse(request.responseText);
			// for (component in jObject)
			// {
				// if (component == "tag")
				// {
					// gameObject.tag == jObject["tag"];
				// }
				// if (component == "transform")
				// {
					// gameObject.transform.Position.construct(jObject["transform"]["Position"]["x"], jObject["transform"]["Position"]["y"]);
				// }
				// else if (component == "texture")
				// {
					// var texture = new Texture2D();
					// texture.load(jObject["texture"]["src"]);
					// gameObject.addComponent(texture);
				// }
				// else if (component == "functs")
				// {
					// gameObject.setOnCollide(jObject["functs"]["OnCollide"]);
					// gameObject.setOnUpdate(jObject["functs"]["OnUpdate"]);
					// gameObject.setOnInit(jObject["functs"]["OnInit"]);
				// }
			// }
			// gameObject.Init();
			// SceneGraph.push(gameObject);
			// console.log(gameObject);
			// return gameObject;
		// }
	// }
	request.open("GET", "blueprints/"+filename, false);
	request.send();
	var jObject = JSON.parse(request.responseText);
	for (component in jObject)
	{
		if (component == "tag")
		{
			gameObject.tag == jObject["tag"];
		}
		if (component == "transform")
		{
			gameObject.transform.Position.construct(jObject["transform"]["Position"]["x"], jObject["transform"]["Position"]["y"]);
			gameObject.transform.Velocity.construct(jObject["transform"]["Velocity"]["x"], jObject["transform"]["Velocity"]["y"]);
		}
		else if (component == "texture")
		{
			var texture = new Texture2D();
			texture.load(jObject["texture"]["src"]);
			gameObject.addComponent(texture);
		}
		else if (component == "functs")
		{
			gameObject.setOnCollide(jObject["functs"]["OnCollide"]);
			gameObject.setOnUpdate(jObject["functs"]["OnUpdate"]);
			gameObject.setOnInit(jObject["functs"]["OnInit"]);
		}
	}
	gameObject.Init();
	SceneGraph.push(gameObject);
	return gameObject;
}
