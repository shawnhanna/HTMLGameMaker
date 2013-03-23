function Texture2D()
{
	var Parent;
	var texture = new Image();
	var Width = 0;
	var Height = 0;
	var isLoaded = false;
	
	this.getWidth = function()
	{
		return Width;
	}
	
	this.getHeight = function()
	{
		return Height;
	}
	
	texture.onload = function()
	{
		isLoaded = true;
		
		Width = parseInt(this.width);
		Height = parseInt(this.height);
	}
	
	this.Init = function(parent)
	{
		Parent = parent;
		
	}
	
	this.load = function(filename)
	{
		texture.src = gameDir+filename;
	}
	
	this.Update = function(ctx)
	{
		if (isLoaded)
		{
			ctx.drawImage(texture, Parent.transform.Position.x, Parent.transform.Position.y);
		}
	}
}