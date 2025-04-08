import { useState } from 'react';
import { 
  IonButton,
  IonButtons,
  IonContent,  
  IonInput, 
  IonInputPasswordToggle, 
  IonItem, 
  IonList, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonRouter,
  IonAlert,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal
} from '@ionic/react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleOpenVerificationModal = () => {
    setShowVerificationModal(true);
  };

  const doRegister = () => {
    // Add your registration logic here
    console.log("Registering:", { username, email, firstName, lastName });
    setShowVerificationModal(false);
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <h1>Create your account</h1>

        <IonInput label="Username" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter your username" value={username} onIonChange={e => setUsername(e.detail.value!)} style={{ marginTop: '15px' }} />
        <IonInput label="First Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter your first name" value={firstName} onIonChange={e => setFirstName(e.detail.value!)} style={{ marginTop: '15px' }} />
        <IonInput label="Last Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Enter your last name" value={lastName} onIonChange={e => setLastName(e.detail.value!)} style={{ marginTop: '15px' }} />
        <IonInput label="Email" labelPlacement="stacked" fill="outline" type="email" placeholder="Enter your email" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ marginTop: '15px' }} />
        
        <IonInput label="Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Enter password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ marginTop: '15px' }} >
          <IonInputPasswordToggle slot="end" />
        </IonInput>

        <IonInput label="Confirm Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Confirm password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} style={{ marginTop: '15px' }} >
          <IonInputPasswordToggle slot="end" />
        </IonInput>

        <IonButton onClick={handleOpenVerificationModal} expand="full" shape='round' style={{ marginTop: '15px' }}>
          Register
        </IonButton>
        <IonButton routerLink="/it35-lab" expand="full" fill="clear" shape='round'>
          Already have an account? Sign in
        </IonButton>

        {/* Verification Modal */}
        <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding" style={{ marginTop: '25%' }}>
              <IonCardHeader>
                <IonCardTitle>User Registration Details</IonCardTitle>
                <hr />
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>

                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonCardTitle>{email}</IonCardTitle>

                <IonCardSubtitle>Name</IonCardSubtitle>
                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent></IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Register;
