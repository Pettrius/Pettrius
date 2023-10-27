#include <stdio.h>
#include <math.h>

// Funcoes de cada operacao da calculadora
int somar(int num1, int num2)
{
    int resultado = num1 + num2;
    return resultado;
}

int subtrair(int num1, int num2)
{
    int resultado = num1 - num2;
    return resultado;
}

int multiplicar(int num1, int num2)
{
    int resultado = num1 * num2;
    return resultado;
}

int dividir(int num1, int num2)
{
    int resultado = num1 / num2;
    return resultado;
}

int potencia(int num1, int num2)
{
    int resultado = pow(num1, num2);
    return resultado;
}

int raiz(int num1)
{
    int resultado = sqrt(num1);
    return resultado;
}

int fatorial(int num1)
{
    if (num1 == 0)
    {
        return 1;
    }

    else
    {
        return num1 * fatorial(num1 - 1);
    }
}

// Funcao principal
int main()
{
    // Variáveis
    int opcao;
    int num1;
    int num2;
    int retorno;

    // Opcoes da calculadora
    printf("Escolha uma opcao:\n");
    printf("1.Somar\n");
    printf("2.Subtrair\n");
    printf("3.Multiplicar\n");
    printf("4.Dividir\n");
    printf("5.Potencia\n");
    printf("6.Raiz Quadrada\n");
    printf("7.Fatorial\n");
    printf("8.Sair do app.\n");

    // Repete as operacoes ate que queira sair da calculadora
    do
    {
        // Entrando com a opcao desejada
        printf("Selecione a opcao desejada.\n");
        scanf("%d", &opcao);

        // Se for escolhido raiz ou fatorial, sera pedido apenas 1 numero
        if (opcao == 6 || opcao == 7)
        {
            switch (opcao)
            {
            case 6:
                printf("Voce escolheu fazer uma raiz quadrada.\n");
                printf("Insira o numero desejado:\n");
                scanf("%d", &num1);
                retorno = raiz(num1);
                printf("O valor da raiz quadrada eh: %d.\n", retorno);
                break;

            case 7:
                printf("Voce escolheu calcular o fatorial.\n");
                printf("Insira o numero desejado:\n");
                scanf("%d", &num1);
                retorno = fatorial(num1);
                printf("O resultado do fatorial eh: %d.\n", retorno);
                break;

            default:
                break;
            }
        }

        // Se for outras operacoes, insira 2 numeros
        if (opcao >= 1 && opcao <= 5)
        {
            switch (opcao)
            {
            case 1:
                printf("Voce escolheu somar.\n");
                printf("Digite os dois numeros para as operacoes:\n");
                scanf("%d", &num1);
                scanf("%d", &num2);
                retorno = somar(num1, num2);
                printf("O valor da soma eh: %d.\n", retorno);
                break;

            case 2:
                printf("Voce escolheu subtrair.\n");
                printf("Digite os dois numeros para as operacoes:\n");
                scanf("%d", &num1);
                scanf("%d", &num2);
                retorno = subtrair(num1, num2);
                printf("O valor da subtracao eh: %d.\n", retorno);
                break;

            case 3:
                printf("Voce escolheu multiplicar.\n");
                printf("Digite os dois numeros para as operacoes:\n");
                scanf("%d", &num1);
                scanf("%d", &num2);
                retorno = multiplicar(num1, num2);
                printf("O valor da multiplicacao eh: %d.\n", retorno);
                break;

            case 4:
                printf("Voce escolheu dividir.\n");
                printf("Digite os dois numeros para as operacoes:\n");
                scanf("%d", &num1);
                scanf("%d", &num2);
                if (num2 != 0)
                {
                    retorno = dividir(num1, num2);
                    printf("O valor da divisao eh: %d.\n", retorno);
                }
                else
                {
                    break;
                }
                break;

            case 5:
                printf("Voce escolheu potenciar.\n");
                printf("Digite os dois numeros para as operacoes:\n");
                scanf("%d", &num1);
                scanf("%d", &num2);
                retorno = potencia(num1, num2);
                printf("O valor da potencia eh: %d.\n", retorno);
                break;

            default:
                break;
            }
        }

    } while (opcao != 8); // Se o usuario digitar 8, o programa sera encerrado.
}