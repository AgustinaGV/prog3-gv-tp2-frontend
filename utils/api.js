const baseUrl = 'http://localhost:3000/';
//const baseUrl = 'https://prog3-gv-tp2-backend.now.sh/';

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
    //Funciones CRUD;

    //CREATE;
    createTienda: async formData => {
        const dataResponse = await fetch(baseUrl + 'tiendas', fetchParams ('POST', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },

    //READ;
    getTiendas: async () => {
        const dataResponse = await fetch(baseUrl + 'tiendas', fetchParams('GET'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },

    //UPDATE;
    updateTiendas: async (formData, id) => {
        const dataResponse = await fetch(baseUrl + 'tiendas/'+ id, fetchParams('PUT', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },

    //DELETE;
    deleteTiendas: async (id) => {
        const dataResponse = await fetch(baseUrl + 'tiendas/'+ id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    }
}