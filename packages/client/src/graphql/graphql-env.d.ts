/* eslint-disable */
/* prettier-ignore */

export type introspection_types = {
    'Boolean': unknown;
    'DateTime': unknown;
    'ID': unknown;
    'Mutation': { kind: 'OBJECT'; name: 'Mutation'; fields: { 'google': { name: 'google'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'login': { name: 'login'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'logout': { name: 'logout'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'refresh': { name: 'refresh'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'resetPassword': { name: 'resetPassword'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'sendOtp': { name: 'sendOtp'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'signup': { name: 'signup'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'verify': { name: 'verify'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Otp': { kind: 'OBJECT'; name: 'Otp'; fields: { 'code': { name: 'code'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'createdAt': { name: 'createdAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'expiresAt': { name: 'expiresAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'mailId': { name: 'mailId'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'purpose': { name: 'purpose'; type: { kind: 'ENUM'; name: 'OtpPurpose'; ofType: null; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'user': { name: 'user'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'userId': { name: 'userId'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'OtpPurpose': { name: 'OtpPurpose'; enumValues: 'FORGOT_PASSWORD' | 'LOGIN' | 'SIGNUP' | 'VERIFY_EMAIL'; };
    'Query': { kind: 'OBJECT'; name: 'Query'; fields: { 'test': { name: 'test'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'Role': { name: 'Role'; enumValues: 'ADMIN' | 'USER'; };
    'Session': { kind: 'OBJECT'; name: 'Session'; fields: { 'createdAt': { name: 'createdAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'expiresAt': { name: 'expiresAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'isValid': { name: 'isValid'; type: { kind: 'SCALAR'; name: 'Boolean'; ofType: null; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'user': { name: 'user'; type: { kind: 'OBJECT'; name: 'User'; ofType: null; } }; 'userAgent': { name: 'userAgent'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'userId': { name: 'userId'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
    'String': unknown;
    'User': { kind: 'OBJECT'; name: 'User'; fields: { 'createdAt': { name: 'createdAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'email': { name: 'email'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'firstName': { name: 'firstName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'id': { name: 'id'; type: { kind: 'SCALAR'; name: 'ID'; ofType: null; } }; 'lastName': { name: 'lastName'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'otps': { name: 'otps'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Otp'; ofType: null; }; }; } }; 'picture': { name: 'picture'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; 'role': { name: 'role'; type: { kind: 'ENUM'; name: 'Role'; ofType: null; } }; 'sessions': { name: 'sessions'; type: { kind: 'LIST'; name: never; ofType: { kind: 'NON_NULL'; name: never; ofType: { kind: 'OBJECT'; name: 'Session'; ofType: null; }; }; } }; 'updatedAt': { name: 'updatedAt'; type: { kind: 'SCALAR'; name: 'DateTime'; ofType: null; } }; 'username': { name: 'username'; type: { kind: 'SCALAR'; name: 'String'; ofType: null; } }; }; };
};

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  name: never;
  query: 'Query';
  mutation: 'Mutation';
  subscription: never;
  types: introspection_types;
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}