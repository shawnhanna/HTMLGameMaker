function GameObject()
{
	var components = new Array();
	this.transform = new Transform();

	var Init = function()
	{
		for (component in Components)
		{
			component.Init(this);
		}
	}
	
	var Update = function()
	{
		for (component in Components)
		{
			component.Update();
		}
	}
}