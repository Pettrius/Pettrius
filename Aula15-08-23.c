// Bibliotecas da linguagem C
#include <stdio.h>
#include <locale.h>

// Fun��o principal
int main()
{ // Escopo ou bloco de codigo

    setlocale(LC_ALL, "Portuguese");
    printf("Ol�, linguagem \"C\".\n"); // o contrabarra � usado para deixar as aspas no terminal.
    return 0;
}