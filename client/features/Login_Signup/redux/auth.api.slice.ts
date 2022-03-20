import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../../store'

export interface User {
  email: string
  passwordHash: string,
  id:string
 
}

export interface UserResponse {
  user: User
  token: string,
  
}

export interface LoginRequest {
    email: string
    passwordHash: string
  }


export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('x-access-token', token)
     
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
    signup: builder.mutation<UserResponse, LoginRequest>({
      query: (userInfo) => ({
        url: 'signup',
        method: 'POST',
        body: userInfo,
      }),
    })
    
  }),
})

export const { useLoginMutation, useProtectedMutation, useSignupMutation } = authApi
