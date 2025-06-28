// let searchInput = document.getElementById("site-search");

// let authorCheck = document.getElementById("author");

// let subjectCheck = document.getElementById("subject");

// let searchTextLine = document.getElementById("search-text-line");

// let result = document.getElementById("book-content");





// searchInput.addEventListener('click', () => {
//     const searchInput = searchInput.value.trim();

//     if (!searchInput) {
//         alert('Please enter valid input')
//         return;
//     }
//     fetch("https://openlibrary.org/search.json")
//         .then(response => response.json())
//         .then(data => {
//             result.textContent = data.book || 'Book not found';
//         })
//         .catch(() => {
//             result.textContent = 'Something went wrong';
//         })
// } )

let searchInput = document.getElementById("site-search");
let searchButton = document.getElementById("search-btn");
let authorCheck = document.getElementById("author");
let subjectCheck = document.getElementById("subject");
let searchTextLine = document.getElementById("search-text-line");
let result = document.getElementById("book-content");

let bookContainerHeader = document.createElement('h1');
bookContainerHeader.className = "heading";
bookContainerHeader.textContent ="Book Content"

result.appendChild(bookContainerHeader);

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if (!query) {
    alert("Please enter valid input");
      return;
      
  }

  // Determine which field to search by (title, author, or subject)
  let searchField = "title";
  if (authorCheck.checked) searchField = "author";
  if (subjectCheck.checked) searchField = "subject";
  

  fetch(`https://openlibrary.org/search.json?${searchField}=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      if (data.docs && data.docs.length > 0) {
        const firstBook = data.docs[0];
        result.innerHTML = `
          <strong>Title:</strong> ${firstBook.title} <br>
          <strong>Author:</strong> ${firstBook.author_name?.join(", ") || "Unknown"} <br>
          <strong>First Published:</strong> ${firstBook.first_publish_year || "N/A"}
        `;
      } else {
        result.textContent = "Book not found.";
      }
    })
    .catch(error => {
      result.textContent = "Something went wrong.";
      console.error(error);
    });
});
