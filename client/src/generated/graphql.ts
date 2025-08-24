import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type GetPresignedUrlInput = {
  contentType: Scalars['String']['input'];
  expiresIn?: InputMaybe<Scalars['Float']['input']>;
  key: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: User;
  signOut: Scalars['Boolean']['output'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};

export type Query = {
  __typename?: 'Query';
  connectionStatus: Scalars['Boolean']['output'];
  getPresignedUrl: Scalars['String']['output'];
  isAuthenticated: Scalars['Boolean']['output'];
  isWhatsappConfigured: Scalars['Boolean']['output'];
  me: User;
  qrcode: Scalars['String']['output'];
  users: Array<User>;
};


export type QueryConnectionStatusArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetPresignedUrlArgs = {
  input: GetPresignedUrlInput;
};


export type QueryIsWhatsappConfiguredArgs = {
  username: Scalars['String']['input'];
};


export type QueryQrcodeArgs = {
  username: Scalars['String']['input'];
};

export type SignInInput = {
  googleToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  agentWebhook: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  evoDomain: Scalars['String']['output'];
  evoKey: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  niche: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  whatsappConnected: Scalars['Boolean']['output'];
};

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: string, username: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: boolean };

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = { __typename?: 'Query', isAuthenticated: boolean };

export type IsWhatsappConfiguredQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsWhatsappConfiguredQuery = { __typename?: 'Query', isWhatsappConfigured: boolean };

export type ConnectionStatusQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type ConnectionStatusQuery = { __typename?: 'Query', connectionStatus: boolean };

export type QrCodeQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type QrCodeQuery = { __typename?: 'Query', qrcode: string };

export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    id
    username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignInGQL extends Apollo.Mutation<SignInMutation, SignInMutationVariables> {
    document = SignInDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignOutGQL extends Apollo.Mutation<SignOutMutation, SignOutMutationVariables> {
    document = SignOutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const IsAuthenticatedDocument = gql`
    query IsAuthenticated {
  isAuthenticated
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IsAuthenticatedGQL extends Apollo.Query<IsAuthenticatedQuery, IsAuthenticatedQueryVariables> {
    document = IsAuthenticatedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const IsWhatsappConfiguredDocument = gql`
    query isWhatsappConfigured($username: String!) {
  isWhatsappConfigured(username: $username)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IsWhatsappConfiguredGQL extends Apollo.Query<IsWhatsappConfiguredQuery, IsWhatsappConfiguredQueryVariables> {
    document = IsWhatsappConfiguredDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ConnectionStatusDocument = gql`
    query ConnectionStatus($username: String!) {
  connectionStatus(username: $username)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ConnectionStatusGQL extends Apollo.Query<ConnectionStatusQuery, ConnectionStatusQueryVariables> {
    document = ConnectionStatusDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const QrCodeDocument = gql`
    query QrCode($username: String!) {
  qrcode(username: $username)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class QrCodeGQL extends Apollo.Query<QrCodeQuery, QrCodeQueryVariables> {
    document = QrCodeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }