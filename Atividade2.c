// Bibliotecas 
#include <stdio.h>
#include <locale.h> // Usado para ativar caracteres especiais (ex: acento)

// Função Principal
int main() {

    // Traz a língua portuguesa para o código
    setlocale(LC_ALL,"Portuguese");

    // Saída da atividade do quadro
    printf("  _____________________________");
    printf("\n |Programação com especiais    |\n");
    printf(" |                             |");
    printf("\n |\\n      -          <Enter>   |");
    printf("\n |\\\\      -          \\         |");
    printf("\n |\\t      -          <TAB>     |\n");
    printf(" |                             |");
    printf("\n | Encerrado!                  |");
    printf("\n |_____________________________|");
    
    return 0;
}
