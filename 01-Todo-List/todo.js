function add(){
    let task = document.getElementById('taskInput').value;
    let taskList = document.getElementById('taskList');

    if(task != ""){
        // let taskText = task;

        let span = document.createElement('span');
        span.textContent = task;
        span.classList.add('task-text');

        // Create a new <li> element to hold the task
        let li = document.createElement('li');
        li.appendChild(span);

        // Create a Edit Button to edit the task
        let editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            return editTask(li);
        });

        // append the edit button to li
        li.appendChild(editButton);

        // Create a delete button to remove the task
        let deleteButton = document.createElement('button');
        deleteButton.textContent = "X";
        deleteButton.classList.add('delete-btn'); // Add class for styling
        deleteButton.addEventListener('click', () => li.remove());

        // Append the delete button to the <li>
        li.appendChild(deleteButton);

        // Append the <li> to the task list <ul>
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = '';
    } 
    else{
        alert("Please Enter A Task");
        return false;
    }
}

function editTask(li) {
    // Get the current task text (excluding buttons)
    const currentText = li.firstChild.textContent?.trim() || '';
  
    // Create input field
    const input = document.createElement('input');
    input.type = "text";
    input.value = currentText;
    input.classList.add('edit-list');
  
    // Create Save button
    const saveButton = document.createElement('button');
    saveButton.textContent = "Save";
    saveButton.classList.add('save-btn');
  
    // Save functionality
    saveButton.addEventListener('click', () => {
      
      const updatedText = input.value;
  
      // Clear li and set updated text
      li.textContent = updatedText;
  
      // Recreate Edit button
      const editButton = document.createElement('button');
      editButton.textContent = "Edit";
      editButton.classList.add('edit-btn');
      editButton.addEventListener('click', () => editTask(li));
  
      // Recreate Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = "X";
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', () => li.remove());

      // Append buttons back
      li.appendChild(editButton);
      li.appendChild(deleteButton);
    });

    // create cancel button
    const cancleButton = document.createElement('button');
    cancleButton.textContent = "Cancel";
    cancleButton.classList.add('cancle-btn');

    cancleButton.addEventListener('click', () => {
        return cancle(li, currentText);
    });
  
    // Clear the li and add input + save button
    li.textContent = '';
    li.appendChild(input);
    li.appendChild(cancleButton);
    li.appendChild(saveButton);
  }  

  function cancle(li, originalText){
    // Clear li and restore original task text
    li.textContent = originalText;

    // Recreate Edit button
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => editTask(li));

    // Recreate Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => li.remove());

    // Append buttons back
    li.appendChild(editButton);
    li.appendChild(deleteButton);
  }