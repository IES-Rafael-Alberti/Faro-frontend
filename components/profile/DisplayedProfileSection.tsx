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
                            <div className={styles.iconContainer}>
                                <Icon src='/icons/studentIcon.svg' width={40} height={40} />
                            </div>
                            <div className={styles.sectionItem}>
                                <div className={styles.studiesInfo}>
                                    <h3 className={styles.degree}>{edu.degree}</h3>
                                    <p className={styles.info}>{edu.institution}, {edu.start_date?.toString().slice(0, 4)} - {edu.end_date ? edu.end_date?.toString().slice(0, 4) : 'Actualidad'}</p>
                                </div>
                            </div> {/* Missing closing div tag */}
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
                            <div className={styles.experience}>
                                <div className={styles.iconContainer}><FontAwesomeIcon icon={faBriefcase} className={styles.icon} /></div>
                                <div className={styles.workInfo}>
                                    <h3 className={styles.company}>{exp.company}</h3>
                                    <p className={styles.info}>{exp.position}, {exp.startDate?.toString().slice(0, 4)} - {exp.endDate ? exp.endDate?.toString().slice(0, 4) : 'Actualidad'}</p>
                                </div>
                            </div>
                            <p className={styles.description}>{exp.description}</p>
                        </section>
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
