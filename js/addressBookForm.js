class AddressBookData {
    get name() {
        return this._name;
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else {
            throw 'Name is incorrect!';
        }
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp('^([1-9]{1}[0-9]{9}|[9]{1}[1]{1}[1-9]{1}[0-9]{9}|/[+]{1}[9]{1}[1]{1}[1-9]{1}[0-9]{9})$');
        if (phoneNumberRegex.test(phoneNumber)) {
            this._phoneNumber = phoneNumber;
        }
        else throw 'Phone Number is incorrect!';
    }

    get address() {
        return this._address;
    }

    set address(address) {
        let addressRegex = RegExp('^[a-zA-Z0-9]{3,}\\s[a-zA-Z0-9]{3,}([ ]|[a-zA-Z0-9]{3,})*?$');
        if (addressRegex.test(address)) {
            this._address = address;
        }
        else throw 'Address is incorrect!';
    }

    get city() {
        return this._city;
    }

    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
    }

    get zip() {
        return this._zip;
    }

    set zip(zip) {
        this._zip = zip;
    }

    toString() {
        return "Name : " + this._name + ", Phone Number : " + this._phoneNumber + ", Address : " + this._address + ", City : " + this._city
            + ", State : " + this._state + ", Zip : " + this._zip;
    }
}

const save = () => {
    try {
        let addressBookData = createaAddressBook();
        createAndUpdateStorage(addressBookData);
        resetForm();
        window.location = "../pages/addressBookHome.html";
    } catch (e) {
        alert("Oops!!! There's an error ======> " + e);
        alert("Please correct the details & try again...!!!");
        return;
    }
}

const createaAddressBook = () => {
    let addressBookData = new AddressBookData();

    addressBookData.name = getInputValueById('#name');
    addressBookData.phoneNumber = getInputValueById('#phoneNumber');
    addressBookData.address = getInputValueById('#address');
    addressBookData.city = getInputValueById('#city');
    addressBookData.state = getInputValueById('#state');
    addressBookData.zip = getInputValueById('#zipCode');

    alert("Object created successfully -----> " + addressBookData.toString());
    return addressBookData;
}

function createAndUpdateStorage(addressBookData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList != undefined) {
        addressBookList.push(addressBookData);
    } else {
        addressBookList = [addressBookData];
    }
    alert("Local Storage Updated Successfully!\nTotal Addresses : " + addressBookList.length);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#phoneNumber', '');
    setValue('#address', '');
    setValue('#city', '');
    setValue('#state', '');
    setValue('#zipCode', '');

    const textError = document.querySelector('.text-error');
    const textErrorNew = document.querySelector('.text-error-new');
    textError.textContent = "";
    textErrorNew.textContent = "";

    const addressTextError = document.querySelector('.address-text-error');
    const addressTextErrorNew = document.querySelector('.address-text-error-new');
    addressTextError.textContent = "";
    addressTextErrorNew.textContent = "";

    const phoneNumberTextError = document.querySelector('.phoneNumber-text-error');
    const phoneNumberTextErrorNew = document.querySelector('.phoneNumber-text-error-new');
    phoneNumberTextError.textContent = "";
    phoneNumberTextErrorNew.textContent = "";
}

//-------EVENT LISTENERS---------

window.addEventListener('DOMContentLoaded', (event) => {

    //event listener for name validation!!!!
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    const textErrorNew = document.querySelector('.text-error-new');

    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }

        try {
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
            textErrorNew.textContent = "Fine!!";
        } catch (e) {
            textErrorNew.textContent = "";
            textError.textContent = e;
        }
    });

    //event listener for address validation!!!!
    const address = document.querySelector('#address');
    const addressTextError = document.querySelector('.address-text-error');
    const addressTextErrorNew = document.querySelector('.address-text-error-new');

    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            addressTextError.textContent = "";
            return;
        }

        try {
            (new AddressBookData()).address = address.value;
            addressTextError.textContent = "";
            addressTextErrorNew.textContent = "Fine!!";
        } catch (e) {
            addressTextErrorNew.textContent = "";
            addressTextError.textContent = e;
        }
    });

    //event listener for phone number validation!!!!
    const phoneNumber = document.querySelector('#phoneNumber');
    const phoneNumberTextError = document.querySelector('.phoneNumber-text-error');
    const phoneNumberTextErrorNew = document.querySelector('.phoneNumber-text-error-new');

    phoneNumber.addEventListener('input', function () {
        if (phoneNumber.value.length == 0) {
            phoneNumberTextError.textContent = "";
            return;
        }

        try {
            (new AddressBookData()).phoneNumber = phoneNumber.value;
            phoneNumberTextError.textContent = "";
            phoneNumberTextErrorNew.textContent = "Fine!!";
        } catch (e) {
            phoneNumberTextErrorNew.textContent = "";
            phoneNumberTextError.textContent = e;
        }
    });
});