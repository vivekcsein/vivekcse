import { endpointConfig } from "../utils/endpointsConfig";
export const revalidateTime = 24 * 3600;

const fetchAPI = async (endpoint: string) => {
  try {
    let res = await fetch(`${endpoint}`, {
      method: "GET",
      // cache: "no-cache",
      // Revalidate every 60 seconds
      next: { revalidate: revalidateTime },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // mode: 'cors',
      credentials: "same-origin",
    });
    return res.json();
  } catch (err) {
    console.error(err + "Failed to fetch data");
  }
};

export const getRootLayoutAPI = async () => {
  const data = await fetchAPI(endpointConfig.rootLayout);
  return data.rootLayoutData;
};

export const getMenubarAPI = async () => {
  const data = await fetchAPI(endpointConfig.endpoint_menubar);
  return data.MenuData;
};
export const getProjectsAPI = async () => {
  const data = await fetchAPI(endpointConfig.endpoint_projects);
  return data.projectdata;
};

export const getPagesAPI = async (params: string) => {
  const data = await fetchAPI(`${endpointConfig.pagesRoutes}/${params}`);
  return data.pagesRoute;
};
export const getInterviewAPI = async (params: string) => {
  const data = await fetchAPI(`${endpointConfig.endpoint_interview}/${params}`);
  return data.interviewData;
};
