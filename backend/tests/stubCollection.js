import StubCollections from 'meteor/hwillson:stub-collections'

export const stubCollection = (collections) => {
  StubCollections.stub(Array.isArray(collections)
    ? collections
    : [collections])
}

export const restoreCollections = () => {
  StubCollections.restore()
}
