import dayjs from "dayjs";

export default {
    apply: function (type, langs, content = {}) {
        const typeData = this.getTypeData(type);
        const schema = this.schema();
        const contribSchema = this.contribSchema();

        return {
            ...schema,
            ...content,

            type,

            metaData: {
                ...schema.metaData,
                ...(content.metaData ? content.metaData : {})
            },

            typeData: {
                ...typeData,
                ...(content.typeData ? content.typeData : {})
            },

            langs: langs.map(item => item.abbr),

            data: {
                ...langs.reduce((all, lang) => ({ ...all, [lang.abbr]: {} }), {}),
                ...(content.data ? content.data : {})
            },

            contributors: content.contributors?.map(contributor => ({
                ...contribSchema,
                ...contributor
            })) ?? [],

            contributorsIds: content.contributors?.map(contributor => contributor._id) ?? [],
        };
    },

    schema: function () {
        return {
            parent: null,
            type: '',
            status: 'enabled', // inactive, deleted

            metaData: {
                createDate: dayjs().unix(),
                updateDate: '',
                deleteDate: ''
            },

            typeData: {},
            langs: [],
            data: {},
            contributors: [],
        };
    },

    getTypeData: function (type) {
        const typeData = {
            issue: {
                year: null,
                month: null,
                volume: null,
                number: null,
                specialIssue: false,
                doi: {
                    prefix: '',
                    issue: ''
                },
                sections: []
            },

            article: {
                startPage: null,
                endPate: null,
                doi: '',
                sectionType: '',
                file: null,
                references: []
            },

            page: {
                url: '/',
                order: 0
            }
        };

        return typeData[type];
    },

    contribSchema: function () {
        return {
            id: '',
            name: '',
            lastName: '',
            url: '',
            email: '',
            filiation: '',
            designation: '',
            description: {},
            role: 'editor'
        }
    }
}
