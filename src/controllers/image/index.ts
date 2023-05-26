import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

class ImageController {
  async getDailyImage(_request: Request, response: Response) {
    try {
      const { data } = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=eZeAL6QYHvmL1nzezbUdycuGaRHJzOtAzO3nP253"
      );

      return response.status(StatusCodes.OK).send({ status: true, data });
    } catch (error: Error | any) {
      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ status: false, message: error.message });
    }
  }
}

const imageController = new ImageController();

export = imageController;
