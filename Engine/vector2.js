function Vector2()
{
	this.x = 0;
	this.y = 0;
	
	this.construct = function(x,y)
	{
		this.x = x;
		this.y = y;
	}
	
	this.normalize = function()
	{
		var length = Math.sqrt(this.x*this.x + this.y*this.y);
		this.x /= length;
		this.y /= length;
	}
}