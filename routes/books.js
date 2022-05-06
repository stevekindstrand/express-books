const express = require("express");
const router = express.Router();
const nanoId = require("nanoid");

let books = [
  {
    id: nanoId.nanoid(),
    bookName: "It",
    author: "Stephen King",
    pages: 1138,
    rented: false,
  },
  {
    id: nanoId.nanoid(),
    bookName: "The Shining",
    author: "Stephen King",
    pages: 447,
    rented: false,
  },
  {
    id: nanoId.nanoid(),
    bookName: "The Green Mile",
    author: "Stephen King",
    pages: 544,
    rented: false,
  },
];

router.get("/", function (req, res) {
  let printBooks = `
    <div>
    <h2>Våra böcker</h2>
    `;

  books.forEach((book) => {
    printBooks += `
        <a href="/books/${book.id}"><div>${book.bookName} - ${
      book.rented ? "Utlånad" : "Tillgänglig"
    } </div></a>
        `;
  });

  printBooks += `
    <br>
    <div><a href="/books/newBook">Lägg till en ny bok</a></div>
    </div>
    `;

  res.send(printBooks);
});

router.get("/newBook", function (req, res) {
  let form = `
    <form action="newBook" method="post">
    <h2>Lägg till ny bok</h2>
    <div><br><input type="text" name="bookName" placeholder="Namn" /></div>
    <div><input type="text" name="author" placeholder="Författare" /></div>
    <div><input type="text" name="pages" placeholder="Sidor" /></div>
    <div><button>Spara</button></div>
    `;

  res.send(form);
});

router.get("/:id", function (req, res) {
  let foundBook = books.find((book) => book.id == req.params.id);

  if (!foundBook) {
    return res.send("INGEN BOK HITTADES MED ID " + req.params.id);
  }

  let bookInfo = `
    <div>
    <p><b>Boknamn:</b> ${foundBook.bookName}</p>
    <p><b>Författare:</b> ${foundBook.author}</p>
    <p><b>Sidor:</b> ${foundBook.pages}</p>
    <p><b>Utlåningsstatus:</b> ${
      foundBook.rented ? "Utlånad" : "Tillgänglig"
    }</p>
    <form action="lendBook" method="post">
    <button ${foundBook.rented ^= true}>Låna/Lämna tillbaka</button>
    </div>
    `;
  res.send(bookInfo);
});

router.post("/newBook", function (req, res) {
  let newBook = { ...req.body, id: nanoId.nanoid(), rented: false };
  books.push(newBook);
  res.redirect("/books");
});

router.post("/lendBook", function (req, res) {
  res.redirect("/books");
});

module.exports = router;
