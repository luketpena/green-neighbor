const writeQueries = obj => {
    return `?${Object.entries(obj)
        .filter(([key, value]) => value && value !== '')
        .map(([key, value])=>`${key}=${value}`)
        .join('&')}`;
}

export default writeQueries;