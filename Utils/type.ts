type RootStackParamList = {
    'Emergency Contacts': undefined;
    AddContactScreen: undefined;
    Signup: undefined;
    SplashScreen: undefined;
    Welcome: undefined;
    Login: undefined;
    Start: undefined;
}

type location = {
    latitude: number;
    longitude: number;
    latitudeDelta: number,
    longitudeDelta: number,
}

type DatabaseUID = string;

type User = {
    name: string;
    email: string;
    dob: string;
    password: string;
    phoneNumber: string;
}
type IUser = {
    id: DatabaseUID;
    name: string;
    email: string;
    dob: string;
    password: string;
    phoneNumber: string;
}
export interface IUserContext {
    user: IUser | null;
    setUser: (user: IUser) => void;
}

export interface ContactItem {
    name: string;
    role: string;
    number: string;
}


export interface IReport {
    reportType: string | null;
    date: string;
    location: location;
    description: string | null;
}

export type ReportContextType = {
    report: IReport;
    setReport: (report: IReport) => void;
}


