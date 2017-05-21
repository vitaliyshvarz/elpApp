import { User }  from './user';
import { Meal }  from './meal';

class PaymentOptions {
  image: string = '';
  name: string = '';
  selected: boolean = false;
}

class ElpOpeningHours {
  break: {
      from: string;
      fromMin: string;
      to: string;
      toMin: string;
  };
  business_hours: {
      from: string;
      fromMin: string;
      to: string;
      toMin: string;
  };
  hasBreak: boolean;
  name: string;
  selected: boolean;
}

export class Place {
    _id: number;
    googleId: string;
    name: string;
    email: string;
    phone: string;
    fullAddress: string;
    website: string;
    currency: {
        name: string;
        postfix: string;
    };
    elpOpeningHours: ElpOpeningHours[];
    meals: Meal[];
    deliveryAvailable: boolean;
    takeAwayAvailable: boolean;
    user: User;
    location: {
        lat: number;
        lng: number;
    };
    paymentOptions: PaymentOptions[];
    rating: number;

    constructor({
      id  = 0,
      googleId  = '',
      name = '',
      email = '',
      phone = '',
      fullAddress = '',
      website = '',
      currency = {
        name: '',
        postfix: '',
      },
      elpOpeningHours = [
        {
            break: {
                from: '',
                fromMin: '',
                to: '',
                toMin: ''
            },
            business_hours: {
                from: '',
                fromMin: '',
                to: '',
                toMin: ''
            },
            hasBreak: false,
            name: '',
            selected: false
        }],
      meals = [new Meal()],
      deliveryAvailable = false,
      takeAwayAvailable= false,
      user = new User(),
      location = { lat: 0, lng: 0 },
      paymentOptions = [new PaymentOptions()],
      rating = 0
    } = {}) {
      this._id = id;
      this.googleId = googleId;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.fullAddress = fullAddress;
      this.website = website;
      this.currency = currency;
      this.elpOpeningHours = elpOpeningHours;
      this.meals = meals;
      this.deliveryAvailable = deliveryAvailable;
      this.takeAwayAvailable = takeAwayAvailable;
      this.user = user;
      this.location = location;
      this.paymentOptions = paymentOptions;
      this.rating = rating;
    }
}
