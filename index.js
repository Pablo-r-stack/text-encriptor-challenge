import { translations } from "./lang/lang.js";
const about = document.getElementById('about');
const tittle = document.getElementById('tittle');
const message =document.getElementById('messageInput');
const encoded = document.getElementById('encodedMessage');
const encButton = document.getElementById('encodeButton');
const decButton = document.getElementById('decodeButton');
const dialog = document.getElementById('dialog-char');
const copButton = document.getElementById('copyButton');
const logo = document.querySelector('.logo');

const { [0]: es, [1]: eng, [2]: pt } = translations;

let errorMsg = '';
let charMsg= {};
let aboutMsg='';
//events
about.addEventListener('click', ()=>{
    alert(aboutMsg);
})

encButton.addEventListener('click', ()=> {
    if(!validate(message.value)){
        // encoded.textContent = encript(message.value);
        typeText(encoded, encript(message.value), 100);
        dialog.textContent = charMsg.successEncode;
    }else{
        typeText(encoded, errorMsg, 100);
        dialog.textContent = charMsg.warnMsg;
    }
    adjustHeight();
});

decButton.addEventListener('click', ()=> {
    if(!validate(message.value)){
        typeText(encoded, decrypt(message.value), 100);
        dialog.textContent = charMsg.successDecode;
    }else{
        typeText(encoded, errorMsg, 100);
        dialog.textContent = charMsg.warnMsg;
    }
    adjustHeight();
});

copButton.addEventListener('click', ()=>{
    encoded.select();
    navigator.clipboard.writeText(encoded.value);
    dialog.textContent= charMsg.copyMsg;
    adjustHeight();
})

logo.addEventListener('mouseenter', function() {
    const text = `Alura \n latam`;
    this.textContent= text;
    // typeText(this, text, 50);
});

logo.addEventListener('mouseleave', function(){
    this.textContent = 'A';
});
//typing function:
function typeText(element, text, interval) {
    const typedText = [];
    let i = 0;

    const typingInterval = setInterval(() => {
        typedText.push(text[i]);
        element.textContent = typedText.join('');
        i++;

        if (i === text.length) {
            clearInterval(typingInterval);
        }
    }, interval);
}

//encode-decode functions
function encript(text){
    let encodedMessage = text.split('');
    let encryptedMessage = [];
    console.log(text);
    encodedMessage.forEach(letter => {
        encryptedMessage.push(replaceLetter(letter))
    });
    return encryptedMessage.join('');
}

function decrypt(text){
    let encodedMessage = text;

    encodedMessage = encodedMessage.replaceAll('ai', 'a');
    encodedMessage = encodedMessage.replaceAll('enter', 'e');
    encodedMessage = encodedMessage.replaceAll('imes', 'i');
    encodedMessage = encodedMessage.replaceAll('ober', 'o');
    encodedMessage = encodedMessage.replaceAll('ufat', 'u');

    return encodedMessage;
}

function adjustHeight() {
    dialog.style.height = 'auto'; // Restablecer la altura a 'auto' para medir el contenido
    dialog.style.height = dialog.scrollHeight + 'px'; // Ajustar la altura según el contenido
}

function replaceLetter(letter){
    if(letter == 'a'){
        return 'ai';
    }
    if(letter == 'e'){
        return 'enter';
    }
    if(letter == 'i'){
        return 'imes';
    }
    if(letter == 'o'){
        return 'ober';
    }
    if(letter == 'u'){
        return 'ufat';
    }
    else{
        return letter;
    }
}

//validating functions

function validate(text){
    if(/[A-Z]/.test(text) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(text) || /\d/.test(text) ){
        return true;
    }
}

/**
 * a = ai
 * e = enter
 * i = imes
 * o = ober
 * u = ufat
 * 
 * solo minusculas
 * no caracteres especiales ni acentos
 */

//language events
const actualLang = document.getElementById('language');
const langList = document.getElementById('languages');
const languages = document.getElementsByClassName("lang-option");

actualLang.addEventListener('click', ()=>{
    langList.classList.toggle('toggle') //changes css property visibility
})

//generate array from const languages
const optionsArray = Array.from(languages);

optionsArray.forEach((option)=>{
    option.addEventListener('click', ()=>{
        const lang = option.getElementsByTagName('span')[0].textContent.toLowerCase();
        setLang(lang);
        langList.classList.toggle('toggle')
    })
})

function setLang(lang){
    actualLang.getElementsByTagName('img')[0].src = `/img/flag/${lang}.png`
    lang == 'es' ? setContext(es) : lang == 'pt'? setContext(pt) : setContext(eng);
}

document.addEventListener('DOMContentLoaded',()=>{
    switch (navigator.language) {
        case 'en-US':
            setLang('eng')
            break;
        case 'es-ES':
            setLang('es')
            break;
        case 'pt-BR':
            setLang('pt')
            break;
        default:
            setLang('eng')
            break;
    }
});

function setContext(trans){
    console.log(trans);
    tittle.textContent = trans.title;
    message.placeholder = trans.encodePlaceholder
    encoded.placeholder = trans.decodePlaceholder
    encButton.textContent = trans.btnEncode;
    decButton.textContent = trans.btnDecode;
    copButton.textContent = trans.btnCopy;
    errorMsg = trans.errorMsg;
    charMsg = trans.charMsg;
    aboutMsg = trans.aboutMsg;
    dialog.textContent = charMsg.welcome;
    adjustHeight();
}