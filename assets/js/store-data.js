
const scriptURL = 'https://script.google.com/macros/s/AKfycbw6W0n83B0MBxveWcO7ZXax4AgmEFd1YylZialzLqiyEvbeyIXdx9ufhS0xUZvvhB6VuA/exec'
const form = document.forms['contact-form'];
const submitBtn = document.querySelector(".submit-btn");
const loadingBtn = document.querySelector(".loading-btn");
const myAlert = document.querySelector(".alert-success");

form.addEventListener('submit', e => {
    e.preventDefault()
    //btn submit hilang
    submitBtn.style.display = "none";
    // btn loading muncul
    loadingBtn.style.display = "block";


    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response)
            loadingBtn.style.display = "none";
            submitBtn.style.display = "block";
            myAlert.style.display = "block";
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message)
            console.log('Success!', response)
            loadingBtn.style.display = "none";
            submitBtn.style.display = "block";
            myAlert.style.display = "block";
        })
})