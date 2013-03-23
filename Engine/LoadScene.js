function loadScene(filename)
{
	request = new XMLHttpRequest();
	
	request.onreadystatechange = function()
	{
		if (request.readyState == 4)
		{
			jObject = JSON.parse(request.responseText);
			
			for (gameObject in jObject)
			{
				var go = GameObjectFactory(jObject[gameObject]["blueprint"]);

				if (jObject[gameObject]["transform"]["Position"] != null){

					go.transform.Position.x = parseInt(jObject[gameObject]["transform"]["Position"]["x"]);
					go.transform.Position.y = parseInt(jObject[gameObject]["transform"]["Position"]["y"]);
				}
				
				if (jObject[gameObject]["transform"]["Velocity"] != null){

					go.transform.Velocity.x = parseInt(jObject[gameObject]["transform"]["Velocity"]["x"]);
					go.transform.Velocity.y = parseInt(jObject[gameObject]["transform"]["Velocity"]["y"]);
				}
				SceneGraph.push(go);
			}
		}
	}
	
	request.open("GET", filename, true);
	request.send();
}