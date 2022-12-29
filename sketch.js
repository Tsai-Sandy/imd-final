function setup() {
  let size = get_size()
  createCanvas(size[1], size[0]);
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
  textSize(50);
}

function draw() {
  background(254, 223, 225);
  fill(219, 77, 109);
  circle(85,85,50);
}
// function get_data() {
//   const title = input_title.value()
//   console.log(title)
//   const isbn = input_isbn.value()
//   console.log(isbn)
// }
function get_size(){
  var body = document.body, html = document.documentElement;
  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
  var width = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
  console.log(height)
  console.log(width)
  return [height, width]
}
