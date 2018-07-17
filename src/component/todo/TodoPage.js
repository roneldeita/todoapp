import React from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import {Form,Col, Row, notification, Card, Button} from 'antd'

const openNotification = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
  })
}

class Todo extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      buttonState:false,
      todos:[
        {title:'Feed the dog', edit:false, checked:false, completed: true},
        {title:'Walk the dog', edit: false, checked:false, completed: false},
        {title:'Bath the dog', edit: false, checked:false, completed: false},
        {title:'Play with the dog', edit: false, checked:false, completed: false}
      ]
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.mutipleRemove = this.mutipleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  handleCheck(selectedTodo){
    const todos = this.state.todos.map(todo => {
      if(todo === selectedTodo){
        todo.checked=!todo.checked
      }
      return todo
    })
    this.setState({todos})
  }
  handleBlur(selectedTodo){
    const todos = this.state.todos.map(todo => {
      if(todo === selectedTodo){
        todo.edit=false
      }
      return todo
    })
    this.setState({todos})
  }
  handleChange(event, selectedTodo){
    const todos = this.state.todos.map(todo => {
      if(todo === selectedTodo){
        todo.title=event.target.value
      }
      return todo
    })
    this.setState({todos})
  }
  handleEdit(selectedTodo){
    const todos = this.state.todos.map(todo => {
      if(todo === selectedTodo){
        todo.edit=true
      }
      return todo
    })
    this.setState({todos})
  }
  handleComplete(){
    const todos = this.state.todos.map(todo => {
      if(todo.checked){
        todo.completed=true
      }
      todo.checked=false
      return todo
    })
    this.setState({todos})
    openNotification('success', 'Success', 'Selected Todo has been marked as completed.');
  }
  handleRemove(selectedTodo){
    const todos = this.state.todos.filter(todo => todo !== selectedTodo)
    this.setState({todos})
    openNotification('info', 'Success', 'A Todo has been removed.');
  }
  mutipleRemove(){
    const todos = this.state.todos.filter(todo => !todo.checked)
    this.setState({todos})
    openNotification('info', 'Success', 'Selected Todo has been removed.');
  }
  handleAdd(event){
    this.setState({buttonState:true})
    this.props.form.validateFields((err, values) => {
      if(!err){
        let todos = Object.assign([], this.state.todos)
        todos.push({title: values.Title})
        this.setState({todos})
        setTimeout(() => {
          this.setState({buttonState:false})
        }, 500)
        this.props.form.resetFields()
        openNotification('success', 'Success', 'A new Todo has been created.');
      }else{
        setTimeout(() => {
          this.setState({buttonState:false})
        }, 500)
        openNotification('warning', 'Oops', 'Please make sure all required fields are filled out correctly.');
      }
    })
    event.preventDefault()
  }
  render(){
    return(
      <Row type="flex" justify="center" style={{marginTop:'80px'}}>
        <Col span={8}>
          <TodoForm
            buttonState={this.state.buttonState}
            form={this.props.form}
            submit={this.handleAdd}/>
          <br/>
          <Card>
            <Button
              shape="circle"
              size="small"
              icon="info"/> Double click on the title to edit a Todo
          </Card>
          <br/>
          <TodoList
            todos={this.state.todos}
            check={this.handleCheck}
            complete={this.handleComplete}
            remove={this.handleRemove}
            mutipleRemove={this.mutipleRemove}
            edit={this.handleEdit}
            change={this.handleChange}
            blur={this.handleBlur}/>
        </Col>
      </Row>
    )
  }
}

export default Form.create()(Todo)
