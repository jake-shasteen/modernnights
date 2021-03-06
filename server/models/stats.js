"use strict";

module.exports = function( sequelize, DataTypes ) {
  var Stat = sequelize.define( "Stat", {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    rarity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function( models ) {
        Stat.belongsTo( models.StatType, {constraints: false} );
        Stat.belongsToMany( models.Character, {through: models.CharacterStats} );
        Stat.belongsToMany( models.Monster, {through: models.MonsterStats} );
      }
    }
  });

  return Stat;
};
