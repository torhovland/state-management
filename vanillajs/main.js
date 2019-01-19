function addTodo()
{
    const todos = document.getElementById('todos');
    const newTodo = document.getElementById('newTodo');
    const text = newTodo.value;
    const textNode = document.createTextNode(text);
    var todoNode = document.createElement("li");
    todoNode.appendChild(textNode);   
    todos.appendChild(todoNode);
    newTodo.value = "";
}