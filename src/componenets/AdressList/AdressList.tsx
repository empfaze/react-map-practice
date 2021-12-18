import { DragEvent, FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import DeleteIcon from "../../assets/images/delete.png";

import classes from "./AdressList.module.scss";
import { useTypedActions } from "../../hooks/useTypedActions";

interface AdresslistProps {}

const Adresslist: FC<AdresslistProps> = () => {
  const { places } = useTypedSelector((state) => state.adress);
  const { removePlace, setCurrentDraggedPlace, sortPlaces, changePlaceId } =
    useTypedActions();

  sortPlaces();

  function deleteHandler(placeId: number): void {
    removePlace(placeId);
  }

  function dragStartHandler(
    e: DragEvent<HTMLLIElement>,
    placeId: number
  ): void {
    const style = e.currentTarget.style;

    setTimeout(() => {
      style.visibility = "hidden";
    }, 0);

    setCurrentDraggedPlace(placeId);
  }
  function dragLeaveHandler(e: DragEvent<HTMLLIElement>): void {
    e.currentTarget.style.backgroundColor = "#ffffff";
  }
  function dragEndHandler(e: DragEvent<HTMLLIElement>): void {
    e.currentTarget.style.visibility = "visible";
    e.currentTarget.style.color = "#000000";
    e.currentTarget.style.backgroundColor = "#ffffff";
  }
  function dragOverHandler(e: DragEvent<HTMLLIElement>): void {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#e6e6e6";
  }
  function dragDropHandler(e: DragEvent<HTMLLIElement>, placeId: number): void {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#ffffff";

    changePlaceId(placeId);
    setCurrentDraggedPlace(null);
  }

  return (
    <>
      {places.length === 0 && (
        <p className={classes["empty-text"]}>
          Местоположения ещё не добавлены...
        </p>
      )}
      {places.length > 0 && (
        <ul className={classes["adress-list"]}>
          <h2 className={classes["heading-secondary"]}>Добавленные адреса:</h2>
          {places.map((place, idx) => (
            <li
              key={place.id}
              className={classes["list-item"]}
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, place.id)}
              onDragLeave={dragLeaveHandler}
              onDragEnd={dragEndHandler}
              onDragOver={dragOverHandler}
              onDrop={(e) => dragDropHandler(e, place.id)}
            >
              <div>
                <span>{idx + 1}. </span>
                {place.adress.replaceAll("+", " ")}
              </div>

              <img
                onMouseDown={deleteHandler.bind(null, place.id)}
                tabIndex={0}
                src={DeleteIcon}
                alt="Delete adress"
                className={classes["delete-icon"]}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Adresslist;
