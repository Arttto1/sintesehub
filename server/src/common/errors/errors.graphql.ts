import { GraphQLError } from 'graphql';

export function throwGraphqlError(message: string, code: string): never {
  throw new GraphQLError(message, { extensions: { code } });
}

export function throwGraphqlPermissionError(): never {
  throw new GraphQLError('You do not have permission to interact with this resource.', { extensions: { code: 'FORBIDDEN' } });
}

// export function throwGraphqlFeatureFlagError(code: 'feature-flag/forbidden' | 'feature-flag/inactive'): never {
//   const message =
//     code === 'feature-flag/forbidden'
//       ? 'This resource is not available for your account.'
//       : 'This resource is not available at the moment.';
//   throwGraphqlInputError(message, code);
// }

// export function throwGraphqlForbiddenAudienceError(): never {
//   throw new GraphQLError('This type of token cannot access this resource', { extensions: { code: 'FORBIDDEN' } });
// }

// export function throwGraphqlInternalServerError(message = 'An internal server error occurred.'): never {
//   throwGraphqlInputError(message, FluxErrorCodes.InternalServerError);
// }
