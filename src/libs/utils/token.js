const accessKey = '__access_token__'
const refreshKey = '__refresh_token__'

export const getAccessToken = () => localStorage.getItem(accessKey)
export const getRefreshToken = () => localStorage.getItem(refreshKey)

export const saveAccessToken = (access) => {
  localStorage.setItem(accessKey, access)
}

export const saveRefreshToken = (refresh) => {
  localStorage.setItem(refreshKey, refresh)
}

export const saveTokens = (access, refresh) => {
  localStorage.setItem(accessKey, access)
  localStorage.setItem(refreshKey, refresh)
}

export const removeToken = () => {
  localStorage.removeItem(accessKey)
  localStorage.removeItem(refreshKey)
}
