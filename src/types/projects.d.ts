type projectLayout = {
  projectdata: projectLayoutData;
};

type projectLayoutData = Array<workdata>;

interface wordkdata {
  id: string;
  company: string;
  title: string;
  website: string;
  description: string;
  startData?: string | Date;
  endDate?: string | Date;
  totalExperience: string;
  role: Array<string>;
  myreview: string;
  tools: Array<string>;
  platform: Array<string>;
  projects: Array<projectsList>;
}

interface projectsList {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  client: string;
  videolink: string;
  platform: Array<string>;
  tags: Array<string>;
  special?: string;
}
