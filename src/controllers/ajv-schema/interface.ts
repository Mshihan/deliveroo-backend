export interface RefreshTokenBodyInterface {
  userId: string;
}

export interface RegisterBodyInterface {
  username: string;
  email: string;
  password: string;
}

export interface LoginBodyInterface {
  email: string;
  password: string;
}

export interface RestaurantBodyInterface {
  name: string;
  notes: string;
  location: string;
  photo: string;
  distance: string;
  openTime: string;
  deliveryFee: string;
  minimumAmount: string;
}
