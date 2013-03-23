function GameObject()
{
	var components = new Array();
	this.transform = new Transform();
	var texture = new Texture2D();
	texture.load("img.png");
	components.push(texture);

	this.Init = function()
	{
		components[0].Init(this);
		for (component in components)
		{
			//component.Init(this);
		}
	}
	
	this.Update = function(ctx)
	{
		components[0].Update(ctx);
		for (component in components)
		{
			//component.Update(ctx);
		}
	}
}