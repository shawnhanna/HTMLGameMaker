var ctx;

var SceneGraph = new Array();
var IntervalID;
var gameRunning = true;

function init()
{
	var stopped = false;
	var context = document.getElementById("canvas");
	ctx = context.getContext('2d');
	
	
	
	SceneGraph.splice(0, SceneGraph.length);
	loadScene("Engine/scene.json");

	if (IntervalID == null)
	{
		Input.Init();
		IntervalID = setInterval(gameLoop, 1000 / 30);
	}
}

function gameLoop()
{
	Input.Update();
	if (Input.getKeyDown(27))
	{
		if (!gameRunning)
		{
			init();
		}
		gameRunning = gameRunning? false : true;
		
	}
	if (gameRunning)
	{
		if (Input.getKeyDown(81))
		{
			clearInterval(IntervalID);
		}
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillRect(0, 0,600,600);
		
		for(var i = 0; i < SceneGraph.length; i++)
		{
			SceneGraph[i].Update(ctx);
			
			if (_selectedObject != null)
			{
				ctx.beginPath();
				ctx.rect(_selectedObject.transform.Position.x,_selectedObject.transform.Position.y,
					_selectedObject.Collider.w, _selectedObject.Collider.h);
				ctx.lineWidth = 2;
				ctx.strokeStyle = "black";
				ctx.stroke();
			}
			
			for (var j = 0; j < SceneGraph.length; j++)
			{
				if (j != i)
				{
					if (SceneGraph[i].Collider.intersects(SceneGraph[j].Collider))
					{
						SceneGraph[i].OnCollide(SceneGraph[j]);
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
}