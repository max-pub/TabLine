class ISO_Date {
    constructor(iso) {
        let parts = iso.split('-');
        this.year = Number.parseInt(parts[0]);
        this.month = Number.parseInt(parts[1]);
        this.day = Number.parseInt(parts[2]);
        console.log(this.toDate() == this.toString());
    }
    toString() {
        return this.year + '-' + this.month + '-' + this.day;
    }
    toDate() {
        return new Date(this.year, this.month - 1, this.day, 0, 0, 0).toISOString().substr(0, 10);
    }
    get json() { return { year: this.year }; }
}
console.log(new ISO_Date('2020-05-30').toDate());
