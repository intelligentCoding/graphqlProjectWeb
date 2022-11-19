import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatFruitUsersInput = {
  userId: Scalars['Float'];
  fruitId: Scalars['Float'];
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Fruits = {
  __typename?: 'Fruits';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  Fruitsname: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateFruits: Fruits;
  createFruits: Fruits;
  deleteFruit: Scalars['Boolean'];
  updateUserFruits: UserFruits;
  createFruitUsers: UserFruits;
  deleteFruitUsers: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationUpdateFruitsArgs = {
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreateFruitsArgs = {
  name: Scalars['String'];
};


export type MutationDeleteFruitArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserFruitsArgs = {
  updateFruitUsersInput: UpdateFruitUsersInput;
};


export type MutationCreateFruitUsersArgs = {
  creatFruitUsersInput: CreatFruitUsersInput;
};


export type MutationDeleteFruitUsersArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  user?: Maybe<User>;
  userById?: Maybe<User>;
  users?: Maybe<Array<User>>;
  fruits: Array<Fruits>;
  fruitById?: Maybe<Fruits>;
  fruitsUsers: Array<UserFruits>;
  userFruitsById?: Maybe<UserFruits>;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryFruitByIdArgs = {
  id: Scalars['Int'];
};


export type QueryFruitsUsersArgs = {
  id: Scalars['Int'];
};


export type QueryUserFruitsByIdArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type UpdateFruitUsersInput = {
  id: Scalars['Float'];
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  min: Scalars['Float'];
  max: Scalars['Float'];
  fruitsByUserId?: Maybe<Array<Fruits>>;
};

export type UserFruits = {
  __typename?: 'UserFruits';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  min: Scalars['Float'];
  max: Scalars['Float'];
  user: User;
  fruits: Fruits;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateFruitsMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateFruitsMutation = (
  { __typename?: 'Mutation' }
  & { createFruits: (
    { __typename?: 'Fruits' }
    & Pick<Fruits, 'id' | 'Fruitsname'>
  ) }
);

export type CreateFruitUsersMutationVariables = Exact<{
  creatFruitUsersInput: CreatFruitUsersInput;
}>;


export type CreateFruitUsersMutation = (
  { __typename?: 'Mutation' }
  & { createFruitUsers: (
    { __typename?: 'UserFruits' }
    & Pick<UserFruits, 'id' | 'min' | 'max'>
  ) }
);

export type DeleteFruitMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteFruitMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFruit'>
);

export type DeleteFruitUsersMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteFruitUsersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFruitUsers'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'createdAt' | 'id' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  min: Scalars['Float'];
  max: Scalars['Float'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'createdAt' | 'id' | 'username'>
    )> }
  ) }
);

export type UpdateFruitsMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type UpdateFruitsMutation = (
  { __typename?: 'Mutation' }
  & { updateFruits: (
    { __typename?: 'Fruits' }
    & Pick<Fruits, 'id' | 'Fruitsname'>
  ) }
);

export type UpdateUserFruitsMutationVariables = Exact<{
  updateFruitUsersInput: UpdateFruitUsersInput;
}>;


export type UpdateUserFruitsMutation = (
  { __typename?: 'Mutation' }
  & { updateUserFruits: (
    { __typename?: 'UserFruits' }
    & Pick<UserFruits, 'id' | 'min' | 'max'>
  ) }
);

export type FruitByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FruitByIdQuery = (
  { __typename?: 'Query' }
  & { fruitById?: Maybe<(
    { __typename?: 'Fruits' }
    & Pick<Fruits, 'id' | 'Fruitsname'>
  )> }
);

export type FruitsQueryVariables = Exact<{ [key: string]: never; }>;


export type FruitsQuery = (
  { __typename?: 'Query' }
  & { fruits: Array<(
    { __typename?: 'Fruits' }
    & Pick<Fruits, 'id' | 'Fruitsname'>
  )> }
);

export type FruitsUsersQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FruitsUsersQuery = (
  { __typename?: 'Query' }
  & { fruitsUsers: Array<(
    { __typename?: 'UserFruits' }
    & Pick<UserFruits, 'id'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ), fruits: (
      { __typename?: 'Fruits' }
      & Pick<Fruits, 'id' | 'Fruitsname'>
    ) }
  )> }
);

export type PreferenceCreateQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type PreferenceCreateQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'max' | 'min'>
    & { fruitsByUserId?: Maybe<Array<(
      { __typename?: 'Fruits' }
      & Pick<Fruits, 'id' | 'Fruitsname'>
    )>> }
  )> }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'min' | 'max'>
  )> }
);

export type UserFruitByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserFruitByIdQuery = (
  { __typename?: 'Query' }
  & { fruitsUsers: Array<(
    { __typename?: 'UserFruits' }
    & Pick<UserFruits, 'id' | 'min' | 'max'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName'>
    ), fruits: (
      { __typename?: 'Fruits' }
      & Pick<Fruits, 'id' | 'Fruitsname'>
    ) }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'min' | 'max'>
  )>> }
);


export const CreateFruitsDocument = gql`
    mutation CreateFruits($name: String!) {
  createFruits(name: $name) {
    id
    Fruitsname
  }
}
    `;

export function useCreateFruitsMutation() {
  return Urql.useMutation<CreateFruitsMutation, CreateFruitsMutationVariables>(CreateFruitsDocument);
};
export const CreateFruitUsersDocument = gql`
    mutation CreateFruitUsers($creatFruitUsersInput: CreatFruitUsersInput!) {
  createFruitUsers(creatFruitUsersInput: $creatFruitUsersInput) {
    id
    min
    max
  }
}
    `;

export function useCreateFruitUsersMutation() {
  return Urql.useMutation<CreateFruitUsersMutation, CreateFruitUsersMutationVariables>(CreateFruitUsersDocument);
};
export const DeleteFruitDocument = gql`
    mutation DeleteFruit($id: Int!) {
  deleteFruit(id: $id)
}
    `;

export function useDeleteFruitMutation() {
  return Urql.useMutation<DeleteFruitMutation, DeleteFruitMutationVariables>(DeleteFruitDocument);
};
export const DeleteFruitUsersDocument = gql`
    mutation DeleteFruitUsers($id: Int!) {
  deleteFruitUsers(id: $id)
}
    `;

export function useDeleteFruitUsersMutation() {
  return Urql.useMutation<DeleteFruitUsersMutation, DeleteFruitUsersMutationVariables>(DeleteFruitUsersDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      createdAt
      id
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $username: String!, $password: String!, $min: Float!, $max: Float!) {
  register(
    options: {firstName: $firstName, lastName: $lastName, username: $username, password: $password, min: $min, max: $max}
  ) {
    errors {
      field
      message
    }
    user {
      createdAt
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateFruitsDocument = gql`
    mutation UpdateFruits($id: Int!, $name: String!) {
  updateFruits(id: $id, name: $name) {
    id
    Fruitsname
  }
}
    `;

export function useUpdateFruitsMutation() {
  return Urql.useMutation<UpdateFruitsMutation, UpdateFruitsMutationVariables>(UpdateFruitsDocument);
};
export const UpdateUserFruitsDocument = gql`
    mutation UpdateUserFruits($updateFruitUsersInput: UpdateFruitUsersInput!) {
  updateUserFruits(updateFruitUsersInput: $updateFruitUsersInput) {
    id
    min
    max
  }
}
    `;

export function useUpdateUserFruitsMutation() {
  return Urql.useMutation<UpdateUserFruitsMutation, UpdateUserFruitsMutationVariables>(UpdateUserFruitsDocument);
};
export const FruitByIdDocument = gql`
    query FruitById($id: Int!) {
  fruitById(id: $id) {
    id
    Fruitsname
  }
}
    `;

export function useFruitByIdQuery(options: Omit<Urql.UseQueryArgs<FruitByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FruitByIdQuery>({ query: FruitByIdDocument, ...options });
};
export const FruitsDocument = gql`
    query Fruits {
  fruits {
    id
    Fruitsname
  }
}
    `;

export function useFruitsQuery(options: Omit<Urql.UseQueryArgs<FruitsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FruitsQuery>({ query: FruitsDocument, ...options });
};
export const FruitsUsersDocument = gql`
    query FruitsUsers($id: Int!) {
  fruitsUsers(id: $id) {
    id
    user {
      id
      firstName
      lastName
    }
    fruits {
      id
      Fruitsname
    }
  }
}
    `;

export function useFruitsUsersQuery(options: Omit<Urql.UseQueryArgs<FruitsUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FruitsUsersQuery>({ query: FruitsUsersDocument, ...options });
};
export const PreferenceCreateDocument = gql`
    query PreferenceCreate($userId: Int!) {
  userById(id: $userId) {
    id
    max
    min
    fruitsByUserId {
      id
      Fruitsname
    }
  }
}
    `;

export function usePreferenceCreateQuery(options: Omit<Urql.UseQueryArgs<PreferenceCreateQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PreferenceCreateQuery>({ query: PreferenceCreateDocument, ...options });
};
export const UserDocument = gql`
    query User {
  user {
    id
    username
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UserByIdDocument = gql`
    query UserById($id: Int!) {
  userById(id: $id) {
    id
    min
    max
  }
}
    `;

export function useUserByIdQuery(options: Omit<Urql.UseQueryArgs<UserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByIdQuery>({ query: UserByIdDocument, ...options });
};
export const UserFruitByIdDocument = gql`
    query UserFruitById($id: Int!) {
  fruitsUsers(id: $id) {
    id
    min
    max
    user {
      id
      firstName
      lastName
    }
    fruits {
      id
      Fruitsname
    }
  }
}
    `;

export function useUserFruitByIdQuery(options: Omit<Urql.UseQueryArgs<UserFruitByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserFruitByIdQuery>({ query: UserFruitByIdDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    firstName
    lastName
    min
    max
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};