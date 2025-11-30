import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: number;
}

export interface CartProductRef {
  id: number;
  quantity?: number;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartProductRef[];
}

export interface CreateCartRequest {
  userId: number;
  products: CartProductRef[];
}

export interface UpdateCartRequest extends CreateCartRequest {
  id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const fakestoreApi = createApi({
  reducerPath: 'fakestoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteProduct: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
    }),
    getCarts: builder.query<Cart[], void>({
      query: () => '/carts',
    }),
    getCart: builder.query<Cart, number>({
      query: (id) => `/carts/${id}`,
    }),
    createCart: builder.mutation<Cart, CreateCartRequest>({
      query: (body) => ({
        url: '/carts',
        method: 'POST',
        body,
      }),
    }),
    updateCart: builder.mutation<Cart, UpdateCartRequest>({
      query: ({ id, ...body }) => ({
        url: `/carts/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteCart: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'DELETE',
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
    getUser: builder.query<User, number>({
      query: (id) => `/users/${id}`,
    }),
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deleteUser: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCartsQuery,
  useGetCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useLazyGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLoginMutation,
} = fakestoreApi;
