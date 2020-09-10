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

    deleteItem(elemKey) {
       
       this.todoData.delete(elemKey)
       this.render();
       
    }

    completedItem(elemKey)  {
        const item = this.todoData.get(elemKey);
        item.completed ? item.completed = false : item.completed = true;
       
        this.render()
        
    }

    handler() {
      
        document.addEventListener('click', (e) => {

            let target = e.target;
            
            if(target.classList.contains('todo-complete')){

                let closest = target.closest('.todo-item');
                this.completedItem(closest.key);
                
            } 
            
            if(target.classList.contains('todo-remove')){

                let closest = target.closest('.todo-item')
                this.deleteItem(closest.key);
                
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

