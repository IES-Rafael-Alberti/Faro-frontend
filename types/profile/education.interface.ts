export interface EducationInterface {
    id?: string;
    profile?: string ;
    institution: string;
    degree: string;
    start_date: Date | string;
    end_date: Date | string | null;
}