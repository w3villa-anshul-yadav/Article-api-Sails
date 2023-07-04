/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  createArticle: async (req, res) => {
    try {
      const { title, body } = req.body;

      let tempArticle = {
        uuid: uuidv4(),
        title,
        body,
      };
      const article = await Articles.create(tempArticle).fetch();

      if (!article) {
        return res.status(400).json({
          status: false,
          msg: "Article not created",
        });
      }
      return res.json({
        status: true,
        msg: "Article created succesfully",
        article,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        msg: "Some internal Server error occured",
      });
    }
  },

  getAllArticles: async function (req, res) {
    try {
      const articles = await Articles.find();
      if (articles.length === 0) {
        return res.json({
          status: true,
          msg: "No Articel Found",
        });
      }
      return res.json({
        status: true,
        articles: articles,
      });
    } catch (error) {
      sails.log.error(error);
      res.status(500).json({
        status: false,
        msg: "Some internal Server error occured",
      });
    }
  },
  deleteArticle: async function (req, res) {
    try {
      const { uuid } = req.params;
      const article = await Articles.destroyOne({ uuid });
      if (!article) {
        return res.status(400).json({
          status: false,
          msg: "Article not  deleted",
        });
      }
      return res.json({
        status: true,
        msg: "Article deleted succesfully",
      });
    } catch (error) {
      sails.log.error(error);
      res.status(500).json({
        status: false,
        msg: "Some internal Server error occured",
      });
    }
  },
};
