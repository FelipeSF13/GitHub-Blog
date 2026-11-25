# GitHub Blog • requisitos do produto

Issues já oferecem autoria e Markdown, mas sua interface privilegia o acompanhamento de tarefas. Este blog organiza as notas técnicas do repositório de Felipe para leitores e estudantes de SPA, sem duplicar a publicação em outro sistema.

**Jornada:** Home → conhecer autor → buscar ou paginar → abrir publicação → ler → voltar aos mesmos resultados. Um link compartilhado abre o artigo diretamente.

| ID | Comportamento e aceite |
|---|---|
| RF-01 | A Home consulta o perfil real via Users API. |
| RF-02 | Avatar com alt, nome, bio, login, seguidores e link aparecem; campos nulos têm fallback. |
| RF-03 | O repositório público contém no mínimo dez issues originais com Markdown. |
| RF-04 | Sem termo, listar issues abertas e fechadas, mais novas primeiro. |
| RF-05 | Pesquisar título e corpo na Search API, restrita ao repositório. |
| RF-06 | Aguardar 500 ms de pausa e reiniciar a consulta na página 1. |
| RF-07 | Anterior/Próxima consultam páginas de seis itens; extremos desabilitados. |
| RF-08 | Cards trazem título, resumo, comentários e data relativa em português. |
| RF-09 | Card abre `/post/:number` via React Router. |
| RF-10 | Abrir ou recarregar o detalhe consulta uma única issue pelo número. |
| RF-11 | Títulos, listas, links e código do Markdown são legíveis. |
| RF-12 | Cabeçalho inclui autor, data, comentários, retorno e link GitHub. |
| RF-13 | Carregamento, vazio e erro têm mensagens distintas; falhas permitem nova tentativa. |
| RF-14 | Excesso de requisições informa espera sem repetir automaticamente. |
| RF-15 | Layout funciona em 375, 768 e 1280 px. |
| RF-16 | Busca rotulada, foco visível, links navegáveis por teclado e 404 com retorno. |

**Regras:** RN-01 API real; RN-02 dez issues no repo público do aluno; RN-03 excluir PRs; RN-04 busca vazia ordenada por criação; RN-05 paginação remota; RN-06 normalizar espaços e codificar parâmetros; RN-07 resumo limpo, corpo nulo com fallback e links seguros; RN-08 diferenciar ausência, rede, 404 e limite; RN-09 nenhum token no cliente; RN-10 configuração centralizada.

**Interface:** a prévia do Figma mostra capa azul escura com assinatura de terminal, perfil sobreposto, busca e grade de duas colunas. O detalhe troca o perfil pelo cabeçalho do artigo e preserva a largura de leitura. Em telas estreitas a grade vira uma coluna.

**Limites:** aplicação pública de leitura; editar, autenticar, comentar, armazenar conteúdo e administrar contas não fazem parte. A edição ocorre no GitHub.
