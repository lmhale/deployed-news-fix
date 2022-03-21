import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Article } from "../entity/Article";
import { User } from "../entity/User";
import { Favorite } from "../entity/Favorite";
import {NewsData} from '../NewsAPI'


class FavoriteController {

  static saveFavorite = async (request: Request, response: Response, next: NextFunction) => {

    try {
      const { id, title, description, url, urlToImage, source, author, category, publishedAt } = request.body

      await getRepository(Article).save({ id, title, description, url, urlToImage, source, author, category, publishedAt })
      
      const userFave = {
        userId: request.params.userId,
        articleId: request.body.id
      }
      await getRepository(Favorite).save(userFave)
      response.send(userFave)

    } catch (err) {
      console.log("something went wrong");
    }

    next()
  }

  static getAllFavorites = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const faves = await getRepository(Favorite).find(
        {

          where: {
            userId: request.params.userId
          },

          relations: ["articles"]
        });


      let arts = faves.map(e => {
        return e.articles
      })

      // return arts
      response.json(arts)
    } catch (error) {
      response.send('something went wrong')
    }

  }

  static removeFavorite = async (request: Request, response: Response, next: NextFunction) => {
    const favoriteToRemove = await getRepository(Favorite).findOne({
      where: {
        userId: request.params.userId,
        articleId: request.params.articleId
      },
      relations: ['articles', 'users']
    })

    await getRepository(Favorite).delete(favoriteToRemove)
    response.json({ favoriteToRemove })
  }


  static getAllArticles = async (request: Request, response: Response, next: NextFunction) => {
    try {

      response.json(NewsData)
    } catch (error) {
      response.send(error)
    }

  }



}

export default FavoriteController