export interface EducationInterface {
    id?: string;
    profileId?: string ;
    institution: string;
    degree: string;
    start_date: Date | string;
    end_date: Date | string | null;
}