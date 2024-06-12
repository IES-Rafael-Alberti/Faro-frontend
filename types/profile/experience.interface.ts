export interface ExperienceInterface {
    id? : string;
    profile: string ;
    company: string;
    position: string;
    startDate: Date | string;
    endDate: Date | string | null;
    description: string;
}