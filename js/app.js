// Variables
const cart = document.getElementById('carrito')
const courses = document.getElementById('lista-cursos')
const coursesList = document.querySelector('#lista-carrito tbody')
const emptyCartBtn = document.getElementById('vaciar-carrito')


// Listeners
loadEventListeners();

function loadEventListeners(){
    // Shooot when click over "Agregar Carrito"
    courses.addEventListener('click', buyCourse)

    // When delete an item in the cart
    cart.addEventListener('click', deleteCourse)

    // When empty an item into the cart
    emptyCart.addEventListener('click', emptyCart)

    // At load the document, show LS
    document.addEventListener('DOMContentLoaded', readLocalStorage)
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
    const infoCurso = {
        imagen: course.querySelector('img').src,
        titulo: course.querySelector('h4').textContent,
        precio: course.querySelector('.precio span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };
    console.log(course)
}

// Shows the selected course in the cart
function insertCart(course){
    const row = document.createElement('tr')
    row.innerHTML =
    <>´
        <td>
            <img src="${curso.imagen}"></img>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>    
    ´</>
        
    coursesList.appendChild(row)
    saveCourseLocalStorage()    
}

// Delete the course of the cart
function deleteCourse(e){
    e.preventDefault()
    let course, courseId
    if (e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove()
        course = e.target.parentElement.parentElement
        courseId = course.querySelector('a').getAttribute('data-id')
        console.log(courseId)
    }

    deleteCourseFromLocalStorage(courseId)
}

// Delete the courses from the cart in the DOM
function emptyCart(e){
    while(coursesList.firstChild){
        coursesList.removeChild(coursesList.firstChild)
    }
    // Empty LS
    emptyLS()

    return false;
}

function saveCoursesToLocalStorage(course){
    let courses = getCoursesFromLocalStorage()
    // The selected course adds to the cart 
    courses.push(course)
}


// Get the Local Storage
function getCoursesFromLocalStorage(){
    let coursesLS
    // We reviewed the values of the storage facility
    if (localStorage.getItem('cursos') === null){
        coursesLS = []
    }
    else{
        coursesLS = JSON.parse(localStorage.getItem('cursos'))
    }
    return coursesLS
}


// Print the courses of LS in the cart
function readLocalStorage(){
    let coursesLS

    coursesLS = getCoursesFromLocalStorage()

    coursesLS.forEach(function(course){        
        const row = document.createElement('tr')
        row.innerHTML =
        <>´
            <td>
                <img src="${course.imagen}"></img>
            </td>
            <td>${course.titulo}</td>
            <td>${course.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${course.id}">X</a>
            </td>    
        ´</>
        
    coursesList.appendChild(row)
    saveCourseLocalStorage() 
    });
}


function deleteCourseFromLocalStorage(courseLS) {
    let coursesLS
    // Obtain the array of courses 
    coursesLS = getCoursesFromLocalStorage();
    // Iterate comparing the ID of the deleted course with the ones of the LS
    coursesLS.forEach(function(courseLS, index){
        if (course.id === courseLS){
            coursesLS.splice(index, 1)
        }
    });
    // Adding the actual array to storage
    localStorage.setItem('courses'), JSON.stringify(coursesLS);
}

// Empty all courses of LS
function emptyLS(){
    localStorage.clear();
}