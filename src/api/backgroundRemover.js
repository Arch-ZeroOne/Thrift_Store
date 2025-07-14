import axios from "axios";

export function removeBackground(image) {
  const url = "https://api.slazzer.com/v2.0/remove_image_background";
  const options = {
    apiKey: "84e07e304f2f4dffa70720ffaddc9a39",
    sourceImagePath: image,
    outputImagePath: "output.png",
  };

  axios
    .post(url, options)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("Error Occured Removing Background", error);
    });
}
