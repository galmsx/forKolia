let lastname = this.prompt('Твоя фамилия?');
this.document.getElementById('lastname').value = lastname;

let firstname = this.prompt('Твоё имя?');
this.document.getElementById('firstname').value = firstname;

let otchestvo = this.prompt('Твоё отчество?');
this.document.getElementById('otchestvo').value = otchestvo;

let select = document.getElementById("selectMonth");
let options = [];
let isAlreadyUpdated = false;

select.onclick = () => (setTimeout(() => {
    if (isAlreadyUpdated) {
        return;
    }
    isAlreadyUpdated = true;
    select.removeChild(select.firstElementChild)

    for (let i = 0; i < 12; i++) {
        let date = new Date(2011, i, 1, 0, 0, 0, 0);
        let month = date.toLocaleString('default', { month: 'long' });
        options.push(month);
    }

    for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}, 10))
const names = ['lastname', 'firstname', 'otchestvo']
const dates = ['selectMonth', 'year', 'day']
const blockedIds = [...dates, ...names];
let myform = this.forma;


class SuperDate extends Date {
    constructor(...props) {
        super(...props);
    }
    daysInMonth() {
        return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    }
}
console.log(new SuperDate(2019, 10).daysInMonth());
console.log(new Date(2019, 10, 1))

window.onload = () => {
    document.getElementById('calc').onclick = () => {
        const monts = montToNumber(document.getElementById(dates[0]).value);
        const day = document.getElementById(dates[2]).value;
        const year = document.getElementById(dates[1]).value;
        const isValidData = DateIsValid(`${day}.${monts}.${year}`);

        if (new SuperDate(year, monts) > day) isValidData = false;

        if (!isValidData) {
            alert('не правильная дата');
            return;
        }



        myform.result.value = +myform.one.value + +myform.two.value + +myform.three.value;
        let value = Math.ceil(myform.result.value * 33.33);
        setTimeout(() => { alert('Вы набрали ' + value + ' процентов') }, 1000);
        document.querySelectorAll('input[type="radio"]').forEach(el => el.disabled = true);
    };

    //block options
    document.querySelectorAll('input[type="radio"]').forEach(el => {
        el.onclick = ({ target }) => {
            document.querySelectorAll(`input[name="${target.name}"]`).forEach(el => el.disabled = true)
        }
    })

    document.getElementById('forma').onclick = (event) => {
        if (event.target.localName == 'input') {
            blockedIds.forEach(id => {
                document.getElementById(id).disabled = true;
            });
        }
    }
    document.getElementById('forma').onreset = () => {
        blockedIds.forEach(id => {
            document.getElementById(id).disabled = false;
        });
        document.querySelectorAll('input[type="radio"]').forEach(el => el.disabled = false);
        names.forEach(id => {
            document.getElementById(id).value = '';
        });
    }
}

function DateIsValid(userValue) {
    var regexp = /^\d{1,2}\.\d{1,2}\.\d{1,4}$/;
    if (regexp.test(userValue)) {
        var values = userValue.split('.');
        var d = values[0] - 0;
        var m = values[1] - 0;
        var y = values[2] - 0;
        var daysInMonth = 31;

        if (m > 0 && m < 13 && y > 0 && y < 10000) {
            if (m == 2) {
                daysInMonth = ((y % 400) == 0) ? 29 : ((y % 100) == 0) ? 28 : ((y % 4) == 0) ? 29 : 28;
            }
            else if (m == 4 || m == 6 || m == 9 || m == 11) {
                daysInMonth = 30;
            }
            return (d <= daysInMonth);
        }
    }
    return false;
}

function montToNumber(monts) {
    return options.indexOf(monts) + 1;
}