import sinon from 'sinon'
// /////////////////////////////////////////////////////////////////////////////
//
// Stubbing, the easy way
//
// /////////////////////////////////////////////////////////////////////////////

const stubs = new Map()

export const stub = (target, name, handler) => {
  if (stubs.get(target)) {
    throw new Error(`already stubbed: ${name}`)
  }
  const stubbedTarget = sinon.stub(target, name)
  if (typeof handler === 'function') {
    stubbedTarget.callsFake(handler)
  }
  else {
    stubbedTarget.value(handler)
  }
  stubs.set(stubbedTarget, name)
}

export const restore = (target, name) => {
  if (!target[name] || !target[name].restore) {
    throw new Error(`not stubbed: ${name}`)
  }
  target[name].restore()
  stubs.delete(target)
}

export const overrideStub = (target, name, handler) => {
  restore(target, name)
  stub(target, name, handler)
}

export const restoreAll = () => {
  stubs.forEach((name, target) => {
    target.restore()
    stubs.delete(target)
  })
}
