/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** A file upload on base64 */
  Upload: { input: any; output: any; }
};

export type ActivateUserRequest = {
  ValidationToken: Scalars['String']['input'];
};

export type ActivateUserResponse = {
  __typename?: 'ActivateUserResponse';
  Email: Scalars['String']['output'];
  Id: Scalars['String']['output'];
};

export type AddPaymentRequest = {
  PaymentMethod: PaymentMethod;
  PhotoFile?: InputMaybe<Scalars['Upload']['input']>;
  Reference: Scalars['String']['input'];
  SubscriptionId: Scalars['String']['input'];
};

export type Bet = {
  __typename?: 'Bet';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  gameType: GameType;
  id: Scalars['String']['output'];
  status: BetStatus;
  table: RouletteTable;
  value: Scalars['String']['output'];
};

export enum BetStatus {
  Cancelled = 'Cancelled',
  Lost = 'Lost',
  Placed = 'Placed',
  Won = 'Won'
}

export type Country = {
  __typename?: 'Country';
  Country: Scalars['String']['output'];
  PhonePrefix: Scalars['String']['output'];
};

export type CreateBetRequest = {
  amount: Scalars['Float']['input'];
  gameType: GameType;
  rouletteTableId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateSubscriptionRequest = {
  Frequency: SubscriptionFrequency;
  PaymentMethod: PaymentMethod;
  PhotoFile?: InputMaybe<Scalars['Upload']['input']>;
  Reference: Scalars['String']['input'];
};

/** Enumeration for different game types in roulette */
export enum GameType {
  Column = 'Column',
  Dozen = 'Dozen',
  HighAndLow = 'HighAndLow',
  OddAndEven = 'OddAndEven',
  Orphelins = 'Orphelins',
  /** A bet on the number zero */
  PlayZero = 'PlayZero',
  RedAndBlack = 'RedAndBlack',
  Split = 'Split',
  StraightUp = 'StraightUp',
  Street = 'Street',
  TiersDuCylindre = 'TiersDuCylindre',
  VoisinsDuZero = 'VoisinsDuZero'
}

export type GetBetRequest = {
  id: Scalars['String']['input'];
};

export type GetBetsBatchRequest = {
  ids: Array<Scalars['String']['input']>;
};

export type GetLastBetsRequest = {
  limit: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};

export type GetLastRouletteTableNumbersRequest = {
  Limit: Scalars['Int']['input'];
  TableId: Scalars['String']['input'];
};

export type GetRouletteTableProbabilitiesRequest = {
  EndDate: Scalars['DateTime']['input'];
  GameType: GameType;
  ProbabilitiesResultLimit: Scalars['Int']['input'];
  StartDate: Scalars['DateTime']['input'];
  TableId: Scalars['String']['input'];
};

export type GetRouletteTablesRequest = {
  IsOnline?: InputMaybe<Scalars['Boolean']['input']>;
  Limit: Scalars['Int']['input'];
  Providers: Array<Scalars['String']['input']>;
  Query: Scalars['String']['input'];
  Skip: Scalars['Int']['input'];
};

export type GetRouletteTablesResponse = {
  __typename?: 'GetRouletteTablesResponse';
  Providers: Array<Scalars['String']['output']>;
  Tables: Array<RouletteTable>;
  Total: Scalars['Int']['output'];
};

export type GetSubscriptionsRequest = {
  HasPendingPayments?: InputMaybe<Scalars['Boolean']['input']>;
  IsActive?: InputMaybe<Scalars['Boolean']['input']>;
  Limit?: InputMaybe<Scalars['Int']['input']>;
  Skip?: InputMaybe<Scalars['Int']['input']>;
  UserId?: InputMaybe<Scalars['String']['input']>;
};

export type GetSubscriptionsResponse = {
  __typename?: 'GetSubscriptionsResponse';
  Subscriptions: Array<UserSubscription>;
  Total: Scalars['Int']['output'];
};

export type GetUserBetsRequest = {
  limit: Scalars['Int']['input'];
  rouletteTableID?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
};

export type GetUsersRequest = {
  limit: Scalars['Int']['input'];
  paymentStatus?: InputMaybe<PaymentStatus>;
  query?: InputMaybe<Scalars['String']['input']>;
  skip: Scalars['Int']['input'];
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  Total: Scalars['Int']['output'];
  Users: Array<User>;
};

export type LoginRequest = {
  Email: Scalars['String']['input'];
  Password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  Token: Scalars['String']['output'];
  User: UserInfoResponse;
};

export type Mutation = {
  __typename?: 'Mutation';
  ActivateUser: ActivateUserResponse;
  AddPayment: UserSubscription;
  CreateBet: Bet;
  CreateSubscription: UserSubscription;
  Login: LoginResponse;
  RegisterUser: RegisterUserResponse;
  ResendActivationEmail: Scalars['Boolean']['output'];
  ResetPassword: ResetPasswordResponse;
  SendResetPasswordEmail: Scalars['Boolean']['output'];
  StartFreeSubscription: UserSubscription;
  UpdatePaymentStatus: Scalars['Boolean']['output'];
  UpdateSubscriptionStatus: Scalars['Boolean']['output'];
  UpdateUserActiveStatus: Scalars['Boolean']['output'];
  UpdateUserInfo: User;
};


export type MutationActivateUserArgs = {
  user: ActivateUserRequest;
};


export type MutationAddPaymentArgs = {
  input: AddPaymentRequest;
};


export type MutationCreateBetArgs = {
  input: CreateBetRequest;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionRequest;
};


export type MutationLoginArgs = {
  user: LoginRequest;
};


export type MutationRegisterUserArgs = {
  registerUser: RegisterUserRequest;
};


export type MutationResendActivationEmailArgs = {
  user: ResendActivationEmail;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordRequest;
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdatePaymentStatusArgs = {
  input: UpdatePaymentStatusRequest;
};


export type MutationUpdateSubscriptionStatusArgs = {
  input: UpdateSubscriptionStatusRequest;
};


export type MutationUpdateUserActiveStatusArgs = {
  isActive: Scalars['Boolean']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInfoRequest;
};

export type Payment = {
  __typename?: 'Payment';
  CreatedAt: Scalars['DateTime']['output'];
  Id: Scalars['String']['output'];
  PaymentMethod: PaymentMethod;
  PhotoUrl: Scalars['String']['output'];
  Reference: Scalars['String']['output'];
  ReviewComment?: Maybe<Scalars['String']['output']>;
  Status: PaymentStatus;
};

export enum PaymentMethod {
  Crypto = 'Crypto',
  PayPal = 'PayPal',
  Phone = 'Phone'
}

export enum PaymentStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type Query = {
  __typename?: 'Query';
  GetBet: Bet;
  GetBetsBatch: Array<Bet>;
  GetCountriesWithPhonePrefixes: Array<Country>;
  GetCurrentUserSubscription: UserSubscription;
  GetLastBets: Array<Bet>;
  GetLastRouletteTableNumbers: Array<RouletteTableNumbers>;
  GetRouletteTableProbabilities: RouletteTableProbabilitiesResponse;
  GetRouletteTables: GetRouletteTablesResponse;
  GetSubscription: UserSubscription;
  GetSubscriptions: GetSubscriptionsResponse;
  GetUser: User;
  GetUserBets: Array<Bet>;
  GetUserInfo: UserInfoResponse;
  GetUserSubscriptionPaymentHistory: Array<UserSubscriptionPaymentHistory>;
  GetUsers: GetUsersResponse;
};


export type QueryGetBetArgs = {
  request: GetBetRequest;
};


export type QueryGetBetsBatchArgs = {
  request: GetBetsBatchRequest;
};


export type QueryGetLastBetsArgs = {
  request: GetLastBetsRequest;
};


export type QueryGetLastRouletteTableNumbersArgs = {
  request: GetLastRouletteTableNumbersRequest;
};


export type QueryGetRouletteTableProbabilitiesArgs = {
  request: GetRouletteTableProbabilitiesRequest;
};


export type QueryGetRouletteTablesArgs = {
  request: GetRouletteTablesRequest;
};


export type QueryGetSubscriptionArgs = {
  subscriptionId: Scalars['String']['input'];
};


export type QueryGetSubscriptionsArgs = {
  request: GetSubscriptionsRequest;
};


export type QueryGetUserArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUserBetsArgs = {
  request: GetUserBetsRequest;
};


export type QueryGetUserSubscriptionPaymentHistoryArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetUsersArgs = {
  request: GetUsersRequest;
};

export type RegisterUserRequest = {
  BirthDate: Scalars['DateTime']['input'];
  Country: Scalars['String']['input'];
  Email: Scalars['String']['input'];
  Name: Scalars['String']['input'];
  Password: Scalars['String']['input'];
  PhoneNumber: Scalars['String']['input'];
};

export type RegisterUserResponse = {
  __typename?: 'RegisterUserResponse';
  Email: Scalars['String']['output'];
  Id: Scalars['String']['output'];
};

export type ResendActivationEmail = {
  Email: Scalars['String']['input'];
};

export type ResetPasswordRequest = {
  NewPassword: Scalars['String']['input'];
  ValidationToken: Scalars['String']['input'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  Email: Scalars['String']['output'];
  UserId: Scalars['String']['output'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type RouletteTable = {
  __typename?: 'RouletteTable';
  Id: Scalars['String']['output'];
  IsOnline: Scalars['Boolean']['output'];
  Name: Scalars['String']['output'];
  Provider: Scalars['String']['output'];
};

export type RouletteTableNumbers = {
  __typename?: 'RouletteTableNumbers';
  Date: Scalars['DateTime']['output'];
  Number: Scalars['Int']['output'];
};

export type RouletteTableProbabilitiesResponse = {
  __typename?: 'RouletteTableProbabilitiesResponse';
  Probabilities: Array<RouletteTableProbability>;
  Results: Array<RouletteTableResult>;
};

export type RouletteTableProbability = {
  __typename?: 'RouletteTableProbability';
  Count: Scalars['Int']['output'];
  Tag: Scalars['String']['output'];
  Value: Scalars['Float']['output'];
};

export type RouletteTableResult = {
  __typename?: 'RouletteTableResult';
  Date: Scalars['DateTime']['output'];
  Number: Scalars['Int']['output'];
  Tag: Scalars['String']['output'];
};

export enum SubscriptionFrequency {
  Annual = 'Annual',
  Daily = 'Daily',
  Monthly = 'Monthly',
  Weekly = 'Weekly'
}

export type UpdatePaymentStatusRequest = {
  PaymentId: Scalars['String']['input'];
  ReviewComment?: InputMaybe<Scalars['String']['input']>;
  Status: PaymentStatus;
  SubscriptionId: Scalars['String']['input'];
};

export type UpdateSubscriptionStatusRequest = {
  IsActive: Scalars['Boolean']['input'];
  SubscriptionId: Scalars['String']['input'];
};

export type UpdateUserInfoRequest = {
  BirthDate: Scalars['DateTime']['input'];
  Country: Scalars['String']['input'];
  Name: Scalars['String']['input'];
  Password: Scalars['String']['input'];
  PhoneNumber: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  Bets: Array<Bet>;
  BirthDate: Scalars['DateTime']['output'];
  Country: Scalars['String']['output'];
  CreatedAt: Scalars['DateTime']['output'];
  Email: Scalars['String']['output'];
  Id: Scalars['String']['output'];
  IsActive: Scalars['Boolean']['output'];
  LastLogin: Scalars['DateTime']['output'];
  Name: Scalars['String']['output'];
  PhoneNumber: Scalars['String']['output'];
  Subscription?: Maybe<UserSubscription>;
};

export type UserInfoResponse = {
  __typename?: 'UserInfoResponse';
  BirthDate: Scalars['DateTime']['output'];
  Country: Scalars['String']['output'];
  Email: Scalars['String']['output'];
  Id: Scalars['String']['output'];
  IsAdmin: Scalars['Boolean']['output'];
  LastLogin?: Maybe<Scalars['DateTime']['output']>;
  Name: Scalars['String']['output'];
  PhoneNumber: Scalars['String']['output'];
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  CreatedAt: Scalars['DateTime']['output'];
  EndDate: Scalars['DateTime']['output'];
  Frequency: SubscriptionFrequency;
  Id: Scalars['String']['output'];
  IsActive: Scalars['Boolean']['output'];
  LastPay?: Maybe<Scalars['DateTime']['output']>;
  Payments: Array<Payment>;
  StartDate: Scalars['DateTime']['output'];
  UserId: Scalars['String']['output'];
};

export type UserSubscriptionPaymentHistory = {
  __typename?: 'UserSubscriptionPaymentHistory';
  Frequency: SubscriptionFrequency;
  PaidAt: Scalars['DateTime']['output'];
  PaymentId: Scalars['String']['output'];
  PaymentMethod: PaymentMethod;
  Reference: Scalars['String']['output'];
  Status: PaymentStatus;
  SubscriptionId: Scalars['String']['output'];
};

export type GetUsersQueryVariables = Exact<{
  request: GetUsersRequest;
}>;


export type GetUsersQuery = { __typename?: 'Query', GetUsers: { __typename?: 'GetUsersResponse', Users: Array<{ __typename?: 'User', Id: string, Name: string, Email: string, Country: string, BirthDate: any, PhoneNumber: string, Subscription?: { __typename?: 'UserSubscription', Id: string, UserId: string, IsActive: boolean, Frequency: SubscriptionFrequency, EndDate: any, StartDate: any, LastPay?: any | null, CreatedAt: any, Payments: Array<{ __typename?: 'Payment', Id: string, PhotoUrl: string, Reference: string, Status: PaymentStatus, PaymentMethod: PaymentMethod, CreatedAt: any }> } | null }> } };


export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"request"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUsersRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"request"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"Name"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Country"}},{"kind":"Field","name":{"kind":"Name","value":"BirthDate"}},{"kind":"Field","name":{"kind":"Name","value":"PhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"Subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"UserId"}},{"kind":"Field","name":{"kind":"Name","value":"IsActive"}},{"kind":"Field","name":{"kind":"Name","value":"Frequency"}},{"kind":"Field","name":{"kind":"Name","value":"EndDate"}},{"kind":"Field","name":{"kind":"Name","value":"StartDate"}},{"kind":"Field","name":{"kind":"Name","value":"LastPay"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"Payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Id"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Reference"}},{"kind":"Field","name":{"kind":"Name","value":"Status"}},{"kind":"Field","name":{"kind":"Name","value":"PaymentMethod"}},{"kind":"Field","name":{"kind":"Name","value":"CreatedAt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;