import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Icon from '@/components/icons';
import { CompleteProfile } from "@/types/profile/CompleteProfile.interface";

interface DisplayedProfileSectionInterface {
    currentSection: string,
    profileData: CompleteProfile | undefined,
    styles: any
}

const DisplayedProfileSection = ({ currentSection, profileData, styles }: DisplayedProfileSectionInterface) => {
    let sectionContent;

    console.log("DISPLAYED DATA: ", profileData);

    switch (currentSection) {
        case 'profile':
            sectionContent = (
                <section className={styles.profile}>
                    <h3 className={styles.headline}>{profileData?.profile.headline}</h3>
                    <p className={styles.biography}>{profileData?.profile.description}</p>
                </section>
            );
            break;
        case 'education':
            sectionContent = (
                <>
                {Array.isArray(profileData?.education) && profileData.education.map((edu, index) => (
                    <section className={styles.education} key={index}>
                        <div className={styles.sectionItem}>
                            <Icon src='/icons/studentIcon.svg' width={40} height={40} />
                            <div className={styles.studiesInfo}>
                                <h3 className={styles.degree}>{edu.degree}</h3>
                                <p className={styles.info}>{edu.institution}, {edu.start_date?.toString().slice(0, 4)} - {edu.end_date ? edu.end_date?.toString().slice(0, 4) : 'Actualidad'}</p>
                            </div>
                        </div>
                    </section>
                ))}
                </>
            );
            break;
        case 'experience':
            sectionContent = (
                <>
                  {Array.isArray(profileData?.experience) && profileData.experience.map((exp, index) => (
                    <section className={styles.expContainer} key={index}>
                      <div className={styles.sectionItem}>
                        <div className={styles.iconContainer}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /></div>
                        <div className={styles.workInfo}>
                          <h3 className={styles.company}>{exp.company}</h3>
                          <p className={styles.info}>{exp.position}, {exp.startDate?.toString().slice(0, 4)} - {exp.endDate ? exp.endDate?.toString().slice(0, 4) : 'Actualidad'}</p>
                        </div>
                        <p className={styles.description}>{exp.description}</p>
                      </div>
                    </section>
                  ))}
                </>
              );
              break;
        case 'recommendations':
            sectionContent = (
                <>
                    {Array.isArray(profileData?.recommendations) && profileData.recommendations.map((rec, index) => (
                        <div className={styles.recommendations} key={index}>
                            <div className={styles.sectionItem}>
                                <p>{rec.message}</p>
                                <p>{rec.date?.toString()}</p>
                            </div>
                        </div>
                    ))}
                </>
            );
            break;
        default:
            sectionContent = null;
    }

    return (
        <section>
            {sectionContent}
        </section>
    );
};

export default DisplayedProfileSection;