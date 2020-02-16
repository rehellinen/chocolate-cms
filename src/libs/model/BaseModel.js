export class BaseModel {
  // TODO: create_time等等公用字段怎么处理
  setData (data, members) {
    for (let item of members) {
      if (Reflect.has(data, item)) {
        this[item] = data[item]
      }
    }
    this.check()
  }

  check () {
  }
}
