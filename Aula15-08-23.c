// Bibliotecas da linguagem C
#include <stdio.h>
#include <locale.h>

// Função principal
int main()
{ // Escopo ou bloco de codigo

    setlocale(LC_ALL, "Portuguese");
    printf("Olá, linguagem \"C\".\n"); // o contrabarra é usado para deixar as aspas no terminal.
    return 0;
}