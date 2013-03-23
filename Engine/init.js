var ctx;

var SceneGraph = new Array();

function init()
{
	var stopped = false;
	var context = document.getElementById("canvas");
	ctx = context.getContext('2d');
	
	Input.Init();
	
	GameObjectFactory("thing.json", SceneGraph);
	GameObjectFactory("thing2.json", SceneGraph);
	
	setInterval(gameLoop, 1000 / 30);
	
}

function gameLoop()
{
	Input.Update();
	
	if (Input.getKey(38))
	{
		SceneGraph[0].transform.Position.y--;
	}
	if (Input.getKey(40))
	{
		SceneGraph[0].transform.Position.y++;
	}
	if (Input.getKey(39))
	{
		SceneGraph[0].transform.Position.x++;
	}
	if (Input.getKey(37))
	{
		SceneGraph[0].transform.Position.x--;
	}

	

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0,600,600);
	
	for(var i = 0; i < SceneGraph.length; i++)
	{
		SceneGraph[i].Update(ctx);
	}
}