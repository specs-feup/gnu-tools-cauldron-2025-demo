#include <stdio.h>

long dotProduct(int v1[1024], int v2[1024])
{
    long result = 0;
    for (int i = 0; i < 1024; i++)
    {
        result += v1[i] * v2[i];
    }
    return result;
}

int main()
{
    int v1[1024];
    int v2[1024];
    long result;

    for (int i = 0; i < 1024; i++)
    {
        v1[i] = i;
        v2[i] = i;
    }

    result = dotProduct(v1, v2);
    printf("Dot product: %ld\n", result);
    return 0;
}