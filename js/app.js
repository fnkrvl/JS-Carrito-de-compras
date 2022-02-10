// Variables
const cart = document.getElementById('carrito')
const courses = document.getElementById('lista-carrito')


// Listeners
loadEventListeners();

function loadEventListeners(){
    // 
    courses.addEventListener('click', buyCourse)
}



// Functions
// Add course to the cart
function buyCourse(e){
    e.preventDefault()
    // Delegation for add cart
    if (e.target.classList.contains('agregar-carrito')){
        const course = e.target.parentElement.parentElement
        // Sending the selected course to get the data of it
        readCourseData(course)
    }
}


// Read cart data
function readCourseData(course){
    console.log(course)
}