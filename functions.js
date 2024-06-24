// Função para identificar a categoria de uma condição climática
//Recebe o Json da API DE CLIMA e retorna o grupo

function identifyGroup (conditionCode) {
    const tempoLimpo = [27, 32, 44, 31, 33];
    const tempoNublado = [26,28,34,29,30];
    const tempoNeblina = [20, 22];
    const tempoGranizo = [17, 25];
    const tempoChuvoso = [5, 6, 9, 10, 11, 12, 40, 45];
    const tempoNeve = [7, 13, 14, 15, 16, 41, 42, 43, 46];
    const tempestade = [0, 1, 2, 3, 4, 37, 38, 39, 47];

    if (tempoLimpo.indexOf(conditionCode) > -1) {
        return 0;
    } else if (tempoNublado.indexOf(conditionCode) > -1) {
        return 1;
    } else if (tempoNeblina.indexOf(conditionCode) > -1) {
        return 2;
    } else if (tempoGranizo.indexOf(conditionCode) > -1) {
        return 3;
    } else if (tempoChuvoso.indexOf(conditionCode) > -1) {
        return 4;
    } else if (tempoNeve.indexOf(conditionCode) > -1) {
        return 5;
    } else if (tempestade.indexOf(conditionCode) > -1) {
        return 6;
    } else {
        return -1; //Serviço não disponível (atribuir um número e colocar a cor branca para esse)
    }
}

//Função para escolher a cor de acordo com a categoria de uma condição climática
//Recebe o numero do grupo de condições climáticas e o array com as cores do tema que está ativo
//Realiza a requisição para mudar a cor da lâmpada.
function setColorLamp (numberOfGroup, activeThemeColors) {
    return activeThemeColors[numberOfGroup]; //Retorna a cor correspondente ao grupo
}

//Função que recebe o arquivo com o tema ativo e retorna o vetor de cores:
function getColorsOfActiveTheme (activeTheme) {
    const parsedData = JSON.parse(activeTheme)
}