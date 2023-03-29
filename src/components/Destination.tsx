import React, { ChangeEvent, FC, useState } from "react";
import IDestination from "../Models/IDestination";
import {
  useDeleteDestinationMutation,
  useUpdateDestinationMutation,
} from "../api/destinationAPI";

interface IProps {
  dest: IDestination;
}

const Destination: FC<IProps> = ({ dest }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [editDest, setEditDest] = useState<IDestination>({ ...dest });

  const [deleteDestinationMutation, stateDelete] =
    useDeleteDestinationMutation();
  const [updateDestinationMutation, stateUpdate] =
    useUpdateDestinationMutation();

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;

    setEditDest((prev) => {
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };

  console.log("editDest: ", editDest);

  return (
    <div key={editDest.id} className="row text-center my-1">
      <div className="col-lg-4 text-start">
        {isEditing ? (
          <div className="row">
            <div className="input-group ">
              <input
                className="form-control mx-2 p-1"
                type="text"
                name="city"
                id="city"
                value={editDest.city}
                onChange={handleOnchange}
                placeholder="Edit City..."
              />
              &nbsp;
              <input
                className="form-control mx-2 p-1"
                type="text"
                name="country"
                id="country"
                placeholder="Edit Country..."
                value={editDest.country}
                onChange={handleOnchange}
              />
            </div>
          </div>
        ) : (
          <p>
            {editDest.city}, {editDest.country}
          </p>
        )}
      </div>
      <div className="col-lg-4 text-warning">
        {isEditing ? (
          <div className="row">
            <div className="input-group ">
              <input
                className="form-control mx-2 p-1"
                type="number"
                name="days"
                id="days"
                value={editDest.days}
                onChange={handleOnchange}
                placeholder="Edit Number of Days..."
              />
            </div>
          </div>
        ) : (
          <>
            {dest.days}
            <b> Days</b>
          </>
        )}
      </div>
      <div className="col-lg-4">
        {isEditing ? (
          <>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                updateDestinationMutation(editDest);
                setIsEditing(false);
              }}
            >
              Update
            </button>{" "}
            <button
              className="btn btn-warning"
              onClick={(e) => {
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-success"
            onClick={(e) => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}{" "}
        <button
          className="btn btn-danger"
          onClick={(e) => {
            deleteDestinationMutation(dest.id);
          }}
        >
          Delete
        </button>{" "}
      </div>
    </div>
  );
};

export default Destination;
