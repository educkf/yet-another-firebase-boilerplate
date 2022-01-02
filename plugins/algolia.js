import algoliasearch  from 'algoliasearch';

const client = algoliasearch('', '');

const contentsIndex = client.initIndex('contents');

const contents = async (terms) => {
    const { hits } = await contentsIndex.search(terms, {
        hitsPerPage: 10,
        filters: 'status:enabled'
    });
    if (hits) return hits;
    else return [];
}

export default (_, inject) => {
    inject('contents', async terms => {
        return await contents(terms);
    });
};
