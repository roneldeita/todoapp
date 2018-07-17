import React from 'react'
import { Form, Input, Button } from 'antd'

export default ({form, submit,buttonState}) => {
  const { getFieldDecorator, isFieldTouched, getFieldError } = form
  const TitleError = getFieldError('Title')
  return(
    <Form onSubmit={submit} layout="inline">
      <Form.Item
        hasFeedback={isFieldTouched('Title')}
        validateStatus={TitleError ? 'error' : 'success'}
        help={TitleError || ''}>
        {getFieldDecorator('Title', {
          rules: [
            { required: true },
          ],
        })(
          <Input size="large" placeholder="Title" style={{minWidth:'250px'}}/>
        )}
      </Form.Item>
      <Form.Item>
        <Button size="large" loading={buttonState} type="primary" htmlType="submit">{buttonState ? 'Adding...' : 'Add'}</Button>
      </Form.Item>
    </Form>
  )
}
