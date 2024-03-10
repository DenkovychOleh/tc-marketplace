import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cn from 'classnames';
import styles from './CardItem.module.scss';

import LikeImg from '../../assets/icons/favorite.svg';
import ActiveLikeImg from '../../assets/icons/favorite-active.svg';
import imagePlug from '../../assets/images/imagePlug.webp';
import { CommonBtn } from "components/Buttons/CommonBtn";
import { ICar } from "types/IСar";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { isAuthUser } from "redux/auth/selectors";
import { addToFavourites, removeFromFavourites } from "redux/cars/operations";

interface Props {
    car?: ICar;
}

export const CardItem: React.FC<Props> = ({ car }) => {
    const dispatch=useAppDispatch()
    const isAuth=useAppSelector(isAuthUser);
    const navigate = useNavigate();
    const addFavorite=()=> {
        if(!isAuth){
            navigate('/login/log-in', { replace: true })
        }
        if(car?.isFavorite){
            car && dispatch(removeFromFavourites(car?.id))
        }else{
           car && dispatch(addToFavourites(car?.id))
        }

    }

    const onSrcImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = imagePlug;
    };

    return (
      <article className={styles.card}>
        <NavLink to={`/catalog/${car?.id}`} className={styles.link}>
          <div className={styles.photo}>
            <img
              className={styles.img}
              src={car?.fileUrl}
              alt={car?.brand}
              onError={onSrcImageError}
            />
          </div>
        </NavLink>
        <div className={styles.col}>
          <h3 className={styles.title}>
            {car?.brand} {car?.model} {car?.year}
          </h3>
          <div
            className={styles.iconIsFavouriteContainer}
            onClick={addFavorite}
          >
            <CommonBtn
              iconPath={car?.isFavorite && isAuth ? ActiveLikeImg : LikeImg}
              className={cn(styles.likeBtn)}
            />
          </div>
        </div>
        <p className={styles.price}>{car?.price} $</p>
        <ul className={styles.techSpecs}>
          <li className={styles.techSpec}>
            {car && car.mileage !== undefined
              ? `${Math.floor(car.mileage / 1000)} тис. км`
              : 'Нема данних'}
          </li>
          <li className={styles.techSpec}>{car?.city}</li>
          <li className={styles.techSpec}>{car?.transmission}</li>
          <li className={styles.techSpec}>
            {car?.fuelType}, {car?.engineDisplacement}л
          </li>
          <li className={styles.techSpec}>{car?.year} рік</li>
        </ul>
      </article>
    );
};