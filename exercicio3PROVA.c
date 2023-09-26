#include <stdio.h>

int main()
{
    // Variaveis
    int opcao;
    int numero1;
    int numero2;

    // Mostrando as opcoes
    printf("1. Multiplicacao.\n");
    printf("2. Divisao.\n");

    // Escolhendo uma opcao
    printf("Escolha uma opcao:\n");
    scanf("%d", &opcao);

    // Verifica se a opcao existe
    while (opcao < 1 || opcao > 2)
    {
        printf("Digite uma opcao valida.\n");

        printf("Escolha uma opcao:\n");
        scanf("%d", &opcao);
    }

    // Inserindo os dois numeros para realizar a operacao
    printf("Digite o primeiro numero:\n");
    scanf("%d", &numero1);

    printf("Digite o segundo numero:\n");
    scanf("%d", &numero2);

    // Realizando a operacao 
    if (opcao = 1)
    {
        printf("O resultado eh: %d.\n", numero1 * numero2);
    }

    else if (opcao = 2)
    {
        if (numero2 = 0)
        {
            printf("Nao eh possivel fazer divisao por zero.\n");
        }
        else
        {
            printf("O resultado eh: %d.\n", numero1 * numero2);
        }
    }
}