/**
 *  utils.js
 *  Create By rehellinen
 *  Create On 2019/3/3 10:42
 */
export const deepCopyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
