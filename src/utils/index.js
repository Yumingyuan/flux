const Utils = {};

function json_send(res, data, message, status, status_code, is_error, meta, show) {
    data = data || null;
    message = message || '';
    status = status || 'success';

    const d = {
        status,
        message,
        data
    };

    res.statusCode = status_code;
    if (process.env.ENVIRONMENT !== 'test') {
        // logger(res, {
        // meta,
        // message,
        // data
        // });
    }
    if(show){
        return res.status(status_code).json(d);
    }
    return res.status(status_code).json(d.data);
}

Utils.jsonS = function(express_res, data, message, status_code = 200, meta={}) {
    return json_send(express_res, data, message, 'success', status_code, meta, false);
};

Utils.json401 = function(express_res, data, message, error = {}, meta={}) {
    meta.show =false;
    return json_send(express_res, data, message, 'error', 401, true, error);
};

Utils.jsonFailed = function(express_res, data, message, status_code = 400, meta = {}) {
    return json_send(express_res, data, message, 'error', status_code, true, meta, false);
};

Utils.jsonSForm = function(express_res, data, message, status_code = 200, meta={}) {
    return json_send(express_res, data, message, 'success', status_code, meta, true);
};

Utils.jsonFailedForm = function(express_res, data, message, status_code = 400, meta = {}) {
    return json_send(express_res, data, message, 'error', status_code, true, meta, true);
};

Utils.internalRes = function(success, data, message, status_code = 400, meta = null) {
    return { success, data, message, status_code, meta };
};

module.exports = Utils;