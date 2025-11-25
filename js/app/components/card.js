import { util } from '../../common/util.js';
import { storage } from '../../common/storage.js';

export const card = (() => {

    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let owns = null;

    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let likes = null;

    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let config = null;

    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let showHide = null;

    const maxCommentLength = 300;

    /**
     * @returns {string}
     */
    const renderLoading = () => {
        return `
        <div class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4">
            <div class="d-flex justify-content-between align-items-center placeholder-wave">
                <span class="placeholder bg-secondary col-5 rounded-3 my-1"></span>
                <span class="placeholder bg-secondary col-3 rounded-3 my-1"></span>
            </div>
            <hr class="my-1">
            <p class="placeholder-wave m-0">
                <span class="placeholder bg-secondary col-6 rounded-3"></span>
                <span class="placeholder bg-secondary col-5 rounded-3"></span>
                <span class="placeholder bg-secondary col-12 rounded-3 my-1"></span>
            </p>
        </div>`;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>} c
     * @returns {string}
     */
    const renderLike = (c) => {
        return `
        <button style="font-size: 0.8rem;" onclick="undangan.comment.like.love(this)" data-uuid="${c.uuid}" class="btn btn-sm btn-outline-auto ms-auto rounded-3 p-0 shadow-sm d-flex justify-content-start align-items-center" data-offline-disabled="false">
            <span class="my-0 mx-1" data-count-like="${c.like_count}">${c.like_count}</span>
            <i class="me-1 ${likes.has(c.uuid) ? 'fa-solid fa-heart text-danger' : 'fa-regular fa-heart'}"></i>
        </button>`;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>} c
     * @returns {string}
     */
    const renderAction = (c) => {
        let action = `<div class="d-flex justify-content-start align-items-center" data-button-action="${c.uuid}">`;

        if (owns.has(c.uuid) && config.get('can_delete') !== false) {
            action += `<button style="font-size: 0.8rem;" onclick="undangan.comment.remove(this)" data-uuid="${c.uuid}" class="btn btn-sm btn-outline-auto rounded-4 py-0 me-1 shadow-sm" data-offline-disabled="false">Eliminar</button>`;
        }

        action += '</div>';

        return action;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>} c
     * @returns {string}
     */
    const renderButton = (c) => {
        return `
        <div class="d-flex justify-content-between align-items-center" id="button-${c.uuid}">
            ${renderAction(c)}
            ${renderLike(c)}
        </div>`;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>} c
     * @returns {string}
     */
    const renderHeader = (c) => {
        return `class="bg-theme-auto shadow p-3 mx-0 mt-0 mb-3 rounded-4"`;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>} c
     * @returns {string}
     */
    const renderTitle = (c) => {
        return `<strong class="me-1">${util.escapeHtml(c.name)}</strong><i id="badge-${c.uuid}" data-is-presence="${c.presence ? 'true' : 'false'}" class="fa-solid ${c.presence ? 'fa-circle-check text-success' : 'fa-circle-xmark text-danger'}"></i>`;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>} c
     * @returns {string}
     */
    const renderBody = (c) => {
        const head = `
        <div class="d-flex justify-content-between align-items-center">
            <p class="text-theme-auto text-truncate m-0 p-0" style="font-size: 0.95rem;">${renderTitle(c)}</p>
            <small class="text-theme-auto m-0 p-0" style="font-size: 0.75rem;">${c.created_at}</small>
        </div>
        <hr class="my-1">`;

        const data = util.convertMarkdownToHTML(util.escapeHtml(c.comment));

        return head + `
        <p class="text-theme-auto my-1 mx-0 p-0" style="white-space: pre-wrap !important; font-size: 0.95rem;" id="content-${c.uuid}">${data}</p>`;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>} c
     * @returns {string}
     */
    const renderContent = (c) => {
        const body = renderBody(c);

        return `
        <div ${renderHeader(c)} id="${c.uuid}" style="overflow-wrap: break-word !important;">
            <div id="body-content-${c.uuid}" data-tapTime="0" data-liked="false" tabindex="0">${body}</div>
            ${renderButton(c)}
        </div>`;
    };

    /**
     * @param {ReturnType<typeof dto.getCommentResponse>[]}
     * @returns {string}
     */
    const renderContentMany = (cs) => {
        return cs.map((i) => renderContent(i)).join('');
    };

    /**
     * @returns {void}
     */
    const init = () => {
        owns = storage('owns');
        likes = storage('likes');
        config = storage('config');
        showHide = storage('comment');
    };

    return {
        init,
        renderLoading,
        renderContentMany,
        maxCommentLength,
    };
})();