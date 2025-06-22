// Clears the editor for a new file.
// Reloading may not work properly in CodePen, so better to clear textarea instead in that case.
function newFile() {
   location.reload(); // Reloads the current page to reset content
}

// Handles opening a .txt file and reading its content into the textarea.
function openFile(event) {
  const file = event.target.files[0]; // Get selected file
  if (!file) return;

  const reader = new FileReader(); // Create file reader
  reader.onload = function(e) {
    document.querySelector('.notepad-textarea').value = e.target.result; // Set content to textarea
  };
  reader.readAsText(file); // Read file as text
}

// Programmatically triggers the hidden file input for opening a file.
function triggerOpen() {
  document.getElementById('fileInput').click(); // Simulates file input click
}

// Saves the content of the notepad as a .txt file using Blob and download link.
function saveAsTextFile() {
   const text = document.getElementById('notepad').value; // Get text from textarea
   const blob = new Blob([text], { type: 'text/plain' }); // Create a text blob
   const url = URL.createObjectURL(blob); // Generate a temporary URL
   const a = document.createElement('a'); // Create a hidden link
   a.href = url;
   a.download = 'notepad.txt'; // Set default file name
   a.click(); // Trigger download
   URL.revokeObjectURL(url); // Release memory
}

// Deletes the selected text in the textarea.
function deleteText() {
  const textarea = document.querySelector('.notepad-textarea');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  if (start !== end) {
    textarea.setRangeText('', start, end, 'start'); // Remove selected text
  }
}

// Selects all text in the textarea.
function selectAllText() {
  const textarea = document.querySelector('.notepad-textarea');
  textarea.select(); // Select all text
}

// Inserts the current time and date at the cursor position in the textarea.
function insertTimeDate() {
  const textarea = document.querySelector('.notepad-textarea');
  const now = new Date().toLocaleString(); // Get current time/date
  const start = textarea.selectionStart;
  textarea.setRangeText(now, start, start, 'end'); // Insert timestamp
}

// Toggles word wrap on/off by changing the white-space CSS property.
function toggleWordWrap() {
  const textarea = document.querySelector('.notepad-textarea');
  if (textarea.style.whiteSpace === 'pre') {
    textarea.style.whiteSpace = 'pre-wrap'; // Enable word wrap
  } else {
    textarea.style.whiteSpace = 'pre'; // Disable word wrap
  }
}

// Prompts the user to enter a font name and applies it to the textarea.
function changeFont() {
  const font = prompt("Enter font family (e.g., Arial, Courier New, Times New Roman):", "Arial");
  if (font) {
    document.querySelector('.notepad-textarea').style.fontFamily = font;
  }
}

// Opens a new browser tab with the help page (URL to be replaced with your own).
function viewHelp() {
  window.open('https://example.com/help', '_blank'); // Opens help in new tab
}

// Displays the About modal using Bootstrap's modal system.
function showAbout() {
  $('#aboutModal').modal('show'); // Bootstrap jQuery call to show modal
}