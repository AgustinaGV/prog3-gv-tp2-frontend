const baseUrl = 'http://localhost:3000/'

const apiHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

const fetchParams = (method, data = '') => {

    const body = data ? {body: JSON.stringify(data)} : {}
    return {
        method:method,
        headers:apiHeaders,
        credencials:'same-origin',
        ...body
    }
}

const api = {

    //GET;
    getTiendas: async () => {
        const dataResponse = await fetch(baseUrl + 'tiendas', fetchParams('GET'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },

    //DELETE;
    deleteTiendas: async (id) => {
        const dataResponse = await fetch(baseUrl + 'tiendas/'+ id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    }

    //PUT;

    //POST;
}