/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import { ErrorMessage } from '../../src/components/ErrorMessage'
import { Text } from 'react-native'

describe('ErrorMessage', function () {
  it('displays a given error as message', async () => {
    const error = new Error('this is an error')
    const testRenderer = TestRenderer.create(
      <ErrorMessage error={error} />
    )

    const testInstance = testRenderer.root
    expect(testInstance.findByType(Text).props.children).toBe(error.message)
  })
})
