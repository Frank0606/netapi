document.addEventListener('DOMContentLoaded', function () {

    const audioInput = document.getElementById('audioInput')
    const audioPreview = document.getElementById('audio-preview')

    audioInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            audioPreview.style.display = 'block'
            const reader = new FileReader()
            reader.onload = function (e) {
                audioPreview.querySelector('audio').src = e.target.result
            };
            reader.readAsDataURL(this.files[0])
        } else {
            audioPreview.style.display = 'none'
        }
    })

    // const imageInput = document.getElementById('image-input');
    // const fileNameElement = document.querySelector('.file-nameI');

    // imageInput.addEventListener('change', function () {
    //     if (this.files && this.files[0]) {
    //         const fileName = this.files[0].name;
    //         fileNameElement.textContent = fileName;
    //     } else {
    //         fileNameElement.textContent = ''
    //     }
    // })
})