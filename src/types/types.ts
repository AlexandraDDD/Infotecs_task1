

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    gender: string;
    age: number;
    phone: string;
    address: {
        address: string;
        city: string;
    };
    height: string,
    weight: string,
    email: string,

}

export interface UsersData {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}
