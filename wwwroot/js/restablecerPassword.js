uri = "api/biologo/Email"

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(`${uri}/${getCookie('userEmailRecover')}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log('Entra al data del primer fetch')
            const btnRestablecer = document.getElementById('btnRestablecerPassword')
            btnRestablecer.addEventListener('click', () => {
                const nuevaContrasena = document.getElementById('contrasenaNueva')
                fetch(`api/biologo/email/${data.id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevaContrasena.value)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        document.cookie = 'userEmailRecover=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    })
                    .catch(error => console.log(error))
            })
        })
        .catch(error => console.log(error))
})