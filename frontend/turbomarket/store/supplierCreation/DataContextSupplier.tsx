import { createContext, useState, Dispatch, SetStateAction } from "react";




export type AddressData = {
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type AddressDataContext = {
  addressData: AddressData;
  setAddressData: React.Dispatch<React.SetStateAction<AddressData>>;
};

export type NameFormData = {
  website: string;
  mobileNumber: string;
  about: string;
  profilePicture: Array<File>;
  facilityPicture: Array<File>;
};

type NameFormDataContext = {
  nameFormData: NameFormData;
  setNameFormData: React.Dispatch<React.SetStateAction<NameFormData>>;
};


export type NotificationSettings = {
  emailComments: boolean;
  emailOrders: boolean;
  emailMessages: boolean;
  pushNotifications: "everything" | "same_as_email" | "nothing";
};

export const defaultNotificationSettings: NotificationSettings = {
  emailComments: false,
  emailOrders: false,
  emailMessages: false,
  pushNotifications: "everything",
};

export const NotificationSettingsContext = createContext<[NotificationSettings, Dispatch<SetStateAction<NotificationSettings>>]>([
  defaultNotificationSettings,
  () => {},
]);



export const AddressDataContext = createContext<AddressDataContext>({
  addressData: {
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
  setAddressData: () => {}
    
});

export const NameFormDataContext = createContext<NameFormDataContext>({
  nameFormData: {
    website: "",
    mobileNumber: "",
    about: "",
    profilePicture: [],
    facilityPicture: [],
  },
  setNameFormData: () => {}
});


export default function DataProvider(props: any): JSX.Element {


  const [addressData, setAddressData] = useState<AddressData>({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [nameFormData, setNameFormData] = useState<NameFormData>({
    website: "",
    mobileNumber: "",
    about: "",
    profilePicture: [],
    facilityPicture: [],
  });

  
  const [notificationSettings, setNotificationSettings] = useState(defaultNotificationSettings);



  return (
    <AddressDataContext.Provider value={{ addressData, setAddressData }}>
      <NameFormDataContext.Provider value={{ nameFormData, setNameFormData }}>
        <NotificationSettingsContext.Provider value={[notificationSettings, setNotificationSettings]}>
      {props.children}
      </NotificationSettingsContext.Provider>
      </NameFormDataContext.Provider>
    </AddressDataContext.Provider>
  );
}