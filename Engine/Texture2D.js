function Texture2D
{
	var texture = new Image();
	
	this.load = function(filename)
	{
		texture.src = filename;
	}
}