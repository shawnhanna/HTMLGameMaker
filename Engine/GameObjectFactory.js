function GameObjectFactory(filename)
{
	var request = new XMLHttpRequest();
	
	var gameObject = new GameObject();
	
	gameObject.blueprint = filename;
	request.open("GET", gameDir + "blueprints/"+filename, false);
	request.send();
	var jObject = JSON.parse(request.responseText);
	for (component in jObject)
	{
		if (component == "tag")
		{
			gameObject.tag = jObject["tag"];
		}
		if (component == "transform")
		{
			if (jObject["transform"]["Velocity"] != null) {
				gameObject.transform.Position.construct(jObject["transform"]["Position"]["x"], jObject["transform"]["Position"]["y"]);
			}
			if (jObject["transform"]["Velocity"] != null){
				gameObject.transform.Velocity.construct(jObject["transform"]["Velocity"]["x"], jObject["transform"]["Velocity"]["y"]);
			}
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
		else if (component = "sound")
		{
			if (jObject["sound"] != null){
			var sound = document.createElement("Audio");
			sound.src = gameDir + jObject["sound"]["src"];
			
			gameObject.sound = sound;
			}
		}
	}
	gameObject.Init();
	SceneGraph.push(gameObject);
	return gameObject;
}
