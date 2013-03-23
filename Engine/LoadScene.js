function loadScene(filename)
{
	request = new XMLHttpRequest();
	
	request.onreadystatechange = function()
	{
		if (request.readyState == 4)
		{
			jObject = JSON.parse(request.responseText);
			
			for (var i = 0; i < jObject.length; i++)
			{
				var go = GameObjectFactory(jObject[i]["blueprint"]);
				go.tag = jObject[i]["tag"];
				if (jObject[i]["transform"]["Position"] != null){

					go.transform.Position.x = parseInt(jObject[i]["transform"]["Position"]["x"]);
					go.transform.Position.y = parseInt(jObject[i]["transform"]["Position"]["y"]);
				}
				
				if (jObject[i]["transform"]["Velocity"] != null){

					go.transform.Velocity.x = parseInt(jObject[i]["transform"]["Velocity"]["x"]);
					go.transform.Velocity.y = parseInt(jObject[i]["transform"]["Velocity"]["y"]);
				}
			}
		}
	}
	
	request.open("GET", filename, true);
	request.send();
}