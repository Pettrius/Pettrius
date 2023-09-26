#include <stdio.h>

int main()
{
    // Variaveis
    int opcao;

    printf("Opcao 1 - Cadastrar\n");
    printf("Opcao 2 - Buscar\n");
    printf("Opcao 3 - Atualizar\n");
    printf("Opcao 4 - Excluir\n");
    printf("Opcao 5 - Sair\n");

    printf("Insira a opcao desejada:\n");
    scanf("%d", &opcao);

    while (opcao < 1 || opcao > 5)
    {
        printf("Opcao 1 - Cadastrar\n");
        printf("Opcao 2 - Buscar\n");
        printf("Opcao 3 - Atualizar\n");
        printf("Opcao 4 - Excluir\n");
        printf("Opcao 5 - Sair\n");

        printf("Insira a opcao desejada:\n");
        scanf("%d", &opcao);
    }

    if (opcao == 1)
    {
        printf("Voce escolheu a opcao 'Cadastrar'.\n");
    }

    else if (opcao == 2)
    {
        printf("Voce escolheu a opcao 'Buscar'.\n");
    }

    else if (opcao == 3)
    {
        printf("Voce escolheu a opcao 'Atualizar'.\n");
    }

    else if (opcao == 4)
    {
        printf("Voce escolheu a opcao 'Excluir'.\n");
    }

    else if (opcao == 5)
    {
        printf("Voce escolheu a opcao 'Sair'.\n");
    }

}
