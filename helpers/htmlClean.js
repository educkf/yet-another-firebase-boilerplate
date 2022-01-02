import sanitizeHtml from 'sanitize-html';

export function cleanWordPaste(dirty) {
    return sanitizeHtml(dirty);
}

export function cleanAllHtml(dirty) {
    return sanitizeHtml(dirty, {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: []
    });
}
