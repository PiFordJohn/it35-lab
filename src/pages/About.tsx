import { 
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, 
  IonHeader, 
  IonImg, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import warcraft1 from '../../img/logo3.png';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding'>

        {/* App Preview Card */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Incident Report App</IonCardTitle>
            <IonCardSubtitle>Stay Safe. Stay Informed.</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            This app allows users to quickly report incidents such as accidents, emergencies, or suspicious activities. 
            Users can upload descriptions, locations, images, and view reported incidents in real-time. 
            Admins and responders can track reports and respond faster to critical situations.
          </IonCardContent>
        </IonCard>

        {/* Artwork / Style Card */}
        <IonCard className="profile-card">
          <IonImg src={warcraft1} alt="INCIDENT REPORT APP" />
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default About;
