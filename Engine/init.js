var ctx;

var SceneGraph = new Array();
var IntervalID;

function init()
{
	var stopped = false;
	var context = document.getElementById("canvas");
	ctx = context.getContext('2d');
	
	Input.Init();
	
	loadScene("scene.json");
	
	IntervalID = setInterval(gameLoop, 1000 / 30);
	
}

function gameLoop()
{
	Input.Update();
	
	// if (Input.getKey(38))
	// {
		// SceneGraph[0].transform.Position.y--;
	// }
	// if (Input.getKey(40))
	// {
		// SceneGraph[0].transform.Position.y++;
	// }
	// if (Input.getKey(39))
	// {
		// SceneGraph[0].transform.Position.x++;
	// }
	// if (Input.getKey(37))
	// {
		// SceneGraph[0].transform.Position.x--;
	// }
	if (Input.getKeyDown(81))
	{
		clearInterval(IntervalID);
	}

	

	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0,600,600);
	
	
	
	for(var i = 0; i < SceneGraph.length; i++)
	{
		SceneGraph[i].Update(ctx);
		
		for (var j = 0; j < SceneGraph.length; j++)
		{
			if (j != i)
			{
				if (SceneGraph[i].Collider.intersects(SceneGraph[j].Collider))
				{
					SceneGraph[i].OnCollide(SceneGraph[j]);
					//SceneGraph[j].OnCollide(SceneGraph[i]);
				}
			}
		}
	}
	for (var i = SceneGraph.length-1; i >= 0; i--)
	{
		if (SceneGraph[i].doRemove)
		{
			SceneGraph.splice(i, 1);
		}
	}
}