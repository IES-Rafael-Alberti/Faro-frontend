import { EditableProfileData } from "@/types/profile/editableProfileData.interface";
import { Dispatch, SetStateAction } from "react";
import { checkEducationExists, checkExperienceExists, fetchData } from "./fetchData";
import { ExperienceInterface } from "@/types/profile/experience.interface";
import { EducationInterface } from "@/types/profile/education.interface";
import { EDUCATION_URL } from "@/types/consts";

export const addEducation = (setFormData: Dispatch<SetStateAction<EditableProfileData>>) => {
    setFormData((prevFormData) => {
      const newEducation: EducationInterface = { degree: '', institution: '', start_date: '2024-08-09', end_date: null };
      return {
        ...prevFormData,
        education: [...prevFormData.education, newEducation]
      };
    });
  }

export const addExperience = (setFormData: Dispatch<SetStateAction<EditableProfileData>>) => {
    setFormData((prevFormData: EditableProfileData) => {
      const newExperience: ExperienceInterface = { company: '', position: '', startDate: '2024-08-09', endDate: null, description: '' };
      return {
        ...prevFormData,
        experience: [...prevFormData.experience, newExperience]
      };
    });
};

export const deleteEducation = (
        setDeletedEducationIds: Dispatch<SetStateAction<string[]>>,
        setFormData: Dispatch<SetStateAction<EditableProfileData>>,
        id: string) => {
    setDeletedEducationIds((prevDeletedIds: string[]) => [...prevDeletedIds, id]);
    setFormData((prevFormData: EditableProfileData) => {
      return {
        ...prevFormData,
        education: prevFormData.education.filter((edu) => edu.id !== id)
      };
    });
};

export const deleteExperience = (
    setDeletedExperienceIds: Dispatch<SetStateAction<string[]>>, 
    setFormData: Dispatch<SetStateAction<EditableProfileData>>,
    id: string) => {
    setDeletedExperienceIds((prevDeletedIds: string[]) => [...prevDeletedIds, id]);
    setFormData((prevFormData: EditableProfileData) => {
      return {
        ...prevFormData,
        experience: prevFormData.experience.filter((ex) => ex.id !== id)
      };
    });
};

export const getFilteredEducation = async (
    formData: EditableProfileData,
    id: string,
    token: string
  ) => {
    return  await fetchData(`${EDUCATION_URL}${id}`, token);
};

export const getFilteredExperience = async (
    formData: EditableProfileData,
    id: string,
    token: string
  ) => {
    const newExperience = await Promise.all(formData.experience.map(async (exp) => {
      const exists = await checkExperienceExists(id, exp, token);
      return { entry: exp, exists };
    }));
    return newExperience.filter(({ exists }) => !exists).map(({ entry }) => entry);
};

