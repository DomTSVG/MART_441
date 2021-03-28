class Obstacle{
    constructor(x, y, height, width, dir)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.dir = dir;
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
    setDir(dir)
    {
        this.dir = dir;
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
    get theDir()
    {
        return this.dir;
    }
}
