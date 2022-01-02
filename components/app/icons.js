const IconHome = {
    name: "IconHome",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" xmlns="http://www.w3.org/2000/svg" :class="attr.className" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
    `
};

const IconNewspaper = {
    name: "IconNewspaper",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" xmlns="http://www.w3.org/2000/svg" :class="attr.className" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd" />
            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
        </svg>
    `
};

const IconEdit = {
    name: "IconEdit",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" xmlns="http://www.w3.org/2000/svg" :class="attr.className" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
        </svg>
    `
}

const IconDocumentText = {
    name: "IconDocumentText",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" xmlns="http://www.w3.org/2000/svg" :class="attr.className" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
        </svg>
    `
};

const IconUsers = {
    name: "IconUsers",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
    `
};

const IconSearch = {
    name: "IconSearch",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
    `
};

const IconPlus = {
    name: "IconPlus",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
    `
};

const IconUser = {
    name: "IconUser",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
    `
};

const IconRight = {
    name: "IconRight",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
    `
};

const IconSettings = {
    name: "IconSettings",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
    `
};

const IconEmpty = {
    name: "IconEmpty",
    props: ['attr'],

    template: `
        <svg xmlns="http://www.w3.org/2000/svg" :class="attr.className" height="100px" width="100px" fill="currentColor" viewBox="0 0 100 100" version="1.1" x="0px" y="0px">
            <path fill-rule="evenodd" d="M18,58.1956522 L33.07674,42.7501876 C33.6671182,42.1453708 34.4765574,41.8043478 35.3217495,41.8043478 L64.6782505,41.8043478 C65.5234426,41.8043478 66.3328818,42.1453708 66.92326,42.7501876 L82,58.1956522 L82,73.9803922 C82,76.752645 79.752645,79 76.9803922,79 L23.0196078,79 C20.247355,79 18,76.752645 18,73.9803922 L18,58.1956522 Z M22.7058824,56.9347826 L34.9411765,44.326087 L65.0588235,44.326087 L77.2941176,56.9347826 L61.6078431,56.9347826 L61.6078431,59.483376 C61.6078431,62.6021604 59.0795688,65.1304348 55.9607843,65.1304348 L44.0392157,65.1304348 C40.9204312,65.1304348 38.3921569,62.6021604 38.3921569,59.483376 L38.3921569,56.9347826 L22.7058824,56.9347826 Z M20.5,59.5 L36,59.5 C36,63.8630504 39.5369512,67.4000015 43.9000015,67.4000015 L56.0999985,67.4000015 C60.4630488,67.4000015 64,63.8630504 64,59.5 L79.5,59.5 L79.5,73.5 C79.5,75.1568542 78.1568542,76.5 76.5,76.5 L23.5,76.5 C21.8431458,76.5 20.5,75.1568542 20.5,73.5 L20.5,59.5 Z M51.254902,35.5 C51.254902,36.196359 50.6930632,36.7608696 50,36.7608696 C49.3069368,36.7608696 48.745098,36.196359 48.745098,35.5 L48.745098,22.2608696 C48.745098,21.5645105 49.3069368,21 50,21 C50.6930632,21 51.254902,21.5645105 51.254902,22.2608696 L51.254902,35.5 Z M59.3693164,36.6364071 C59.1899385,37.3090383 58.5018293,37.7082075 57.8323817,37.5279766 C57.162934,37.3477456 56.765654,36.6563642 56.945032,35.983733 L60.3553535,23.195715 C60.5347315,22.5230838 61.2228406,22.1239146 61.8922883,22.3041456 C62.5617359,22.4843766 62.9590159,23.175758 62.779638,23.8483891 L59.3693164,36.6364071 Z M43.3286576,35.983733 C43.5080355,36.6563642 43.1107555,37.3477456 42.4413079,37.5279766 C41.7718602,37.7082075 41.0837511,37.3090383 40.9043731,36.6364071 L37.4940516,23.8483891 C37.3146736,23.175758 37.7119536,22.4843766 38.3814013,22.3041456 C39.0508489,22.1239146 39.7389581,22.5230838 39.918336,23.195715 L43.3286576,35.983733 Z" />
        </svg>
    `
}

const IconLanguage = {
    name: "IconLanguage",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd" />
        </svg>
    `
}

const IconTrash = {
    name: "IconTrash",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
    `
}

const IconMap = {
    name: "IconMap",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
        </svg>
    `
}

const IconSelector = {
    name: "IconSelector",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    `
}

const IconList = {
    name: "IconList",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
        </svg>
    `
}

const IconBook = {
    name: "IconBook",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
    `
}

const IconCode = {
    name: "IconCode",
    props: ['attr'],

    template: `
        <svg v-if="attr.type === 'outline'" :class="attr.className" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <svg v-else  xmlns="http://www.w3.org/2000/svg" :class="attr.className" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    `
}

export default {
    IconBook,
    IconDocumentText,
    IconEdit,
    IconEmpty,
    IconHome,
    IconLanguage,
    IconList,
    IconMap,
    IconNewspaper,
    IconPlus,
    IconRight,
    IconSearch,
    IconSelector,
    IconSettings,
    IconTrash,
    IconUser,
    IconUsers,
    IconCode,
}

export const iconsRef = {
    documentText: IconDocumentText,
    empty: IconEmpty,
    home: IconHome,
    language: IconLanguage,
    newspaper: IconNewspaper,
    plus: IconPlus,
    right: IconRight,
    search: IconSearch,
    settings: IconSettings,
    trash: IconTrash,
    user: IconUser,
    users: IconUsers,
    map: IconMap,
    selector: IconSelector,
    list: IconList,
    book: IconBook,
    edit: IconEdit,
    code: IconCode
}
