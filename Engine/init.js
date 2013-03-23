var ctx;

var SceneGraph = new Array();
SceneGraph.push(new GameObject());
SceneGraph.push(new GameObject());
SceneGraph.push(new GameObject());

function init()
{
	var stopped = false;
	var context = document.getElementById("canvas");
	ctx = context.getContext('2d');
	
	for (var i = 0; i < SceneGraph.length; i++)
	{
		SceneGraph[i].Init();
	}
	SceneGraph[0].transform.Position.construct(40,50);
	SceneGraph[1].transform.Position.construct(100,100);
	
	setInterval(gameLoop, 1000 / 30);
}

function gameLoop()
{
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0,600,600);
	
	for(var i = 0; i < SceneGraph.length; i++)
	{
		SceneGraph[i].Update(ctx);
	}
}