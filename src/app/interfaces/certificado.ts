export interface Certificado {
  id: string;
  nomeAluno: string;
  cursoReferencia: string | null;
  curso: string;
  // Guardamos o ID e o nome para manter o histórico de emissão.
  cargaHoraria: number | null;
  dataEmissao: string;
  codigoValidacao: string;
  atividades: string[];
}
// As atividades, a data e o código aparecem no certificado salvo.
