import axios from 'axios';
/**
 * axios request basic func
 * @param  {object} options
 */
async function request(options) {
  const { headers } = options;

  const url = parseUrlPrefix(options);
  return axios({
    ...options,
    url,
    headers: {
      ...headers,
      'current-path': window.location.href,
    },
  })
    .then(res => {
      return res.data;
    })
    .then(data => parseErrorMessage(data, options))
    .catch(err => {
      if (hasProperty(err, 'err_no') && err.err_show !== false) {
        message.error(err.err_msg || '好像出错了~');
        return err;
      }
      if (hasProperty(err, 'errno') && err.err_show !== false) {
        message.error(err.errmsg || '好像出错了~');
        return err;
      }
      if (err.message && err.message.includes('timeout')) {
        message.error('请求超时~');
        return {};
      }
      console.log('服务异常：', err.message);
      message.error('服务异常！');
      return {};
    });
}
/**
 * post method
 * @param  {string} url
 * @param  {object} params
 * @param  {object} options
 */
function post(url, params, options) {
  return request({
    url,
    ...baseOptions,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify(params),
    ...options,
  });
}

/**
 * postJson method
 * @param  {string} url
 * @param  {object} params
 * @param  {object} options
 */
function postJson(url, params, options) {
  return request({
    url,
    ...baseOptions,
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(params),
    ...options,
  });
}

/**
 * get method
 * @param  {string} url
 * @param  {object} params
 * @param  {object} options
 */
function get(url, params, options) {
  return request({
    ...baseOptions,
    url,
    params,
    ...options,
  });
}

export {
  get,
  post,
  postJson
}