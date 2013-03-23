function GameObject()
{
	var components = new Array();
	this.transform = new Transform();
	var texture = new Texture2D();

	this.addComponent = function(component)
	{
		components.push(component);
	}
	
	this.Init = function()
	{
		for (var i = 0; i < components.length; i++)
		{
			components[i].Init(this);
		}
	}
	
	this.Update = function(ctx)
	{
		for (var i = 0; i < components.length; i++)
		{
			components[i].Update(ctx);
		}
	}
}