import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Fetch profile data
export const fetchProfile = async () => {
  const docRef = doc(db, "/profile", "basic-info");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No profile document found!");
    return null;
  }
};

// Fetch services
export const fetchServices = async () => {
  const servicesCollection = doc(db, "/profile", "service");
  const docSnap = await getDoc(servicesCollection);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No service document found!");
    return null;
  }
};

// Similar functions for education, experience, skills, projects, and blog posts
export const fetchResume = async () => {
  const docRef = doc(db, "/profile", "resume");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No resume document found!");
    return null;
  }
};

// export const fetchSkills = async () => {
//   const skillsCollection = collection(db, "skills");
//   const snapshot = await getDocs(skillsCollection);
//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// };

export const fetchPortfolio = async () => {
  const projectsCollection = doc(db, "/profile", "portfolio");
  const docSnap = await getDoc(projectsCollection);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No portfolio document found!");
    return null;
  }
};

export const fetchBlogPosts = async () => {
  const blogCollection = collection(db, "blogPosts");
  const snapshot = await getDocs(blogCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
