// Actions
export const FETCH_COMMENTS = {
  request: () => 'COMMENT_REQUEST',
  success: () => 'COMMENT_SUCCESS',
};

export const SAVE_COMMENT = {
  request: () => 'SAVE_COMMENT_REQUEST',
  success: () => 'SAVE_COMMENT_SUCCESS'
};

export const DELETE_COMMENT = {
  request: () => 'DELETE_COMMENT_REQUEST',
  success: () => 'DELETE_COMMENT_SUCCESS'
};
