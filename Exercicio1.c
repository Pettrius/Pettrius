#include <stdio.h>

int main()
{
    // Variaveis
    int numero;
    int par = 0;
    int impar = 0;
    int aux = 0;

    printf("Insira o numero desejado:\n");
    scanf("%d", &numero);

    for (int i = 0; i < numero; i++)
    {
        if (numero % 2 == 0)
        {
            par++;
            printf ("Os numeros pares de 0 ate %d sao: %d.\n", numero, par);
        }

        else
        {
            impar++;
            printf("Os numeros impares de 0 ate %d sao: %d.\n", numero, impar);
        }
    }
}
