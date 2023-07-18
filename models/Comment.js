const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    traveller_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Traveller',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id',
      },
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;