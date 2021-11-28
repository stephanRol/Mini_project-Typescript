const bAdd = <HTMLButtonElement>document.querySelector("#bAdd");
const inputTitle = <HTMLInputElement>document.querySelector("#title");
const inputCost = <HTMLInputElement>document.querySelector("#cost");
const inputCurrency = <HTMLInputElement>document.querySelector("#currency");


const expenses = new Expenses('USD');

bAdd!.addEventListener('click', e => {
    if (inputTitle!.value !== "" && inputCost!.value !== '' && !isNaN(parseFloat(inputCost!.value))) {
        const title = inputTitle!.value;
        const cost: number = parseFloat(inputCost!.value);
        const currency = <Currency>inputCurrency!.value;

        expenses.add({ title: title, cost: { number: cost, currency: currency } });

        render();
    } else {
        alert('Data is incorrect');
    }
});

function render() {
    let html = '';

    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;
        const { number, currency } = cost;

        html += `
      <div class="item">
            <div><span class="currency">${currency}</span> ${number}</div>
            <div>${title}</div>
            <div><button class="bDelete" data-id="${id}">Delete</button></div>
      </div>
      `;
    });

    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.bDelete').forEach((bDelete: HTMLElement) => {
        bDelete.addEventListener("click", (e: MouseEvent) => {
            const id = (<HTMLButtonElement>e.target).getAttribute('data-id');

            expenses.remove(parseInt(id!));

            render();
        })
    })
}

function $(selector: string): HTMLElement {
    return <HTMLElement>document.querySelector(selector);
}

function $$(selector: string): NodeListOf<HTMLElement> {
    return <NodeListOf<HTMLElement>>document.querySelectorAll(selector);
}