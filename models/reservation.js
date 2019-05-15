class Reservation {

    constructor(ApartmentId, StartDate, EndDate, UserID) {

            this.apartmentId = ApartmentId,
            this.userId = UserID,
            this.startDate = this.validateDate(StartDate),
            this.endDate = this.validateDate(EndDate),
            this.status = "INITIAL";


    }

    validateDate(Date) {
        const regex = new RegExp('^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$');
        if (regex.test(Date)) {
            return new Date(Date);
        } else {
            throw new Error("Invalid Date: " + Date.substring(1, 10));
        }
    }

    validateStartAndEndDate(startDate, endDate) {
        var StartDate = new Date(startDate);
        var EndDate = new Date(endDate);

        if (StartDate > EndDate) {
            throw new Error('Start date is greater than the end date.');
        }
    }


}