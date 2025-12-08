import { card } from "./card.js";
import { util } from "../../common/util.js";
import { lang } from "../../common/language.js";
import { storage } from "../../common/storage.js";
import {
  request,
  HTTP_POST,
  HTTP_STATUS_CREATED,
} from "../../connection/request.js";

export const comment = (() => {
  /**
   * @type {ReturnType<typeof storage>|null}
   */
  let owns = null;

  /**
   * @type {ReturnType<typeof storage>|null}
   */
  let showHide = null;

  /**
   * @type {HTMLElement|null}
   */
  const comments = null;

  /**
   * @type {string[]}
   */
  const lastRender = [];

  /**
   * @returns {string}
   */
  const onNullComment = () => {
    const desc = lang
      .on("id", "📢 Yuk, share undangan ini biar makin rame komentarnya! 🎉")
      .on("en", "📢 Let's share this invitation to get more comments! 🎉")
      .get();

    return `<div class="text-center p-4 mx-0 mt-0 mb-3 bg-theme-auto rounded-4 shadow"><p class="fw-bold p-0 m-0" style="font-size: 0.95rem;">${desc}</p></div>`;
  };

  /**
   * @param {string} id
   * @param {boolean} disabled
   * @returns {void}
   */
  const changeActionButton = (id, disabled) => {
    document
      .querySelector(`[data-button-action="${id}"]`)
      .childNodes.forEach((e) => {
        e.disabled = disabled;
      });
  };

  /**
   * @param {string} id
   * @returns {void}
   */
  const removeInnerForm = (id) => {
    changeActionButton(id, false);
    document.getElementById(`inner-${id}`).remove();
  };

  /**
   * @param {HTMLButtonElement} button
   * @returns {Promise<void>}
   */
  const send = async (button) => {
    const id = button.getAttribute("data-uuid");

    const name = document.getElementById("form-name");
    const comment = document.getElementById("form-comment");
    const nameValue = name.value;
    const commentValue = comment.value;
    if (nameValue.length === 0) {
      util.notify("El nombre no puede estar vacío.").warning();
      if (id) {
        // scroll to form.
        name.scrollIntoView({ block: "center" });
      }
      return;
    }

    const presence = document.getElementById("form-presence");
    if (presence && presence.value === "0") {
      util.notify("Please select your attendance status.").warning();
      return;
    }

    const form = document.getElementById(
      `form-${id ? `inner-${id}` : "comment"}`
    );

    if (!id && name) {
      name.disabled = true;
    }

    if (form) {
      form.disabled = true;
    }

    const cancel = document.querySelector(
      `[onclick="undangan.comment.cancel(this, '${id}')"]`
    );
    if (cancel) {
      cancel.disabled = true;
    }

    const btn = util.disableButton(button);
    const isPresence = presence ? presence.value === "1" : true;

    const response = await request(HTTP_POST, `/dev/api/v1/comments`)
      .body({
        name: nameValue,
        comment: commentValue,
        presence: isPresence,
      })
      .send();

    if (name) {
      name.disabled = false;
    }

    if (form) {
      form.disabled = false;
    }

    if (cancel) {
      cancel.disabled = false;
    }

    if (presence) {
      presence.disabled = false;
    }

    btn.restore();

    if (!response || response.code !== HTTP_STATUS_CREATED) {
      form.value = null;
      name.value = null;
      comment.value = null;
      presence.value = "0";
      return;
    }

    if (form) {
      form.value = null;
      name.value = null;
      comment.value = null;
    }

    util.notify('Asistencia confirmada con éxito').success();
  };

  /**
   * @param {HTMLButtonElement} button
   * @param {string} id
   * @returns {Promise<void>}
   */
  const cancel = async (button, id) => {
    const presence = document.getElementById(`form-inner-presence-${id}`);
    const isPresent = presence ? presence.value === "1" : false;

    const badge = document.getElementById(`badge-${id}`);
    const isChecklist =
      badge && owns.has(id) && presence
        ? badge.getAttribute("data-is-presence") === "true"
        : false;

    const btn = util.disableButton(button);

    if (
      gif.isOpen(id) &&
      ((!gif.getResultId(id) && isChecklist === isPresent) ||
        util.ask("Are you sure?"))
    ) {
      await gif.remove(id);
      removeInnerForm(id);
      return;
    }

    const form = document.getElementById(`form-inner-${id}`);
    if (
      form.value.length === 0 ||
      (util.base64Encode(form.value) === form.getAttribute("data-original") &&
        isChecklist === isPresent) ||
      util.ask("Are you sure?")
    ) {
      removeInnerForm(id);
      return;
    }

    btn.restore();
  };

  /**
   * @param {HTMLButtonElement} button
   * @returns {Promise<void>}
   */
  const edit = async (button) => {
    const id = button.getAttribute("data-uuid");

    changeActionButton(id, true);

    const formInner = document.getElementById(`form-inner-${id}`);
    const original = util.base64Decode(
      document.getElementById(`content-${id}`)?.getAttribute("data-comment")
    );

    formInner.value = original;
    formInner.setAttribute("data-original", util.base64Encode(original));
  };

  /**
   * @returns {void}
   */
  const init = () => {
    card.init();

    owns = storage("owns");
    showHide = storage("comment");

    if (!showHide.has("hidden")) {
      showHide.set("hidden", []);
    }

    if (!showHide.has("show")) {
      showHide.set("show", []);
    }
  };

  return {
    init,
    send,
    edit,
    cancel,
  };
})();
