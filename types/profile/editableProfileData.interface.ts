import { PublicationInterface} from "./publications.interface";
import { EducationInterface } from "./education.interface";
import { ExperienceInterface } from "./experience.interface";
import { ProfileInterface } from "./Profile.interface";
import { RecommendationInterface } from "./recomendation.interface";

export interface EditableProfileData extends ProfileInterface {
    experience: ExperienceInterface[];
    education: EducationInterface[];
    recommendations: RecommendationInterface[];
    publications: PublicationInterface[];
}
