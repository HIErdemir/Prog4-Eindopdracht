class Apartment {

    constructor(StreetAddress, PostalCode, City, Description, UserId){

            this.streetAddress = StreetAddress,
            this.postalCode = this.validatePostalCode(PostalCode),
            this.city = this.validateCity(City),
            this.description = Description,
            this.userId = UserId;
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


}