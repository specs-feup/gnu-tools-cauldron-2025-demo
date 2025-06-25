#include <stdio.h>
#include <stdint.h>

#define WIDTH 640
#define HEIGHT 480

void process_image(uint8_t input[HEIGHT][WIDTH], uint8_t output[HEIGHT][WIDTH])
{
    int kernel[3][3] = {
        {0, -1, 0},
        {-1, 5, -1},
        {0, -1, 0}};

#pragma clava begin_outline
    for (int y = 1; y < HEIGHT - 1; y++)
    {
        for (int x = 1; x < WIDTH - 1; x++)
        {
            int sum = 0;
            for (int ky = -1; ky <= 1; ky++)
            {
                for (int kx = -1; kx <= 1; kx++)
                {
                    sum += input[y + ky][x + kx] * kernel[ky + 1][kx + 1];
                }
            }
            if (sum < 0)
                sum = 0;
            if (sum > 255)
                sum = 255;
            output[y][x] = (uint8_t)sum;
        }
    }
#pragma clava end_outline

    for (int y = 0; y < HEIGHT; y++)
    {
        for (int x = 0; x < WIDTH; x++)
        {
            output[y][x] = output[y][x] > 128 ? 255 : 0;
        }
    }

    int histogram[256] = {0};
    for (int y = 0; y < HEIGHT; y++)
    {
        for (int x = 0; x < WIDTH; x++)
        {
            histogram[output[y][x]]++;
        }
    }
}
