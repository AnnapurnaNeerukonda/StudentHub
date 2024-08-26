import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDUk7Avi-mOCCm-MEaDsb62kdvwmD4k3KQ",
  authDomain: "studenthub-27857.firebaseapp.com",
  projectId: "studenthub-27857",
  storageBucket: "studenthub-27857.appspot.com",
  messagingSenderId: "501787165807",
  appId: "1:501787165807:web:f6633fea5910136441b99a",
  measurementId: "G-732TWH423X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);