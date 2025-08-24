// Importa a função para definir a configuração
import { CodegenConfig } from '@graphql-codegen/cli';
import { environment } from './src/environments/environment';

const url = environment.apiUrl;

// Define a configuração para o GraphQL Code Generator
const config: CodegenConfig = {
  // URL do endpoint GraphQL ou caminho para o schema GraphQL
  schema: `${url}/graphql`,

  // Caminhos dos arquivos de operações GraphQL (queries, mutations, etc.)
  documents: 'src/**/*.graphql',

  // Define onde os arquivos gerados serão salvos e os plugins a serem utilizados
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript', // Plugin para gerar tipos TypeScript
        'typescript-operations', // Plugin para gerar tipos para operações GraphQL
        'typescript-apollo-angular', // Plugin para gerar tipos para Apollo Angular
      ],
    },
  },

  // Configurações dos plugins
  config: {
    skipTypename: false, // Não pula a inclusão de __typename nos tipos gerados
  },
};

export default config;
