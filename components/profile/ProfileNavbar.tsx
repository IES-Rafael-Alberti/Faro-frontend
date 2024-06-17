import { montserrat } from "@/app/ui/fonts";
import { Dispatch, SetStateAction } from "react";

interface ProfileNavbarProps {
    currentSection: string;
    setCurrentSection: Dispatch<SetStateAction<"profile" | "education" | "experience" | "recommendations">>;
    styles: any;
  }
  
  const ProfileNavbar: React.FC<ProfileNavbarProps> = ({ currentSection, setCurrentSection, styles }) => {
    const sections = [
      { name: 'profile', label: 'Perfil' },
      { name: 'education', label: 'Educación' },
      { name: 'experience', label: 'Experiencia' },
      { name: 'recommendations', label: 'Recomendaciones' }
    ];
  
    return (
    <div className={styles.buttonsContainer}>
        {sections.map((section) => (
            <button
                key={section.name}
                className={
                    currentSection === section.name
                        ? `${styles.sectionButton} ${styles.focus} ${montserrat.className} antialised`
                        : `${styles.sectionButton} ${montserrat.className} antialised`
                }
                onClick={() => setCurrentSection(section.name as "profile" | "education" | "experience" | "recommendations")}
            >
                {section.label}
            </button>
        ))}
    </div>
    );
  };
  
  export default ProfileNavbar;