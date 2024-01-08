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

export type User = {
    name: string;
    email: string;
    dob: string;
    password: string;
    phoneNumber: string;
}
export type IUser = {
    id: DatabaseUID;
    name: string;
    email: string;
    date: string;
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

export type ContactItems = {
    id: number;
    name: string;
    role: string;
    number: string;
    icon: any;
};

type Report = {
    id: string;
    date: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    reportType: number;
};

export interface SafetyTip {
    tipId: string;
    img: any;
    title: string;
    description: string;
}

export interface IReport {
    reportType: string | null;
    date: string;
    location: location;
    description: string;
}

export type ReportContextType = {
    report: IReport;
    setReport: (report: IReport) => void;
}


