import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export interface Article {
   id:string,
  source: {
    name: string;
  },
author:string,
title: string,
description: string,
category: string,
url: string,
urlToImage: string,
publishedAt: Date,
}

//  interface News {
//   status:"ok",
//   totalResults:number,
//   articles: Article[] 
// }

export const newsApi = createApi({
    reducerPath: 'news',
    baseQuery: fetchBaseQuery({ baseUrl: '/api', 
    prepareHeaders(headers){
                    // headers.set('x-api-key',api_key)
                    return headers; 
                } 
            }),
    endpoints: (builder) => ({
      getTopHeadlines: builder.query<Article, string|void>({
        query: (category) => ({url:'articles'}),
        transformResponse:(data:{articles: Article}) => {
          return data.articles
        },
      }),
    }),
  })
  

export const {useGetTopHeadlinesQuery} = newsApi;
