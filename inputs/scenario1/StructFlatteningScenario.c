#include <stdio.h>
#include <stdlib.h>

typedef struct
{
    float x;
    float y;
} Point2D;

typedef struct
{
    unsigned int width;
    unsigned int height;
    int *pixels;
} Image;

void doublePoint(Point2D point)
{
    point.x *= 2;
    point.y *= 2;
}

void halvePoint(Point2D *point)
{
    point->x /= 2;
    point->y /= 2;
}

Image *createImage(unsigned int width, unsigned int height)
{
    Image *image = (Image *)malloc(sizeof(Image));
    image->width = width;
    image->height = height;
    image->pixels = (int *)malloc(width * height * sizeof(int));
    return image;
}

int main()
{
    Point2D point;
    Point2D points[2] = {1.0, 2.0, 3.0, 4.0};

    point.x = 40.0;
    points[1].y = 50.0;

    doublePoint(point);
    halvePoint(&point);

    Image *image = createImage(800, 600);
    printf("Image size: %u x %u\n", image->width, image->height);

    return 0;
}