export interface ExperienceInterface {
    profileId?: string ;
    company: string;
    position: string;
    startDate: Date | string;
    endDate: Date | string | null;
    description: string;
}