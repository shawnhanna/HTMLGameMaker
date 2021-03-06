var ctx;

var SceneGraph = new Array();
var IntervalID;
var gameRunning = true;

var d = new Date();
var lastFrameTime = 0; 
var currentFrameTime = 0;
var delta = 0;

var gameDir = "galga/";

function init()
{
	var stopped = false;
	var context = document.getElementById("canvas");
	ctx = context.getContext('2d');
	
	var sound = document.createElement("Audio");
	sound.src = gameDir + "OOUUTSIDER.mp3";
	setTimeout(function() {sound.play();}, 5000);
	
	
	SceneGraph.splice(0, SceneGraph.length);
	loadScene(gameDir + "scene.json");
	if (IntervalID == null)
	{
		Input.Init();
		IntervalID = setInterval(gameLoop, 1000 / 30);
	}
	currentFrameTime = d.getTime();
}

function gameLoop()
{
	
	Input.Update();
	if (Input.getKeyDown(80))
	{
		gameRunning = gameRunning? false : true;
	}
	if (Input.getKeyDown(27))
	{
		gameRunning = true;
		init();
	}
	if (gameRunning)
	{
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0,600,600);
		
		for(var i = 0; i < SceneGraph.length; i++)
		{
			SceneGraph[i].Update(ctx, delta);
			
			if (_selectedObject != null)
			{
				ctx.beginPath();
				ctx.rect(_selectedObject.transform.Position.x,_selectedObject.transform.Position.y,
					_selectedObject.Collider.w, _selectedObject.Collider.h);
				ctx.lineWidth = 2;
				ctx.strokeStyle = "lime";
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