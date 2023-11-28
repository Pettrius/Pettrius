#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

// Definindo o numero de tentativas e o tamanho maximo da palavra a ser definida
#define limite_tentativas 6
#define tamanho_max 20

// Funcao sem retorno que mostra o boneco da forca dependendo do numero de tentativas restantes
void exibirForca(int tentativas)
{
    printf("\nTentativas restantes: %d\n", limite_tentativas - tentativas);

    switch (tentativas)
    {
    case 0:
        printf("  ____\n");
        printf(" |    |\n");
        printf(" |    O\n");
        printf(" |   /|\\ \n");
        printf(" |   / \\ \n");
        break;
    case 1:
        printf("  ____\n");
        printf(" |    |\n");
        printf(" |    O\n");
        printf(" |   /|\\ \n");
        printf(" |   /\n");
        break;
    case 2:
        printf("  ____\n");
        printf(" |    |\n");
        printf(" |    O\n");
        printf(" |   /|\\ \n");
        printf(" | \n");
        break;
    case 3:
        printf("  ____\n");
        printf(" |    |\n");
        printf(" |    O\n");
        printf(" |   /|\n");
        printf(" | \n");
        break;
    case 4:
        printf("  ____\n");
        printf(" |    |\n");
        printf(" |    O\n");
        printf(" |    |\n");
        printf(" | \n");
        break;
    case 5:
        printf("  ____\n");
        printf(" |    |\n");
        printf(" |    O\n");
        printf(" | \n");
        printf(" | \n");
        break;
    case 6:
        printf("  ____\n");
        printf(" |    |\n");
        printf(" |\n");
        printf(" |\n");
        printf(" |\n");
        break;
    }
}

// Verifica se a letra dita foi ja foi adivinhada ou nao
int Adivinhadas(char letra, char letras_adivinhadas[tamanho_max], int tamanho)
{
    for (int i = 0; i < tamanho; i++)
    {
        if (letras_adivinhadas[i] == letra)
            return 1;
    }
    return 0;
}

// Funcao resposavel por exibir a palavra com as letras adivinhadas
void exibir_a_palavra(char palavra[tamanho_max], char Letras_adivinhadas[tamanho_max], int tamanho)
{
    for (int i = 0; i < tamanho; i++)
    {
        if (Adivinhadas(palavra[i], Letras_adivinhadas, tamanho))
        {
            printf("%c", palavra[i]);
        }

        else
            printf("_ ");
    }
    printf("\n");
}

int main()
{
    int opcao; // Variavel a ser utilizada para iniciar o jogo novamente ou finalizar
    char palavra[tamanho_max];
    char LetrasAdivinhadas[tamanho_max];
    int tentativas = 0;

    printf("Jogo da forca.\n");

    do
    {
        // Definindo a palavra a ser digitada
        printf("\nDigite a palavra a ser adivinhada: ");
        gets(palavra);
        fflush(stdin);

        int tamanho = strlen(palavra);

        // Limpar buffer do teclado
        while (getchar() != '\n')

            // Zerar letras adivinhadas
            for (int i = 0; i < tamanho; i++)
            {
                LetrasAdivinhadas[i] = '\0';
            }

        while (1)
        {
            // Trazendo as funcoes para a main
            exibirForca(tentativas);
            exibir_a_palavra(palavra, LetrasAdivinhadas, tamanho);

            // Verificando se o jogador ganhou
            if (strspn(LetrasAdivinhadas, palavra) == strlen(palavra))
            {
                printf("Parabens. Voce acertou a palavra.\n");
                break;
            }

            char palpite;
            printf("Digite seu palpite, jogador:\n");
            scanf("%c", &palpite);

            // Verificar se a letra foi adivinhada
            if (Adivinhadas(palpite, LetrasAdivinhadas, tamanho))
            {
                printf("Voce ja adivinhou essa letra. Tente outra.\n");
                continue;
            }

            // Atualizando as letras adivinhadas
            LetrasAdivinhadas[tentativas] = palpite;

            // Verificando se a letra esta na palavra
            if (strchr(palavra, palpite) == NULL)
            {
                tentativas++;
            }
        }

        // Decidindo se um novo joga se inica ou nao
        printf("Jogar novamente - (1). Sair (Qualquer outro numero).\n");
        scanf("%d", &opcao);

    } while (opcao == 1);
}