function GameObject()
{
	this.blueprint = "";
	var components = new Array();
	this.transform = new Transform();
	this.Collider = new Rect();
	this.sound;
	
	this.doRemove = false;
	this.tag = "";
	
	var oncollide;
	var onupdate;
	var oninit;
	
	this.setOnCollide = function(funct)
	{
		oncollide = funct;
	}
	this.setOnUpdate = function(funct)
	{
		onupdate = funct;
	}
	this.setOnInit = function(funct)
	{
		oninit = funct;
	}
	this.getOnInit = function()
	{
		return oninit;
	}
	this.getOnUpdate = function()
	{
		return onupdate;
	}
	this.getOnCollide = function()
	{
		return oncollide;
	}

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
		eval(oninit);
	}
	
	this.Update = function(ctx, delta)
	{
		this.Collider.x = parseInt(this.transform.Position.x);
		this.Collider.y = parseInt(this.transform.Position.y);
		this.Collider.w = components[0].getWidth();
		this.Collider.h = components[0].getHeight();
		
		for (var i = 0; i < components.length; i++)
		{
			components[i].Update(ctx);
		}
		
		eval(onupdate);

		this.transform.Position.x += this.transform.Velocity.x;
		this.transform.Position.y += this.transform.Velocity.y;
	}
	GameObject.interval = 0;
	this.OnCollide = function(collider)
	{
		eval(oncollide);
	}
}