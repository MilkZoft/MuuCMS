// Dependencies
import { arrayOf, bool, number, oneOfType, shape, string } from 'prop-types';

const apiInfo = {
  cache: bool,
  total: number,
  rows: number,
  params: shape({
    language: string,
    limit: string
  })
};

const match = {
  params: shape({
    page: oneOfType([
      number,
      string
    ])
  })
};

const post = {
  id: number.isRequired,
  title: string.isRequired,
  slug: string.isRequired,
  excerpt: string.isRequired,
  content: string.isRequired,
  codes: string.isRequired,
  author: string.isRequired,
  day: string.isRequired,
  month: string.isRequired,
  year: string.isRequired,
  language: string.isRequired,
  activeComments: number.isRequired,
  state: string.isRequired
};

const req = {
  url: string
};

export default {
  apiInfo: shape(apiInfo),
  match: shape(match),
  post: shape(post),
  posts: arrayOf(shape(post)),
  req: shape(req),
  singlePost: arrayOf(shape(post))
};
