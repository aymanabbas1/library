const myLibrary = [
        new Book("9d980260-07f6-4217-b46e-21da58aaa8f1", "hobbit", "jr tokien", 245, false),
        new Book("f06f393e-394e-4f86-8a98-5734e2dd9a46", "baby", "jb", 25, false),
        new Book("35f28267-ec19-427c-9a4d-d72a3e278812", "HP", "Ugly women", 45, true)
];

const grid = document.querySelector('.grid-container'); 

function Book(id, title, author, pages, read){
    this.id = id; 
    this.title = title;
    this.author = author; 
    this.pages = pages; 
    this.read = read;  
    this.info = function(){
        return title + 'by ' + author + ', ' + pages + ' pages , ' + 'read: ' + read;  
    }
}; 

Book.prototype.toggle = function(){
    if(this.read === true){
        this.read = false;
    }
    else{
        this.read = true; 
    }
}; 


function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    const id = crypto.randomUUID(); 
    const newBook = new Book(id, title, author, pages, read); 
    myLibrary.push(newBook); 
  }

function displayBooks(){
    myLibrary.forEach((book) => { 
        const title = book.title; 
        const author = book.author; 
        const pages = book.pages; 
        const read = book.read; 
        const id = book.id; 
    
        const card = document.createElement('div'); 
        card.classList.add('card'); 
    
        const cardAuthor = document.createElement('div'); 
        content = document.createTextNode(author);
        cardAuthor.append(content); 
        cardAuthor.classList.add('cardAuthor'); 
    
        const cardPages = document.createElement('div'); 
        content = document.createTextNode(pages);
        cardPages.append(content); 
        cardPages.classList.add('cardPages');
    
        const cardRead = document.createElement('div'); 
        content = document.createTextNode(read);
        cardRead.append(content); 
        cardRead.classList.add('cardRead');
    
        const cardTitle = document.createElement('div'); 
        content = document.createTextNode(title);
        cardTitle.append(content); 
        cardTitle.classList.add('cardTitle');

        const delBtn = document.createElement('button');
        delBtn.textContent = 'delete'; 
        delBtn.classList.add('delBtn'); 
        delBtn.setAttribute('id', id);

        const togBtn = document.createElement('button'); 
        togBtn.textContent = 'toggle'; 
        togBtn.classList.add('togBtn'); 
        togBtn.setAttribute('id', id);



    
        card.append(cardTitle, cardAuthor, cardPages, cardRead, delBtn, togBtn); 

        
        grid.append(card); 
      }); 
}
  
displayBooks(); 

 
const showButton = document.querySelector('nav button'); 
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("button#cancelBtn");
const confirmBtn = document.querySelector("button#confirmBtn");
const delBtn = document.querySelectorAll(".delBtn"); 
const togBtn = document.querySelectorAll(".togBtn"); 

showButton.addEventListener("click", () => {
    dialog.showModal();
  });

  cancelBtn.addEventListener("click", () => {
    dialog.close();
  });


  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
   const title = document.querySelector('input#title').value; 
   const author = document.querySelector('input#author').value; 
   const pages = document.querySelector('input#pages').value; 
   const read = document.querySelector('input#read').value; 
   addBookToLibrary(title, author, pages, read);
   grid.replaceChildren(); 
   displayBooks();
   dialog.close();
  });


  delBtn.forEach(function(btn){
    btn.addEventListener("click", () => {
        console.log("hi"); 
        // e.preventDefault(); 
        const id = btn.id; 
        console.log(id); 
        const index = myLibrary.findIndex(book => book.id === id);
        console.log(index);
        if (index > -1) { // only splice array when item is found
        myLibrary.splice(index, 1); // 2nd parameter means remove one item only
        }
        console.log(myLibrary); 
        
      });
  });
  
  togBtn.forEach(function(btn){
    btn.addEventListener("click", () => {
        console.log("Hi"); 
        const id = btn.id; 
        const bookObj = myLibrary.find((obj) => obj.id === id); 
        if(bookObj !== undefined){
            bookObj.toggle(); 
            grid.replaceChildren(); 
       displayBooks();
        }
    }); 
  }); 


  grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("delBtn")) {
        const id = e.target.id;
        const index = myLibrary.findIndex(book => book.id === id);
        if (index > -1) {
            myLibrary.splice(index, 1);
        }
        grid.replaceChildren();
        displayBooks();
    }

    if (e.target.classList.contains("togBtn")) {
        const id = e.target.id;
        const bookObj = myLibrary.find(book => book.id === id);
        if (bookObj) {
            bookObj.toggle();
            grid.replaceChildren();
            displayBooks();
        }
    }
});
