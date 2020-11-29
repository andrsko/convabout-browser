// A wrapper around fetch()
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL;

  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(API_URL + endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

apiClient.get = function (endpoint, customConfig = {}) {
  return apiClient(endpoint, { ...customConfig, method: "GET" });
};

apiClient.post = function (endpoint, body, customConfig = {}) {
  return apiClient(endpoint, { ...customConfig, body });
};
