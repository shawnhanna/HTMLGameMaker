function Vector2()
{
	this.x = 0;
	this.y = 0;
	
	this.construct = function(x,y)
	{
		this.x = parseInt(x);
		this.y = parseInt(y);
	}
	
	this.normalize = function()
	{
		var length = Math.sqrt(this.x*this.x + this.y*this.y);
		this.x /= length;
		this.y /= length;
	}
	this.plus = function(other)
	{
		this.x += other.x;
		this.y += other.y;
	}
}