# Registro de uso do OpenCode

Pedido de origem: desenvolver o GitHub Blog do repositório indicado seguindo Notion, Figma e entregas da recuperação. Os contextos abaixo descrevem etapas reais desta sessão, não conversas simuladas.

| Contexto / objetivo | Resultado do OpenCode | Ajuste e evidência | Como o aluno pode conferir |
|---|---|---|---|
| Interpretar o enunciado completo antes da implementação | Leitura da página pública do Notion e da prévia visual do Figma; escrita das três SPECs | A leitura inicial do Notion não trouxe texto; a leitura dos blocos paginados revelou dez issues, capturas e debounce obrigatórios. Ver primeiro commit `docs:`. | Comparar RF-01–16 com a rubrica e mostrar o histórico do Git. |
| Implementar posts reais com paginação | Dez notas técnicas preparadas com auxílio da IA, publicadas como issues; serviços Axios e interfaces TypeScript | A Search API também atende a busca vazia; `is:issue` exclui PRs antes da paginação. Ver `src/services/github.ts` e issues #1–10. | Na aba Rede, avançar uma página e explicar os parâmetros. Revisar os artigos e personalizá-los com exemplos próprios. |
| Validar os fluxos e preparar a apresentação | Playwright verifica debounce, paginação, Markdown direto, 404 e recuperação de limite | Respostas de erro são controladas **apenas nos testes**; captação de telas usa a API pública sem interceptar tráfego. | Executar `npm test`, depois demonstrar o site publicado e comparar com as capturas. |

Verificações automatizadas foram executadas pelo assistente. A revisão pessoal e a demonstração pelo aluno devem ser realizadas por Felipe; este registro não certifica que já aconteceram.
