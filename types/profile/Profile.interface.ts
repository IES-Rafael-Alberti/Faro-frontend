
import { Experience } from './experience.interface';
import { Education } from './education.interface';
import { Recommendation } from './recomendation.interface';

export interface ProfileInterface {
    id: string;
    users_profile_profile_picture?: Buffer | null;
    headline?: string | null;
    description?: string | null;
    occupation_status?: 'Working' | 'Studying' | 'Looking for a job' | null;
    recommendations: Recommendation[];
    experience: Experience[];
    educations: Education[];
}
