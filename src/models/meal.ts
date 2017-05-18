
export class Portion {
    _id: number;
    size: string = '';
    selected: boolean = true;
    description: string = '';
    price: number = 0;
    weight: number = 0;
}

export class Meal {
    _id: number = 0;
    selected: boolean = false;
    name: string = '';
    description: string= '';
    imageUrl: string = '';
    portions: Portion[] = [];
}
