import { card } from "./card.js";
import { like } from "./like.js";
import { util } from "../../common/util.js";
import { pagination } from "./pagination.js";
import { dto } from "../../connection/dto.js";
import { lang } from "../../common/language.js";
import { storage } from "../../common/storage.js";
import { session } from "../../common/session.js";
import {
  request,
  HTTP_POST,
  HTTP_DELETE,
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
  let comments = null;

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
   * @returns {ReturnType<typeof dto.getCommentsResponse>}
   */
  const show = () => {
    // remove all event listener.
    lastRender.forEach((u) => {
      like.removeListener(u);
    });

    console.log(`/api/v2/comment?per=${pagination.getPer()}&next=${pagination.getNext()}&lang=${lang.getLanguage()}`);

    const data = {
      data: {
        count: 8967,
        lists: [
          {
            uuid: "b92140d5-c030-4f02-a4e0-44899ad7d073",
            name: "Trz",
            presence: true,
            comment: "Tez",
            created_at: "4 hari yang lalu.",
            like_count: 0,
            comments: [],
          },
          {
            uuid: "3caad11f-5961-47ac-bbae-1f02afece1c1",
            name: "Ws",
            presence: true,
            comment: "Good",
            is_admin: false,
            gif_url: null,
            created_at: "5 hari yang lalu.",
            is_parent: true,
            like_count: 3,
            comments: [],
          },
          {
            uuid: "0f4619fa-8005-4ef2-9fa0-d3e173fcadd0",
            name: "test",
            presence: true,
            comment: "good",
            is_admin: false,
            gif_url: null,
            created_at: "5 hari yang lalu.",
            is_parent: true,
            like_count: 2,
            comments: [],
          },
          {
            uuid: "ea1d7881-bbd3-43fa-a325-5b39332ef86d",
            name: "jajan",
            presence: true,
            comment: "pih",
            is_admin: false,
            gif_url: null,
            created_at: "5 hari yang lalu.",
            is_parent: true,
            like_count: 2,
            comments: [],
          },
          {
            uuid: "ea1d7881-bbd3-43fa-a325-5b39332ef86d",
            name: "jajan",
            presence: true,
            comment: "pih",
            is_admin: false,
            gif_url: null,
            created_at: "5 hari yang lalu.",
            is_parent: true,
            like_count: 2,
            comments: [],
          },
          {
            uuid: "ea1d7881-bbd3-43fa-a325-5b39332ef86d",
            name: "jajan",
            presence: true,
            comment: "pih",
            is_admin: false,
            gif_url: null,
            created_at: "5 hari yang lalu.",
            is_parent: true,
            like_count: 2,
            comments: [],
          },
          {
            uuid: "ea1d7881-bbd3-43fa-a325-5b39332ef86d",
            name: "jajan",
            presence: true,
            comment: "pih",
            is_admin: false,
            gif_url: null,
            created_at: "5 hari yang lalu.",
            is_parent: true,
            like_count: 2,
            comments: [],
          },
          {
            uuid: "e681e46b-9957-4865-b48c-c5c6a57fc79f",
            name: "Abi",
            presence: true,
            comment: "Me gusta la pucxis, noche de puchaina",
            is_admin: false,
            gif_url: null,
            created_at: "5 hari yang lalu.",
            is_parent: true,
            like_count: 1,
            comments: [
              {
                uuid: "a0c08358-f534-4d59-8f55-add86625f90f",
                name: "Abi",
                presence: true,
                comment: "A mi tambien me gusta el penesito ",
                is_admin: false,
                gif_url: null,
                created_at: "5 hari yang lalu.",
                is_parent: false,
                like_count: 0,
                comments: [
                  {
                    uuid: "2e27a75c-2bfc-427b-bea9-4370dcbdaef2",
                    name: "Abi",
                    presence: true,
                    comment: "iwal",
                    is_admin: false,
                    gif_url: null,
                    created_at: "5 hari yang lalu.",
                    is_parent: false,
                    like_count: 0,
                    comments: [],
                  },
                ],
              },
            ],
          },
          {
            uuid: "0ae5c44c-7609-48fa-a92e-b58a52cc926f",
            name: "oiuyt",
            presence: false,
            comment: "oiuytr",
            is_admin: false,
            gif_url: null,
            created_at: "6 hari yang lalu.",
            is_parent: true,
            like_count: 1,
            comments: [],
          },
          {
            uuid: "b38c205b-60f5-4f89-ad65-89f733cec53c",
            name: "Josue",
            presence: true,
            comment: "Hola, gracias por invitarme",
            is_admin: false,
            gif_url: null,
            created_at: "6 hari yang lalu.",
            is_parent: true,
            like_count: 0,
            comments: [],
          },
          {
            uuid: "083986f8-b706-4f02-bb22-9dc91c4e8dd7",
            name: "Teman teman semua",
            presence: true,
            comment: "Tes",
            is_admin: false,
            gif_url: null,
            created_at: "6 hari yang lalu.",
            is_parent: true,
            like_count: 1,
            comments: [
              {
                uuid: "9dad3e12-1eaa-4628-aa76-2457a1147bd7",
                name: "Teman teman semua",
                presence: true,
                comment: "Hola",
                is_admin: false,
                gif_url: null,
                created_at: "6 hari yang lalu.",
                is_parent: false,
                like_count: 1,
                comments: [],
              },
              {
                uuid: "0e561664-44d5-4af1-b948-dc4c799bd821",
                name: "Josue",
                presence: true,
                comment: "Callate no te quiero ver en la boda",
                is_admin: false,
                gif_url: null,
                created_at: "6 hari yang lalu.",
                is_parent: false,
                like_count: 0,
                comments: [
                  {
                    uuid: "63aa6caa-909c-46f0-8cb0-78d9b90833b3",
                    name: "Josue",
                    presence: true,
                    comment: "no",
                    is_admin: false,
                    gif_url: null,
                    created_at: "6 hari yang lalu.",
                    is_parent: false,
                    like_count: 0,
                    comments: [],
                  },
                ],
              },
            ],
          },
          {
            uuid: "139140a9-d02e-429d-9b7b-39844a4dc787",
            name: "Ali Mulyanto",
            presence: true,
            comment: "ytt",
            is_admin: false,
            gif_url: null,
            created_at: "6 hari yang lalu.",
            is_parent: true,
            like_count: 1,
            comments: [],
          },
          {
            uuid: "76e6d06a-12cc-4f32-a7f5-46f1dc3b7190",
            name: "said",
            presence: true,
            comment: "poiuytrew",
            is_admin: false,
            gif_url: null,
            created_at: "6 hari yang lalu.",
            is_parent: true,
            like_count: 0,
            comments: [],
          },
        ],
      },
      error: null,
    };

    const render = async (res) => {
      pagination.setTotal(res.data.count);
      comments.setAttribute("data-loading", "false");

      const flatten = (ii) =>
          ii.flatMap((i) => [i.uuid, ...flatten(i.comments)]);
      lastRender.splice(0, lastRender.length, ...flatten(res.data.lists));

      let data = await card.renderContentMany(res.data.lists);
      if (res.data.lists.length < pagination.getPer()) {
          data += onNullComment();
      }

      util.safeInnerHTML(comments, data);

      lastRender.forEach((u) => {
        like.addListener(u);
      });

      comments.dispatchEvent(new Event('undangan.comment.result'));

      

      comments.dispatchEvent(new Event('undangan.comment.done'));
      return res;
    };

    return render(data);
  };

  /**
   * @param {HTMLButtonElement} button
   * @returns {Promise<void>}
   */
  const remove = async (button) => {
    if (!util.ask("Are you sure?")) {
      return;
    }

    const id = button.getAttribute("data-uuid");

    changeActionButton(id, true);
    const btn = util.disableButton(button);
    const likes = like.getButtonLike(id);
    likes.disabled = true;

    const status = await request(HTTP_DELETE, "/api/comment/" + owns.get(id))
      .token(session.getToken())
      .send(dto.statusResponse)
      .then((res) => res.data.status);

    if (!status) {
      btn.restore();
      likes.disabled = false;
      changeActionButton(id, false);
      return;
    }

    owns.unset(id);
    document.getElementById(id).remove();

    if (comments.children.length === 0) {
      comments.innerHTML = onNullComment();
    }
  };

  /**
   * @param {HTMLButtonElement} button
   * @returns {Promise<void>}
   */
  const send = async (button) => {
    const id = button.getAttribute("data-uuid");

    const name = document.getElementById("form-name");
    const nameValue = name.value;

    if (nameValue.length === 0) {
      util.notify("Name cannot be empty.").warning();

      if (id) {
        // scroll to form.
        name.scrollIntoView({ block: "center" });
      }
      return;
    }

    const presence = document.getElementById("form-presence");
    if (!id && presence && presence.value === "0") {
      util.notify("Please select your attendance status.").warning();
      return;
    }

    const gifIsOpen = gif.isOpen(id ? id : gif.default);
    const gifId = gif.getResultId(id ? id : gif.default);
    const gifCancel = gif.buttonCancel(id);

    if (gifIsOpen && !gifId) {
      util.notify("Gif cannot be empty.").warning();
      return;
    }

    if (gifIsOpen && gifId) {
      gifCancel.hide();
    }

    const form = document.getElementById(
      `form-${id ? `inner-${id}` : "comment"}`
    );
    if (!gifIsOpen && form.value?.trim().length === 0) {
      util.notify("Comments cannot be empty.").warning();
      return;
    }

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

    const response = await request(
      HTTP_POST,
      `/api/comment?lang=${lang.getLanguage()}`
    )
      .token(session.getToken())
      .body(
        dto.postCommentRequest(
          id,
          nameValue,
          isPresence,
          gifIsOpen ? null : form.value,
          gifId
        )
      )
      .send(dto.getCommentResponse);

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

    if (gifIsOpen && gifId) {
      gifCancel.show();
    }

    btn.restore();

    if (!response || response.code !== HTTP_STATUS_CREATED) {
      return;
    }

    owns.set(response.data.uuid, response.data.own);

    if (form) {
      form.value = null;
    }

    if (gifIsOpen && gifId) {
      gifCancel.click();
    }

    if (!id) {
      if (pagination.reset()) {
        await show();
        comments.scrollIntoView();
        return;
      }

      pagination.setTotal(pagination.geTotal() + 1);
      if (comments.children.length === pagination.getPer()) {
        comments.lastElementChild.remove();
      }

      response.data.is_parent = true;
      comments.insertAdjacentHTML(
        "afterbegin",
        await card.renderContentMany([response.data])
      );
      comments.scrollIntoView();
    }

    like.addListener(response.data.uuid);
    lastRender.push(response.data.uuid);
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
    like.init();
    card.init();
    pagination.init();

    comments = document.getElementById("comments");
    comments.addEventListener("undangan.comment.show", show);

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
    like,
    pagination,
    init,
    send,
    edit,
    remove,
    cancel,
    show,
  };
})();
