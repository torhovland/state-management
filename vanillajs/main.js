function addTodo()
{
    const newTodo = document.getElementById('newTodo');
    const text = newTodo.value;
    const textNode = document.createTextNode(text);

    const checkNode = document.createElement("input");
    checkNode.setAttribute("type", "checkbox");
    checkNode.onclick = completeTodo;

    const todoNode = document.createElement("div");
    todoNode.appendChild(checkNode);   
    todoNode.appendChild(textNode);   
    
    const todos = document.getElementById('todos');
    todos.appendChild(todoNode);

    newTodo.value = "";

    updateStatistics();
}

function completeTodo(e)
{
    const todoNode = e.path[1];
    todoNode.remove();

    updateStatistics();
}

function updateStatistics()
{
    const todos = document.getElementById('todos');
    const children = todos.children;

    const countNode = document.getElementById('numberOfTodos');
    countNode.innerText = children.length;
}

updateStatistics();