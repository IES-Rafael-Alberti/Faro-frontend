
import { ExperienceInterface } from './experience.interface';
import { EducationInterface } from './education.interface';
import { RecommendationInterface } from './recomendation.interface';

export interface ProfileInterface {
    id: string;
    name: string;
    users_profile_profile_picture?: Buffer | null;
    headline?: string;
    description?: string;
    recommendations: RecommendationInterface[];
    experience: ExperienceInterface[];
    education: EducationInterface[];
}
