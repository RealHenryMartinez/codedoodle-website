import IImage from "./IImage.js";

export interface ILabels {
    color: string;
    name: string;
}

export interface IForm extends IImage {
    labels?: ILabels[];
    userId: string;
    user: string;
    title: string;
    description: string;
}

// export type FormType = IForm & Employee;