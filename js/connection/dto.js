export const dto = (() => {
  const getCommentResponse = ({ code, message }) => {
    return {
      code,
      message,
    };
  };

  /**
   * @param {{ uuid: string, name: string, presence: boolean, comment: string|null, created_at: string, like_count: number }[]} data
   * @returns {{ uuid: string, name: string, presence: boolean, comment: string|null, created_at: string, like_count: number }[]}
   */
  const getCommentsResponse = (data) => data.map(getCommentResponse);

  /**
   * @param {{ count: number, lists: { uuid: string, name: string, presence: boolean, comment: string|null, created_at: string, like_count: number }[] }} data
   * @returns {{ count: number, lists: { uuid: string, name: string, presence: boolean, comment: string|null, created_at: string, like_count: number }[] }}
   */
  const getCommentsResponseV2 = (data) => {
    return {
      count: data.count,
      lists: getCommentsResponse(data.lists),
    };
  };

  /**
   * @param {{status: boolean}} status
   * @returns {{status: boolean}}
   */
  const statusResponse = ({ status }) => {
    return {
      status,
    };
  };

  /**
   * @param {{token: string}} token
   * @returns {{token: string}}
   */
  const tokenResponse = ({ token }) => {
    return {
      token,
    };
  };

  /**
   * @param {{uuid: string}} uuid
   * @returns {{uuid: string}}
   */
  const uuidResponse = ({ uuid }) => {
    return {
      uuid,
    };
  };

  /**
   * @param {string} uuid
   * @param {boolean} show
   * @returns {{uuid: string, show: boolean}}
   */
  const commentShowMore = (uuid, show = false) => {
    return {
      uuid,
      show,
    };
  };

  /**
   * @param {string} id
   * @param {string} name
   * @param {boolean} presence
   * @param {string|null} comment
   * @param {string|null} gif_id
   * @returns {{id: string, name: string, presence: boolean, comment: string|null, gif_id: string|null}}
   */
  const postCommentRequest = (id, name, presence, comment, gif_id) => {
    return {
      id,
      name,
      presence,
      comment,
      gif_id,
    };
  };

  /**
   * @param {string} email
   * @param {string} password
   * @returns {{email: string, password: string}}
   */
  const postSessionRequest = (email, password) => {
    return {
      email: email,
      password: password,
    };
  };

  /**
   * @param {boolean|null} presence
   * @param {string|null} comment
   * @returns {{presence: boolean|null, comment: string|null}}
   */
  const updateCommentRequest = (presence, comment) => {
    return {
      presence: presence,
      comment: comment,
    };
  };

  return {
    uuidResponse,
    tokenResponse,
    statusResponse,
    getCommentResponse,
    getCommentsResponse,
    getCommentsResponseV2,
    commentShowMore,
    postCommentRequest,
    postSessionRequest,
    updateCommentRequest,
  };
})();
