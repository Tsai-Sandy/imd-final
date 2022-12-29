let bookshelf;
let add_button;
let size = getSize();
let input_title;
let button_title;
let books = [];
let books_back = [];
let books_x = [];
let books_y = [];

function preload() {
  bookshelf = loadImage("images/book_shelf.png");
}

function setup() {
  createCanvas(size[0], size[1]);

  imageMode(CENTER);

  add_button = createImg("images/add.png", "LOADING....");
  add_button.size(size[1]/8, size[1]/8);
  add_button.position(size[0] / 2 - size[1] / 16, size[1] / 3 + size[1] / 16);
  add_button.mousePressed(hideAddButton);
  
  // button.mousePressed(changeBG);
  // image(bg, width/2, height/2);
  // input_title = createInput();
  // input_title.position(20, 65);
  // button_title = createButton('submit');
  // button_title.position(input_title.x + input_title.width, 65);
  // button_title.mousePressed(get_title);
  // createElement('h2', 'Enter book title').position(20, 5);
  // input_isbn = createInput();
  // input_isbn.position(20, 160);
  // button_isbn = createButton('submit');
  // button_isbn.position(input_isbn.x + input_isbn.width, 160);
  // button_isbn.mousePressed(get_data);
  // createElement('h2', 'Enter book isbn').position(20, 120);
  // textAlign(CENTER);
  // textSize(50);
}

function draw() {
  background(254, 223, 225);
  image(bookshelf, size[0] / 2, size[1] * 3 / 4, size[1]/2, size[1]/2);
  for(let i = 0; i < books.length; i++) {
    image(books[0], books_x[0], books_y[0], size[0]/10, size[0]/10); // 需再調整大小，等書籍的圖片確定後再說
  }
}

function hideAddButton() {
  add_button.position(-100, -100);
  input_isbn = createInput();
  input_isbn.position(20, 65);
  button_isbn = createButton('submit');
  button_isbn.position(input_isbn.x + input_isbn.width, 65);
  button_isbn.mousePressed(hideInput);
}

function hideInput() {
  let isbn = input_isbn.value()
  add_button.position(size[0] / 2 - size[1] / 16, size[1] / 3 + size[1] / 16);
  input_isbn.position(-100, -100);
  button_isbn.position(-100, -100);

  if (isbn.length != 13) {
    alert("格式輸入錯誤，請輸入 13 碼 ISBN");
  } else {
    drawBook(isbn);
  }
}

function drawBook(isbn) {
  console.log(`${isbn}.jpg`);
  books.push(loadImage(`./images/books/${isbn}.jpg`, `${isbn}`));
  books_back.push(loadImage(`./images/books/${isbn}_back.jpg`, `${isbn}`))
  let x = random(0, size[0])
  books_x.push(x);
  books_y.push(10);
}

// function get_data() {
//   const title = input_title.value()
//   console.log(title)
//   const isbn = input_isbn.value()
//   console.log(isbn)
// }

function getSize(){
  var body = document.body, html = document.documentElement;

  var width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
  var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  return [width, height]
}
