import { util } from "./util.js";
import { storage } from "./storage.js";
import { request, HTTP_GET, HTTP_STATUS_OK } from "../connection/request.js";

export const session = (() => {
  /**
   * @type {ReturnType<typeof storage>|null}
   */
  let ses = null;

  /**
   * @returns {string|null}
   */
  const getToken = () => ses.get("token");

  /**
   * @param {string} token
   * @returns {void}
   */
  const setToken = (token) => ses.set("token", token);

  /**
   * @param {string} token
   * @returns {Promise<object>}
   */
  const guest = (token) => {
    const config = storage("config");

    for (const [k, v] of Object.entries({
      tz: "America/Lima",
      can_edit: true,
      can_delete: true,
      can_reply: true,
      is_confetti_animation: true,
    })) {
      config.set(k, v);
    }

    setToken(token);
  };

  /**
   * @returns {object|null}
   */
  const decode = () => {
    return null;
  };

  /**
   * @returns {void}
   */
  const init = () => {
    ses = storage("session");
  };

  return {
    init,
    guest,
    decode,
    setToken,
    getToken,
  };
})();
