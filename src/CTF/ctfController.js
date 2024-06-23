const createError = require("http-errors");
const ctfModel = require("./ctfModel");

const createCTF = async (req, res, next) => {
    const {topic, introduction, requirements, link, begin, scenerio, question, answer} = req.body;

    if (!introduction || !topic || !requirements || !link || !begin || !scenerio || !question || !answer) {
        const error = createError(400, "All fields are required.");
        return next(error);
      }

      try {
        const newCTF = await ctfModel.create({
            introduction,
            requirements,
            link,
            scenerio,
            begin,
            question,
            answer
          });
          res.status(200).json({
            message: "Question Created sucessfully"
          });

      } catch (error) {
        next(createError(500, "Server Error while creating new Question."));
      }
};

module.exports = createCTF;