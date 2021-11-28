type Currency = 'EUR' | 'USD';

interface IPrice {
    number: number,
    currency: Currency;
}

interface IExpensesItem {
    id?: number,
    title: string,
    cost: IPrice
}

interface IExpenses {
    expenses: ArrayList<IExpensesItem>,
    finalCurrency: Currency,
    add(item: IExpensesItem): boolean,
    get(index: number): IExpensesItem | null,
    getTotal(): string,
    remove(id: number): boolean
}

class ArrayList<T>{
    private items: T[];

    constructor() {
        this.items = [];
    }

    add(item: T): void {
        this.items.push(item);
    }
    get(index: number): T | null {
        const item: T[] = this.items.filter((x: T, i: number) => {
            return i === index;
        });

        if (item.length === 0) {
            return null;
        } else {
            return item[0];
        }
    }
    createFrom(value: T[]): void {
        this.items = [...value];
    }
    getAll(): T[] {
        return this.items;
    }
}

class Expenses implements IExpenses {
    expenses: ArrayList<IExpensesItem>;
    finalCurrency: Currency;

    private count = 0;

    constructor(currency: Currency) {
        this.finalCurrency = currency;
        this.expenses = new ArrayList<IExpensesItem>();
    }

    add(item: IExpensesItem): boolean {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index: number): IExpensesItem | null {
        return this.expenses.get(index)
    }
    getItems(): IExpensesItem[] {
        return this.expenses.getAll();
    }
    getTotal(): string {
        const total = this.expenses.getAll().reduce((acc, item) => {
            return acc += this.convertCurrency(item, this.finalCurrency);
        }, 0);

        return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
    }
    remove(id: number): boolean {
        const items = this.getItems().filter(item => {
            return item.id !== id;
        });
        this.expenses.createFrom(items);
        return true;
    }

    private convertCurrency(item: IExpensesItem, currency: Currency): number {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'EUR':
                        return item.cost.number * 0.88;
                        break;

                    default:
                        return item.cost.number;
                }
                break;
            case 'EUR':
                switch (currency) {
                    case 'USD':
                        return item.cost.number * 1.13;
                        break;

                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    }
}
