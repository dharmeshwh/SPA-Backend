import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

class ImageController {
  async getDailyImage(_request: Request, response: Response) {
    try {
      // Fetch the daily image data from NASA API
      const { data } = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=eZeAL6QYHvmL1nzezbUdycuGaRHJzOtAzO3nP253"
      );

      // Return the daily image data with a success status
      return response.status(StatusCodes.OK).send({ status: true, data });
    } catch (error: Error | any) {
      // Return an error response if there's an issue fetching the daily image
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}

const imageController = new ImageController();

export = imageController;
