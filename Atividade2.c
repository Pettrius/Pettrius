// Bibliotecas 
#include <stdio.h>
#include <locale.h> // Usado para ativar caracteres especiais (ex: acento)

// Fun��o Principal
int main() {

    // Traz a l�ngua portuguesa para o c�digo
    setlocale(LC_ALL,"Portuguese");

    // Sa�da da atividade do quadro
    printf("  _____________________________");
    printf("\n |Programa��o com especiais    |\n");
    printf(" |                             |");
    printf("\n |\\n      -          <Enter>   |");
    printf("\n |\\\\      -          \\         |");
    printf("\n |\\t      -          <TAB>     |\n");
    printf(" |                             |");
    printf("\n | Encerrado!                  |");
    printf("\n |_____________________________|");
    
    return 0;
}
