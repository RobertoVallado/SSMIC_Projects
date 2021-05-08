let regularExp = /Helo/;

regularExp = /Hello/i; // case INSENSITIVE
//regularExp = /Hello/g; //global search
//console.log(regularExp);
//console.log(regularExp.source);

//exec() returns result in array or null
let result1 = regularExp.exec("Hello wprld");

console.log(result1);
console.log(result1[0]) //result.input or result.index

//test() returns true or false
result1 = regularExp.test('Hello');
console.log(result1); //boolean value

//match() - return array or null
let string = "Hello there assasddf"
result1 = string.match(regularExp);
console.log(result1);

//search() - Returns index of the first match if not found returns -1
string = "Roberto hello asdaf;lkal";
result1 = string.search(regularExp);

//replace() Returns new string with some or all matches of pattern
string = "hello there";
const newStrin = string.replace(regularExp, "YO");

////////////// PART 2
let re;
//literal characters
re = /hello/;
re = /hello/i;

//metacharacters
re = /^h/i //must start with ^
re = /wodl$/i; //must end with
re = /^hello/i; //must begina nd end with
re = /^h.llo$/i; //dot is a wildcard
re = /h*llo/i; // any character including nothing (optional)
re = /hell?o?/i; //'l and 'o are optional with the  '?' character
re = /hello\?/i; //escape to set characters

//brackets character SETS
re = /h[ae]llo/i; //must be an a or an e
re = /[HR]ello/; //must be H or R (note 'i' for lower case insensitive is gone)
re = /[^HF]ello/i; //mathces anything BUT [HF]
re = /[A-Z]ello/; //mathces anything uppercase letter
re = /[a-z]ello/; //mathces anything lowercase letter
re = /[A-Za-z]ello/; //mathces any letter (lower n upper)
re = /[0-9]ello/; //any digit set gefore ello word (single time)

//braces {} quantifiers
re = /Hel{2}o/; //must occure {n} times 
re = /Hel{2,4}o/; //must occure {n} times in a range with two parameters 
re = /Hel{2,}o/; //must occur AT LEAST 2 times (note the coma in the quantifier)

//parentheses () grouping
re = /([0-9]x){3}$/; //3x3x3x <--match

//shorthand character clases
re = /\w/; //word character alphanumeric or _
re = /\w+/; //+ = one or more 
re = /\W/; //non word character match
re = /\d/; //any digit
re = /\d+/; //any digit 0 or more times
re = /\D/; //any NON-digit
re = /\s/; //withe space character
re = /\S/; //non white space

re = /hello\b/; //word boundary

//asertions (something like a conditional)
re = /x(?=y)/; //matches x only if followed by y
re = /x(?!y)/; //matches x only if NOTT!! followed by y


//string 
const str = 'hello wordl';
//result
let result = re.exec(str);
console.log(result);

function reTest(regEx, str) {
    if (regEx.test(str)) {
        console.log(`${str} matches ${str.source}`)
    } else {
        console.log(`${str} does NOT match ${re.source}`);
    }
}

reTest(re, str);

//EVENT LISTENERS
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('postalcode').addEventListener('blur', validatePC);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

function validateName(){
    const name = document.getElementById('name');
    const regExp1 = /^[a-zA-Z]{2,10}$/; //simple name validation
    const host1 = document.getElementById('nameDIV');

    if(!regExp1.test(name.value)){
        showError(`${name.value} is an invalid name (name must be between 2 and 10 characters)`,host1);
    }
}

function validatePC(){
    const postalcode = document.getElementById('postalcode');
    const regExp2 = /^(\w\d\w)[- ]?(\d\w\d)$/; //canadian postal code
    const host2 = document.getElementById('PC_DIV');


    if(!regExp2.test(postalcode.value)){
        showError(`${postalcode.value} is an invalid postal code (format is: A5A 5A5)`,host2);
    }
}

function validateEmail(){
    const email = document.getElementById('email');
    const regExp3 = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/; //email validation
    const host3 = document.getElementById('emailDIV');

    if(!regExp3.test(email.value)){
        showError(`${email.value} is an invalid email (format is ****@***.***)`,host3);
    }
}

function validatePhone(){
    const phone = document.getElementById('phone');
    const regExp4 = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
    const host4 = document.getElementById('phoneDIV');


    if(!regExp4.test(phone.value)){
        showError(`${phone.value} is an invalid phone number (format is *** *** ****)`,host4);
    }
}

function showError(error, host) { //error log
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert';

    errorDiv.appendChild(document.createTextNode(error));
    host.appendChild(errorDiv);
    setTimeout(clearError, 2000);
}

function clearError() {
    document.querySelector('.alert').remove(); //clear error
}