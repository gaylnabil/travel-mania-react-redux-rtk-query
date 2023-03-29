import React, { FC, useState } from "react";

import { useAddDestinationMutation } from "../api/destinationAPI";

interface IProps {}

const AddDestination: FC<IProps> = ({}) => {
  const initial = {
    //id: Math.random() * 1000000 + 1,
    city: "",
    country: "",
    days: 1,
  };
  const [formData, setFormData] = useState(initial);

  const [addDestinationMutation, results] = useAddDestinationMutation();

  // console.log("formData", formData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };

  return (
    <div className="p-4 border">
      <form
        className="form-horizontal"
        onSubmit={(e) => {
          e.preventDefault();
          addDestinationMutation(formData);
          setFormData((prev) => ({ ...prev, ...initial }));
        }}
      >
        <h5>Enter New Destination</h5>
        <div className="row col-10 offset-2">
          <div className="col-3 p-1">
            <input
              required
              name="city"
              type="text"
              className="form-control"
              placeholder="Enter City..."
              value={formData.city}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-3 p-1">
            <input
              required
              name="country"
              type="text"
              className="form-control"
              placeholder="Enter Country..."
              value={formData.country}
              onChange={handleOnChange}
            />
          </div>

          <div className="col-3 p-1">
            <input
              required
              name="days"
              type="number"
              min="1"
              max="100"
              className="form-control"
              placeholder="Enter Spending Day(s)..."
              value={formData.days}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-3 p-1">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDestination;
