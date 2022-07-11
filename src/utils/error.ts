import {Response} from 'express'

export const onError = ({response, error}: {response: Response, error: unknown}) => {
  response.status(500).send(error)
  console.error(error)
}