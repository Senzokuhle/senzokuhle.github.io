const passwordLength = document.getElementById('passwordLength');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generatePassword = document.getElementById('generatePassword');
const passwordResult = document.getElementById('passwordResult');
const copyPassword = document.getElementById('copyPassword');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-='

function generatePasswordFunc(length, useUppercase, useLowercase, useNumbers, useSymbols) {
    let allowedChars = '';
    let password = '';

    allowedChars += useUppercase ? uppercaseChars : '';
    allowedChars += useLowercase ? lowercaseChars : '';
    allowedChars += useNumbers ? numberChars : '';
    allowedChars += useSymbols ? symbolChars : '';

    if (length <= 0) {
        return '(password length must be at least 1)';
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return password;
}

generatePassword.addEventListener('click', () => {
    const length = +passwordLength.value;
    const useUppercase = includeUppercase.checked;
    const useLowercase = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSymbols = includeSymbols.checked;

    const password = generatePasswordFunc(length, useUppercase, useLowercase, useNumbers, useSymbols);
    passwordResult.value = password;
});

copyPassword.addEventListener('click', () => {
    passwordResult.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});