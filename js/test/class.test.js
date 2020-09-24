export class person {
    #value;
    #age;
    set age(v) { this.#age = toInt(v); }
    get age() { return this.#age; }
    #name;
    #birth;
    #married;
    #sex;
}
class person_name {
    #first;
    #last;
}
class person_name_last {
    #value;
    #side;
}
var person_name_last_side;
(function (person_name_last_side) {
    person_name_last_side["father"] = "father";
    person_name_last_side["mother"] = "mother";
})(person_name_last_side || (person_name_last_side = {}));
var person_sex;
(function (person_sex) {
    person_sex["m"] = "m";
    person_sex["f"] = "f";
})(person_sex || (person_sex = {}));
export class ISO_Date {
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
function toInt(v) {
    let tmp = Number.parseInt(v);
    if (Number.isNaN(tmp))
        throw new Error(v + ' is not an integer');
    return tmp;
}
function toReal(v) {
    let tmp = Number.parseFloat(v);
    if (Number.isNaN(tmp))
        throw new Error(v + ' is not an integer');
    return tmp;
}
console.log(new ISO_Date('2020-05-30').toDate());
