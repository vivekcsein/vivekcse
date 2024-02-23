export const postImageAPI = async (endpoint: string, imgdata: string) => {
  //formdata
  const formData = new FormData();
  formData.append("image", imgdata);

  //headers
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json; charset=utf-8");
  // myHeaders.append("Authorization", "SECRET");
  try {
    let res = await fetch(`${endpoint}`, {
      method: "POST",
      headers: myHeaders,
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  } catch (error) {
    console.log("Error!", error);
    throw error;
  }
};
