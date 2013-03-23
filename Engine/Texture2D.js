function Texture2D()
{
	var Parent;
	var texture = new Image();
	var isLoaded = false;
	
	texture.onload = function()
	{
		isLoaded = true;
	}
	
	this.Init = function(parent)
	{
		Parent = parent;
		
	}
	
	this.load = function(filename)
	{
		texture.src = filename;
	}
	
	this.Update = function(ctx)
	{
		if (isLoaded)
		{
			ctx.drawImage(texture, Parent.transform.Position.x, Parent.transform.Position.y);
		}
	}
}