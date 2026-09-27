'use strict';
import { Model } from "sequelize";
import { Enums } from '../utils/common/index.js';
const { BOOKED, CANCELLED, INITIATED, PENDING } = Enums.BOOKING_STATUS;
export default (sequelize, DataTypes) => {
  
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
     type: DataTypes.INTEGER,
     allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    noofSeats:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    },
    status: {
      type: DataTypes.ENUM(
        BOOKED,
        CANCELLED,
        INITIATED,
        PENDING
      ),
      defaultValue:INITIATED,
      allowNull:false
    },
    totalCost: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};