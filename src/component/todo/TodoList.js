import React from 'react'
import { List, Button, Input, Checkbox } from 'antd'

export default ({todos, remove, mutipleRemove, complete, edit, change, blur, check}) =>{
  return(
    <List
      header={<div>
        <Button style={{marginRight:5}} onClick={complete}>Mark as Completed</Button>
        <Button onClick={mutipleRemove}>Remove Selected</Button>
      </div>}
      bordered
      dataSource={todos}
      renderItem={(item, index) => (
        <List.Item>
          {item.edit ?
            <Input
              defaultValue={item.title}
              test={item}
              onChange={todo => change(todo, index)}
              onBlur={() => blur(index)}
              onKeyPress={event=> event.key === 'Enter' && blur(index)}
              style={{maxWidth:'250px', marginLeft:5}}/> :
            <span
              style={{textDecoration: item.completed && 'line-through'}}
              onDoubleClick={() => edit(index)}>
              <Checkbox checked={item.checked} onChange={() => check(index)}/>
              <span style={{marginLeft:10}}>{item.title}</span>
            </span>}
          <Button
            data-index={index}
            onClick={() => remove(item)}
            type="danger"
            shape="circle"
            icon="minus"
            size="small"
            style={{float:'right'}}/>
        </List.Item>
      )}>
      <style jsx="true">{`
        .ant-list-item-content{
          display:block
        }
      `}
      </style>
    </List>
  )
}
