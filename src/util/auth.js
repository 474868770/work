import Cookies from 'js-cookie'

//const TokenKey = 'access_token'

export function getToken(TokenKey='access_token') {
  // console.log("Cookies.get",Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token,TokenKey='access_token') {
  // console.log("Cookies.set",token)
  return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey='access_token') {
  return Cookies.remove(TokenKey)
}