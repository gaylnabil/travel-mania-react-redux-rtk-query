import React, { ChangeEvent, FC, useState } from "react";
import Navbar from "./Navbar";
import { useGetAllDestinationsQuery } from "../api/destinationAPI";
import Destination from "./Destination";

interface IProps {}

const DestinationList: FC<IProps> = ({}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllDestinationsQuery();

  /**
   * Maps over an array of destination objects and  * returns an array of React components.
   * @param {boolean} isSuccess - A boolean indicating whether or not the data retrieval was successful.
   * @param {Array<Object>} data - An array of destination objects to be mapped over.
   */
  const destElements =
    isSuccess &&
    data.map((dest) => {
      return <Destination key={dest.id} dest={dest} />;
    });

  return (
    <div>
      <h1>Destination List</h1>
      {isLoading ? (
        <h3>Now Loading...</h3>
      ) : (
        <div className="content">{destElements}</div>
      )}
    </div>
  );
};

export default DestinationList;
