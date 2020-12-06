// A wrapper around fetch()
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export async function apiClient(
  endpoint,
  { body, token, ...customConfig } = {}
) {
  const headers = {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: "Bearer " + token,
    }),
  };

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

apiClient.get = function (endpoint, token, customConfig = {}) {
  return apiClient(endpoint, { ...customConfig, token, method: "GET" });
};

apiClient.post = function (endpoint, token, body, customConfig = {}) {
  return apiClient(endpoint, { ...customConfig, token, body });
};
