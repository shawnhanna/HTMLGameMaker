function Rect()
{
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	
	this.intersects = function(other)
	{
		if (this.x+this.w > other.x && this.x < other.x+other.w)
		{
			if (this.y + this.h > other.y && this.y < other.y + other.h)
			{
				return true;
			}
		}
		return false;
	}
	this.intersectsPoint = function(other)
	{
		if (other.x > this.x && other.x < this.x + this.h)
		{
			if (other.y < this.y + this.h && other.y > this.y)
			{
				return true;
			}
		}	
		return false;
	}
}