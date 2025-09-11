// References
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#chapterList');

// Retrieve stored chapters (or empty array if none)
let chapters = JSON.parse(localStorage.getItem('bomChapters')) || [];

// Function to display a chapter
function displayChapter(chapter) {
  const li = document.createElement('li');
  li.textContent = chapter;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('aria-label', `Remove ${chapter}`);

  // Delete action
  deleteButton.addEventListener('click', () => {
    list.removeChild(li);
    chapters = chapters.filter(item => item !== chapter);
    localStorage.setItem('bomChapters', JSON.stringify(chapters));
  });

  li.append(deleteButton);
  list.append(li);
}

// Load saved chapters when page opens
chapters.forEach(chapter => displayChapter(chapter));

// Add new chapter
button.addEventListener('click', () => {
  const chapter = input.value.trim();

  if (chapter !== '') {
    displayChapter(chapter);
    chapters.push(chapter);
    localStorage.setItem('bomChapters', JSON.stringify(chapters));

    input.value = '';
    input.focus();
  }
});