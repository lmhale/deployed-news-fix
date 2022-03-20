import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let API_URl = 'http://localhost:5000/api'
export const favoritesApi = createApi({
    reducerPath: 'favorites',
    baseQuery: fetchBaseQuery({ baseUrl: API_URl}),
    
    endpoints: builder => ({
      getFavorites: builder.query({
        query: (userId) => `${userId}/favorites`
        
      }),
      saveFavorite: builder.mutation({
        query:({ userId, ...initialFavorite }) => ({
          url: `${userId}/favorites`,
          method: 'POST',
          // Include the entire post object as the body of the request
          body: initialFavorite
        })
        
      }),
      deleteFavorite: builder.mutation({
        query:({userId, articleId}) => ({
          url: `${userId}/favorites/${articleId}`,
          method:'DELETE'
        })
      })
    })
  })
  
  export const {
    useGetFavoritesQuery,
    useSaveFavoriteMutation,
    useDeleteFavoriteMutation
  } = favoritesApi