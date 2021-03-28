class Coin{
    constructor(x, y, height, width, col, sprite)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.col = col;
        this.sprite = sprite;
    }

    setX(x)
    {
       this.x = x;
    }
    setY(y)
    {
       this.y = y;
    }
    setHeight(height)
    {
       this.height = height;
    }
    setWidth(width)
    {
       this.width = width;
    }
    setCol(col)
    {
        this.col = col;
    }
    setSprite(col)
    {
        this.sprite = sprite;
    }
    get theX()
    {
        return this.x;
    }
    get theY()
    {
        return this.y;
    }
    get theHeight()
    {
        return this.height;
    }
    get theWidth()
    {
        return this.width;
    }
    get theCol()
    {
        return this.col;
    }
    get theSprite()
    {
        return this.sprite;
    }
}
