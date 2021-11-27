type Currency = 'EUR' | 'USD';

interface IPrice {
    number: number,
    currency: Currency;
}

interface IExpensesItem {
    id: number,
    title: string,
    cost: IPrice
}

interface IExpenses {
    expenses: ArrayList<IExpensesItem>,
    finalCurrency: Currency,
    add(item: IExpensesItem): boolean,
    get(): IExpensesItem | null,
    getTotal(): string,
    remove(id: number): boolean

}

class ArrayList<T>{
    private items: T[];

    constructor() {
        this.items = [];
    }

    add(item: T) {
        this.items.push(item);
    }
}

class Expenses {

}
