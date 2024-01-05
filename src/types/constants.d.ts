interface inputField {
    id: number;
    name: string;
    type?: string;
    label?: string;
    placeholder?: string;
    variant?: number;
    required?: boolean;
}

type workExperience = Array<workList>;

interface workList {
    id: number;
    TechnologyTitle: string;
    TechnologyList: Array<Technology>;
}

interface Technology {
    id: string;
    TechnologyName: string;
    totalEx: string;
    link: string;
}