import API from "../helpers/API"

export const newTx = (body) => {
    return API.post('/v1/tx/create-order', body);
};

export const updateTx = (txId, status, txHash, txData, error) => {
    return API.post('/v1/tx/update-order', { txId, status, txHash, txData, error})
}

export const getTxServ = (country) => {
    return API.get(`/v1/tx/services?country=${country}`, {});
}

export const getMainTxServ = () => {
    return API.get(`/v1/tx/main/cat`, {});
}