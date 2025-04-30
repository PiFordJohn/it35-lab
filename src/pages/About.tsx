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
  import warcraft1 from '../../img/warcraft1.jpg';
  
  const About: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>About</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
        <IonCard className="profile-card">
        <IonImg src={warcraft1} alt="WARCRAFT" />
      <IonCardHeader>
        <IonCardTitle>WarCraft</IonCardTitle>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>This epic fantasy artwork depicts a powerful, armored warrior slamming a massive,
         rune-engraved sword into a monstrous foe. With a fierce expression and a flowing red cape, 
         the warrior radiates strength and defiance as ghostly figures loom in the background. 
        The scene captures the climax of a brutal battle between light and darkness.</IonCardContent>
    </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default About;