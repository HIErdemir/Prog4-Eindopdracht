class User {


    constructor(FirstName, LastName, StreetAddress, PostalCode, City, DateOfBirth, PhoneNumber, Email, Password) {

            this.firstName = FirstName,
            this.lastName = LastName,
            this.streetAddress = StreetAddress,
            this.postalCode = this.validatePostalCode(PostalCode),
            this.city = this.validateCity(City),
            this.dateOfBirth = this.validateDateOfBirth(DateOfBirth),
            this.phoneNumber = this.validatePhoneNumber(PhoneNumber),
            this.email = this.validateEmail(Email),
            this.password = Password;
    }


    validatePostalCode(postalcode) {
        const regex = new RegExp('^([0-9]{4})([\\s])?(?!SD|SA|SS)([A-Z]{2})$');
        if (regex.test(postalcode)) {
            return number;
        } else {
            throw new Error("Invalid Postalcode: " + postalcode.substring(1, 10));
        }
    }

    validateCity(city) {
        const regex = new RegExp('^([a-zA-Z\u0080-\u024F]+(?:. |-| |\'))*[a-zA-Z\u0080-\u024F]*$');
        if (regex.test(city)) {
            return city;
        } else {
            throw new Error("Invalid Date Of Birth: " + city.substring(1, 10));
        }
    }


    validateDateOfBirth(dateOfBirth) {
        var today = new Date();
        var birthDate = new Date(dateOfBirth)
        const regex = new RegExp('^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$');
        if (regex.test(dateOfBirth)) {
            if(birthDate >= today){
                throw new Error("Invalid Date Of Birth: " + dateOfBirth.substring(1, 10));
            }
            return birthDate;
        } else {
            throw new Error("Invalid Date Of Birth: " + dateOfBirth.substring(1, 10));
        }
    }

    validatePhoneNumber(number) {
        const regex = new RegExp('^([0|\\+[0-9]{1,5}([\\s])?)?([0-9]{2}([\\s])?[0-9]{8})$');
        if (regex.test(number)) {
            return number;
        } else {
            throw new Error("Invalid Phone number: " + number.substring(1, 10));
        }
    }


    validateEmail(email) {
        const regex = new RegExp('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
        if (regex.test(email)) {
            return email;
        } else {
            throw new Error("Invalid Email: " + email.substring(1, 10));
        }
    }
}

module.exports = User;