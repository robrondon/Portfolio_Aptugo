interface classType {
  [key: string]: string
}

export const mergeClasses: any = (classA: { className: classType }, classB: { className: classType }) => {
  let target = {}
  const merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        target[prop] = !target[prop] ? obj[prop] : `${target[prop]} ${obj[prop]}`
      }
    }
  }

  merger(classA)
  merger(classB)

  return target
}
