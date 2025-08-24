export function formatarMilhar(strNumerica: string) {
  const limpa = strNumerica.replace(/[.,]/g, '');
  const numero = parseInt(limpa, 10);
  return numero.toLocaleString('pt-BR').replace(/,/g, '.');
}
