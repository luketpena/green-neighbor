const parseQueries = str => {
    const queries = (str[0] === '?' ? str.substring(1) : str).split('&');
    return queries.reduce((acc, query) => {
        query = query.split('=');
        acc[query[0]] = (query[1] || true);
        return acc;
    }, {});
}

export default parseQueries;