window.addEventListener('load', () => {
    let userForm = document.querySelector('.form-sign-up');
    let userFirstName = document.querySelector('#first_name');
    let userLastName = document.querySelector('#last_name');
    let userEmail = document.querySelector('#email');
    let userCategory = document.querySelector('#id_category');
    let userImage = document.querySelector('#profile_image');
    let userPassword = document.querySelector('#password');

    userForm.addEventListener('submit', (e) => {
        if (userFirstName.value == '') {
            e.preventDefault();
            
            let errorFirstName = document.querySelector('.error-message-first-name');
            if (errorFirstName.innerText == ''){
                errorFirstName.innerHTML += 'Por favor, ingresa tu nombre';
            }
            userFirstName.classList.toggle('form-input');
            userFirstName.classList.add('input-error');
        }
        
        if (userLastName.value == '') {
            e.preventDefault();
            
            let errorlastName = document.querySelector('.error-message-last-name');
            if (errorlastName.innerText == ''){
                errorlastName.innerHTML += 'Por favor, ingresa tu apellido';
            }
            userLastName.classList.toggle('form-input');
            userLastName.classList.add('input-error');
        }

        if (userEmail.value == '') {
            e.preventDefault();
            
            let errorEmail = document.querySelector('.error-message-email');
            if (errorEmail.innerText == ''){
                errorEmail.innerHTML += 'Por favor, ingresa tu email';
            }
            userEmail.classList.toggle('form-input');
            userEmail.classList.add('input-error');
        }
        else if (!(userEmail.value.includes("@") && userEmail.value.includes("."))) {
            e.preventDefault();
            
            let errorEmail = document.querySelector('.error-message-email');
            if (errorEmail.innerText == ''){
                errorEmail.innerHTML += 'Por favor, ingresa una dirección válida';
            }
            userEmail.classList.toggle('form-input');
            userEmail.classList.add('input-error');
        }

        if (userCategory.value == '') {
            e.preventDefault();
            
            let errorCategory = document.querySelector('.error-message-category');
            if (errorCategory.innerText == ''){
                errorCategory.innerHTML += 'Por favor, ingresa selecciona tu categoría';
            }
            userCategory.classList.toggle('form-input');
            userCategory.classList.add('input-error');
        }

        if (userImage.value == '') {
            e.preventDefault();
            
            let errorUserImage = document.querySelector('.error-message-userImage');
            if (errorUserImage.innerText == ''){
                errorUserImage.innerHTML += 'Por favor, carga una imagen para tu perfil';
            }
            userImage.classList.toggle('form-input');
            userImage.classList.add('input-error');
        }
        
        if (userPassword.value == '') {
            e.preventDefault();
            
            let errorPassword = document.querySelector('.error-message-password');
            if (errorPassword.innerText == ''){
                errorPassword.innerHTML += 'Por favor, ingresa tu contraseña';
            }
            userPassword.classList.toggle('form-input');
            userPassword.classList.add('input-error');
        }
    });
});