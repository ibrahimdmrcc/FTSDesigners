var mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    butonGoster();
}

function butonGoster() {
    var x = document.getElementById("start-button");
    
        x.style.display = "inline-block";
    
    
}

//gerekli verilerin alinmasi
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //bir global degisken

button.onclick = () => {
    input.click(); //butona tiklandiginda inputa tiklanmis olacak
}

input.addEventListener("change", function () {
    //dosya secme islemi yapiliyor
    file = this.files[0];
    dropArea.classList.add("active");
    butonGoster();
    showFile(); //fonksiyon cagiriliyor
});


//kullanici dosya ile surukle birak alani icinde ise
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //buton kullanimini engelliyor
    dropArea.classList.add("active"); //border kesikli cizgi olmaktan cikiyor
    dragText.textContent = "B�rak";
});

//kullanici surukle biraktan ayrilirsa
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "S�r�kle ve B�rak";
});

//kullanici dosyayi surukle birak alanina birakirsa
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //buton kullanimini engelliyor
    //yuklenen dosyalardan sadece 0. indisi seciyoruz.
    file = event.dataTransfer.files[0];
    butonGoster();
    showFile(); //fonksiyon cagiriliyor
});

function showFile() {
    let fileType = file.type; //yuklenen dosya tipi aliniyor
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //kullanici bir gorsel secti ise
        let fileReader = new FileReader(); //filereadin objesi olusturuluyor
        fileReader.onload = () => {
            let fileURL = fileReader.result; //fileUrl degiskenine yuklenen dosya kaynagi atan�yor.
            let imgTag = `<img src="${fileURL}" alt="">`; //bir img tagi olusuturuluyor ve src ozelligine secilen dosya kaynagi atan�yor.
            dropArea.innerHTML = imgTag; //olusturulan img tagi surukle birak alan�na ekleniyor.
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Se�ti�iniz g�rsel resim de�il!");
        dropArea.classList.remove("active");
        dragText.textContent = "S�r�kle ve B�rak";
    }
}
