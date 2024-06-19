
import { Dispatch, SetStateAction } from "react";
import { fetchData } from "./fetchData";
import { ExperienceInterface } from "@/types/profile/experience.interface";
import { EducationInterface } from "@/types/profile/education.interface";
import { EDUCATION_URL, EXPERIENCE_URL } from "@/types/consts";
import { deleteData } from "./deleteData";
import { submitEducation, submitExperience } from "./submitData";

export const addEducation = (setEducation: Dispatch<SetStateAction<EducationInterface[]>>) => {
  setEducation((education) => {
    const newEducation: EducationInterface = { degree: '', institution: '', start_date: '2024-08-09', end_date: null };
    return {
      ...education,
      education: [...education, newEducation]
    };
  });
}

export const addExperience = (setFormData: Dispatch<SetStateAction<ExperienceInterface[]>>) => {
  setFormData((experience) => {
    const newExperience: ExperienceInterface = { company: '', position: '', startDate: '2024-08-09', endDate: null, description: '' };
    return {
      ...experience,
      experience: [...experience, newExperience]
    };
  });
};

export const deleteEducation = (
  setDeletedEducationIds: Dispatch<SetStateAction<string[]>>,
  setFormData: Dispatch<SetStateAction<EducationInterface[]>>,
  id: string) => {
  setDeletedEducationIds((prevDeletedIds: string[]) => [...prevDeletedIds, id]);
  setFormData((education) => {
    return {
      ...education,
      education: education.filter((edu) => edu.id !== id)
    };
  });
};

export const deleteExperience = (
  setDeletedExperienceIds: Dispatch<SetStateAction<string[]>>,
  setFormData: Dispatch<SetStateAction<ExperienceInterface[]>>,
  id: string) => {
  setDeletedExperienceIds((prevDeletedIds: string[]) => [...prevDeletedIds, id]);
  setFormData((experience) => {
    return {
      ...experience,
      experience: experience.filter((ex) => ex.id !== id)
    };
  });
};

export const getFilteredEducation = async (
  id: string,
  token: string
) => {
  return await fetchData(`${EDUCATION_URL}${id}`, token);
};

export const getFilteredExperience = async (
  id: string,
  token: string
) => {
  return await fetchData(`${EXPERIENCE_URL}${id}`, token);
};

export const handleExperienceEducationUpdate = async (
  deletedEducationIds: string[],
  deletedExperienceIds: string[],
  id: string,
  token: string
) => {
  const filteredEducation = await getFilteredEducation(id, token);
  const filteredExperience = await getFilteredExperience(id, token);

  for (const id of deletedEducationIds) {
    await deleteData(`education/${id}`, token);
  }
  for (const id of deletedExperienceIds) {
    await deleteData(`experience/${id}`, token);
  }

  for (const edu of filteredEducation) {
    await submitEducation(edu, id, token);
  }

  for (const exp of filteredExperience) {
    await submitExperience(exp, id, token);
  }
}