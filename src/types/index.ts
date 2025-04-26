export interface SocialLink {
    name: string;
    icon: string;
    url: string;
  }
  
  export interface ContactItem {
    icon: string;
    title: string;
    value: string;
    url: string;
  }
  
  export interface Service {
    icon: string;
    title: string;
    description: string;
  }
  
  export interface EducationItem {
    date: string;
    title: string;
    institution: string;
    description: string;
  }
  
  export interface ExperienceItem {
    date: string;
    title: string;
    company: string;
    description: string;
  }
  
  export interface Skill {
    name: string;
    percentage: number;
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    link: string;
  }
  
  export interface BlogPost {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    summary: string;
    link: string;
  }
  
  export interface FormData {
    name: string;
    email: string;
    message: string;
  }