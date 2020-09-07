'use strict';

class Todo {
    constructor(form, input, todoList, todoComplited) {

        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoComplited = document.querySelector(todoComplited);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.todoList.textContent = '';
        this.todoComplited.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
		    	<div class="todo-buttons">
		    		<button class="todo-remove"></button>
		    		<button class="todo-complete"></button>
		    	</div>
        `);

        if(todo.completed) {
            this.todoComplited.append(li);
        } else {
            this.todoList.append(li);
        }
        console.log(todo.key);
        console.log(li);
    }

    addTodo(e) {
        e.preventDefault();
        
            if(this.input.value.trim()){

            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo)  
            this.render()
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    } 

    deleteItem(elem) {
        [...this.todoData].forEach((item, index) => {
            if (elem === item[0]) {
                let i = [...this.todoData].filter((item) => item[0] !== elem);
                this.todoData = i.splice(0);
                console.log(elem);
            }
            
        })
        
    }

    completedItem() {
         
    }

    handler() {
      
        document.addEventListener('click', (e) => {

            let target = e.target;
        
            if(target.classList.contains('todo-complete')){
                this.completedItem()
            } 
            
            if(target.classList.contains('todo-remove')){
                this.deleteItem();
            }  
            
        })
       
    }

    init () {
        this.form.addEventListener('submit', this.addTodo.bind(this))
        this.render();
        this.handler();
    }
};

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed')

todo.init();