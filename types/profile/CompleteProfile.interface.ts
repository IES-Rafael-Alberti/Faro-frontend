import { PublicationInterface} from "./publications.interface";
import { ContactInterface } from "./contact.interface";
import { EducationInterface } from "./education.interface";
import { ExperienceInterface } from "./experience.interface";
import { ProfileInterface } from "./Profile.interface";
import { RecommendationInterface } from "./recomendation.interface";
import { RequestInterface } from "./requests.interface";

export interface CompleteProfile {
    profile: ProfileInterface;
    experience: ExperienceInterface[];
    education: EducationInterface[];
    recommendations: RecommendationInterface[];
    contacts: ContactInterface[];
    publications: PublicationInterface[];
    receivedRequests: RequestInterface[];
}
