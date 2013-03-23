var ctx;

var gameObject = new GameObject();

function init()
{
	var stopped = false;
	var context = document.getElementById("canvas");
	ctx = context.getContext('2d');
	gameObject.transform.Position.construct(100,100);
	
	setInterval(gameLoop, 1000 / 30);
}

function gameLoop()
{
	gameObject.transform.Position.x += 1;
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0,600,600);
	ctx.fillStyle = "rgb(200,0,0)";
	ctx.fillRect(gameObject.transform.Position.x,gameObject.transform.Position.y,55,50);
}